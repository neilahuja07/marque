# Scholar Stack — Full End-to-End Test Report

**Date:** 2026-08-29
**Tester:** Automated E2E (HTTP + REST + Supabase API + source review)
**App URL:** http://localhost:3000 (Next.js dev server)
**Status:** FAIL — critical payment-bypass vulnerability found

---

## 1. Test environment / method

- All HTTP page tests: `curl` / `Invoke-WebRequest` against the local Next.js dev server.
- Supabase API tests (auth, PostgREST, Storage): direct REST calls with the public anon key.
- API-route behaviour verified both via HTTP and by full source review of every payment/download/auth route.
- No browser automation could be used (Playwright/Puppeteer not installed and installation was forbidden). Items that strictly require a running browser are listed under **§6 Tests not completed**.
- Secrets in `.env.local` were read only to run tests; they are intentionally **not** reproduced in this report.

### Data created during testing (transparency)
To prove the RLS findings, the minimum necessary write probes were executed and left in the (test) database:
- **1 auth user** `e2e.test.user.20260829@gmail.com` (created via the public signup API — **unconfirmed** because the project requires email confirmation).
- **~6 `orders` rows** with `razorpay_order_id = 'probe_…'`, `email = probe@probe.com`, `user_id = NULL`, amounts 0–9.99, statuses `created`/`paid`. Because `user_id IS NULL`, these rows are invisible to every authenticated user (RLS select: `auth.uid() = user_id`) and cannot grant downloads.
- **No** `order_items` rows were created (each attempt intentionally failed on FK).
- Suggested cleanup (run in Supabase SQL Editor only if desired):
  ```sql
  delete from orders where razorpay_order_id like 'probe\_%';
  delete from auth.users where email = 'e2e.test.user.20260829@gmail.com';
  ```

---

## 2. Overall result

| Category | Verdict |
|---|---|
| Pages & routing | PASS (with UX/SEO defects) |
| Guest purchase restriction | PASS |
| Authentication flows | PASS (positive/negative paths verified) |
| Payment security | **FAIL — 1 Critical, 1 High** |
| Download security | PASS (ownership checks correct) — **but the Critical RLS flaw bypasses it** |
| Dashboard / data isolation | NOT TESTED (see §6) |
| Console / visual / animation | NOT TESTED (browser required) |
| **Overall** | **FAIL** |

---

## 3. Findings by severity

### CRITICAL

#### C1 — `orders` / `order_items` RLS insert & update policies are world-writable → total payment bypass
- **Feature:** Payment / purchase integrity, download authorization.
- **Files:** `supabase/migrations/008_orders_fix.sql` (identical flaw in legacy `004_orders.sql`), exploited against `orders` + `order_items`; combined with `src/app/api/orders/download/route.ts`.
- **Repro (proven against the live DB with the public anon key):**
  1. `POST {SUPABASE_URL}/rest/v1/orders` with anon key, body `{email, amount, currency, status:"paid", razorpay_order_id:"probe_x"}` → **HTTP 201**, row persisted.
  2. `PATCH …/orders?razorpay_order_id=eq.probe_x` body `{status:"paid"}` → **HTTP 204** (existing rows updatable).
  3. `POST …/rest/v1/order_items` with a valid existing order id passes RLS — only the FK constraint gates it (`23503` when the order id is missing). With an order row created in step 1 it succeeds.
  4. Control: `POST /rest/v1/products` (no insert policy) → **401 RLS-denied**, proving the difference is the bogus policies.
  - Root cause: the policies use `with check (true)` / `using (true)` **without any `to <role>` clause**, so they apply to `PUBLIC` (including the `anon` role). Supabase default privileges grant `anon`/`authenticated` `ALL` on new public tables, so RLS is the only gate — and it is wide open.
- **Expected:** Only the server's verified-payment path should be able to create/alter orders.
- **Actual:** Any caller (even unauthenticated) can insert `status='paid'` orders / order items for any `user_id`, or flip any existing order's status.
- **Impact:** A free registered account can insert a `paid` order + matching `order_items` for every product via 2 REST calls, then the legitimate download API (which correctly trusts these tables) serves every PDF. **Complete bypass of payment for the whole catalog.**
- **Note:** `return=representation`/`headers-only` requests return 401 because PostgREST then re-reads rows, which the own-orders `SELECT` policy hides — this does **not** prevent the write (`return=minimal` proved 201).

### HIGH

#### H1 — `/api/razorpay/verify` never reconciles the paid amount against the submitted items → pay once, claim the catalogue
- **Feature:** Payment verification / order creation.
- **File:** `src/app/api/razorpay/verify/route.ts`
- **Repro (code-level proof; requires any one genuine test payment):**
  1. Put only the cheapest product in the cart → `/api/razorpay/order` returns a Razorpay order for ₹~950 ($9.99).
  2. Complete the payment in the Razorpay modal (test mode, trivial).
  3. Call the Razorpay `handler` same as the app, but submit `items` = **all 9 product IDs**.
  4. Signature check passes (HMAC covers only `razorpay_order_id|razorpay_payment_id`); total is recomputed from DB prices but **never compared to what was actually charged**; order + 9 `order_items` are inserted with `status='paid'`.
- **Expected:** Server and Razorpay amounts must match, and items must be bound to the payment.
- **Actual:** `amount` stored is the server-recomputed DB total; the real Razorpay charge is never fetched/compared.
- **Impact:** One small real payment or any captured valid Ctrl+C triplet grants all 9 products (~$89.91 worth) as a "paid" order → all downloads. `alreadyProcessed` idempotency does not stop this on the *first* verify call, and a second user replaying a genuine triplet fails only via a confusing `500 "Failed to save order"` (unique `razorpay_order_id`).

#### H2 — Open redirect on `/login?redirect=…`
- **Feature:** Login flow.
- **File:** `src/app/login/page.tsx:14,76` (`redirectTo = searchParams.get("redirect") || "/dashboard"` then `router.push(redirectTo)`).
- **Repro:** `GET /login?redirect=https://evil.example` → after successful sign-in, the browser navigates to the attacker site (post-auth phishing context; a logged-in user hitting a crafted bookmark/link to `/login` is redirected off-site after re-authenticating).
- **Expected:** Only allow internal paths (whitelist prefix check), not arbitrary URLs.

### MEDIUM

#### M1 — Middleware catch-all redirects: unknown pages, `robots.txt`, `sitemap.xml` and `/payment-success` all redirect to `/login`
- **Feature:** Routing / middleware.
- **File:** `src/lib/supabase/middleware.ts:55-59` (catch-all), `src/middleware.ts`.
- **Repro:** `GET /nonexistent-page`, `/robots.txt`, `/sitemap.xml` → **307 → `/login`** when logged out (→ `/dashboard`/`/admin` when logged in). `/api/nonexistent` correctly serves the custom 404; HTML routes never reach it.
- **Expected:** Unknown HTML routes return the (existing, well-designed) 404 page; `robots.txt`/`sitemap.xml` should be public/404-able.
- **Impact:** Wrong UX for mistyped URLs; SEO crawlers get redirected instead of 404s; `/payment-success` (redirected from checkout) requires login to view — acceptable but means crawlers can't see it.

#### M2 — No HTTP security headers; `X-Powered-By: Next.js` disclosed
- **Feature:** Server hardening.
- **Repro:** Inspect headers on `/`: only `Cache-Control: no-cache, must-revalidate`, `Content-Type`, `X-Powered-By: Next.js`. No `X-Content-Type-Options`, `X-Frame-Options`, `CSP`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`.
- **Impact:** Click-jacking (no frame protection), MIME-sniffing, XSS fallbacks unmitigated at header level; technology disclosure.

#### M3 — Weak SEO/social metadata on public pages
- **Feature:** Marketing/SEO.
- **Repro:** Home `<head>`: title + 1 meta description + viewport present; **no** OpenGraph, no Twitter cards, no canonical, no structured data. Product/browse pages are also empty server-side (see L2).
- **Impact:** Weak discovery; no rich/controlled social sharing previews.

#### M4 — `storage.objects` on `resource-pdfs` has no LIST policy; PDF availability unverifiable
- **Feature:** Download delivery.
- **Repro:** `POST /storage/v1/object/list/resource-pdfs` (root and `products/`) returns 0 objects to anon; `resource-pdfs` bucket existence is unclear (public URL → `400 Bucket not found`, consistent with a private bucket). The 9 products route to `resource-pdfs/products/….pdf` via `/api/orders/download` (`src/app/api/orders/download/route.ts:91-93`).
- **Expected:** Paid users can download the object they purchased.
- **Actual (unverified):** Whether the PDF objects exist **could not be confirmed** without a paid, confirmed account (listing is RLS-hidden). If they were never uploaded, a legitimate paid download returns `500 "Failed to prepare download"` — this needs a real-purchase test to confirm (blocked, see §6).

### LOW

- **L1 —** `thumbnail` column values are paths that only exist in `product-previews` (`e.g. 49be88da-…/…png`), but `resolveThumbnailUrl` builds `resource-thumbnails/{path}` → every card issues a **404 request before gracefully falling back** to the preview image (`src/lib/supabase/products.ts:258-266`, `src/components/marketplace/resource-card.tsx`). Cosmetic/performance only — images do render in a browser.
- **L2 —** Product pages (`/product/{slug}`), browse, home best-sellers and featured render entirely **client-side**: SSR HTML shows "Product Not Found" / empty state even for valid URLs (verified: valid slugs return 200 but contain `Product Not Found` ×1). FOUC + no server-rendered content for bots/no-JS users.
- **L3 —** `/api/razorpay/verify` returns **500 with a raw JS parse message** on malformed JSON body instead of a clean 400 (`route.ts:180`).
- **L4 —** `/product` (no slug segment) → 307 login; `/product/slug/extra` → 404 (fine). Minor nit in the middleware prefix matching.
- **L5 —** Legacy `resources` bucket was created public in migration `002`, but its object (`products/1784820166513.pdf`) currently returns `400 Bucket not found` — not exposed today, but the migration/bucket state is inconsistent and the legacy PDF is unreachable.

---

## 4. Test checklist — detailed results

### Pages & routing
| Test | Result | Notes |
|---|---|---|
| `/` home | PASS 200 | Title OK; 5 hero images all HTTP 200 (verified object sizes); "Coming soon" on Mathematics + English category cards; Science card → `/browse?subject=Science`; all 64 scanned internal hrefs resolve (no dead links); bestsellers/featured sections render client-side (2 bestsellers, 4 featured exist in DB). |
| `/browse`, `/browse?subject=…`, `/browse?grade=Grade 6 / 4` | PASS 200 | Query params survive (they are client-side filters; SSR shows empty state until hydration). |
| `/product/{slug}` ×9 | PASS 200 | Valid slugs reachable; content client-hydrated (see L2). |
| `/about`, `/contact`, `/faq`, `/terms`, `/privacy` | PASS 200 | Real content present; `/terms` & `/privacy` both linked from register T&C checkbox and footer. |
| `/cart`, `/checkout` | PASS 200 | SSR shell; cart is localStorage-only, checkout logic is client-side. |
| `/login`, `/register`, `/forgot-password`, `/verify-email` | PASS 200 | Proper forms present. |
| Unknown routes | FAIL | Redirect to `/login` instead of 404 (see M1). |
| `/robots.txt`, `/sitemap.xml` | FAIL | Redirect to `/login` (see M1) — no real robots/sitemap files exist either. |

### Responsive
- CSS inspection confirms responsive grid/breakpoint classes (`md:`, `sm:`, `lg:`) on cards, nav, checkout and a mobile sticky CTA (`md:hidden`) — PASS by inspection.
- **Actual visual rendering at viewport widths could not be verified** (no browser).

### Authentication
| Test | Result | Notes |
|---|---|---|
| Signup via REST | PASS | Account created; `confirmation_sent_at` set → **email confirmation required**. |
| Login: unconfirmed email | PASS | 400 `email_not_confirmed` "Email not confirmed". |
| Login: wrong password | PASS | 400 `invalid_credentials`. |
| Login: unknown user | PASS | 400 `invalid_credentials` (no user enumeration). |
| Session persistence / refresh | NOT TESTED | Browser + confirmed account required. |
| `/auth/callback` | PASS by review | Exchanges code, roles dashboard/admin (`src/app/auth/callback/route.ts`). No `/auth/callback` in `publicPages` — guests arriving there get 307→login first (supabase handles the exchange only when the route runs). If confirmation links point to this route, guests **will** hit middleware redirect before code exchange — **flagged**, needs a real-browser confirm.

### Guest purchase restriction
| Test | Result |
|---|---|
| `POST /api/razorpay/order` (no session) | PASS 401 |
| `POST /api/orders/download` (no session) | PASS 401 |
| `POST /api/resources/signed-url` (no session) | PASS 401 |
| `POST /api/starter-pack/download` (no session) | PASS 401 |
| `POST /api/razorpay/verify` (no session, fake signature) | PASS 400 (signature checked before auth; auth check present at line 64) |
| Checkout submit while logged out | PASS by code — redirects to `/login?redirect=/checkout` (`src/app/checkout/page.tsx:102-105`) |

### Payment
| Test | Result |
|---|---|
| Order creation amount | PASS — server recomputes from DB prices; client-supplied `price` ignored; qty 1–10, ≤50 items enforced (`src/app/api/razorpay/order/route.ts`). |
| Signature verification | PASS — HMAC-SHA256(`order_id|payment_id`) with server secret. |
| Auth required on both endpoints | PASS — 401 verified. |
| Idempotency / unique order id | PASS — unique constraint + `alreadyProcessed`. |
| **Amount ↔ items reconciliation** | **FAIL (H1)** |
| Actual Razorpay checkout modal + test card payment | NOT TESTED — browser required (see §6). |

### Dashboards / downloads / order history
- **NOT TESTED end-to-end.** Blocker: signup requires email confirmation and no inbox/service-role key was available to activate the test account (see §6). Download authorization code was reviewed in full and is otherwise correct: it requires auth, validates product, and only serves when the **requesting user** has a `paid` order containing that product (`src/app/api/orders/download/route.ts`). Starter-pack claim uses an atomic RPC (`remaining` decrement) — reviewed, not executed.

### Download security / data isolation
- **FAIL (C1)** — the DB write-openness provides a free path to legitimately-purchased-looking rows, so the (correct) download API becomes exploitable.
- **No cross-user visibility** could be exercised (needs 2 confirmed users), but RLS design is correct for reads (`auth.uid() = user_id`, subquery on own orders).
- Storage read side is correctly gated by migration `010` (paid-owner SELECT only).

### Terms / Privacy / Contact
- `/terms` & `/privacy`: 200, full legal docs, linked from register checkbox and footer — PASS.
- `/contact`: 200 — PASS (form behaviour is client-side mailto; not part of an API).

### Edge cases
| Test | Result |
|---|---|
| Missing/invalid `productId` on download API | Requires auth first (401) — PASS |
| `productId` that doesn't exist (server-side branch) | 404 "Product not found" — PASS by review |
| Quantity > 10 / items > 50 / empty items | 400 — PASS by review |
| Unknown product slug page | 200 with "Product Not Found" (client render) — PASS by design, L2 note |
| `/product/{invalid-slug}/extra` | 404 — PASS |

### Security smoke
| Test | Result |
|---|---|
| `orders` insert/update/`order_items` insert (anon) | **FAIL — C1 (201 / 204 / RLS passes)** |
| `products` insert (anon control) | PASS — 401 RLS-denied |
| Protected API auth | PASS — all 401 |
| Protected page redirects | PASS — 307 → `/login` |
| Malformed JSON to verify | PASS-ish — returns 500, should be 400 (L3) |
| Open redirect in login | FAIL — H2 |

### Console / Network / Visual
- **NOT TESTED** — no browser (see §6). No server-side errors observed in `nextdev.out.log` during page fetches.

---

## 5. Strengths found

- Server-side auth checks on every sensitive API route (defense in depth beyond middleware).
- Order amount always recomputed from the DB (no client price trust).
- Razorpay signature verification done server-side with HMAC.
- `alreadyProcessed` idempotency + unique `razorpay_order_id`.
- Download route enforces per-user paid-ownership before serving files.
- Signup requires email confirmation; login errors don't enumerate users.
- Registration has real validation + mandatory T&C/Privacy acknowledgement with proper links.
- Professional custom 404 page exists (just unreachable for HTML routes).

---

## 6. Tests that could NOT be completed, and why

| Item | Blocker |
|---|---|
| Slideshow arrows / auto-transition / smoothness; preloader & fade animations | Requires a browser (no Playwright/Puppeteer available; installs forbidden). |
| Real Razorpay checkout modal (fill card/UPI, complete payment, failure paths) | Requires the JS modal in a browser. |
| Console errors & network waterfall / broken-image counts per page | Browser devtools required. |
| Visual rendering at mobile/tablet/desktop breakpoints | Browser required. |
| Authenticated flows: dashboard downloads, order history, starter-pack claim, admin CRUD | Signup requires **email confirmation**; the test account stayed unconfirmed because no inbox access or service-role key exists in this environment to activate it. |
| Data isolation across two real users | Same blocker (needs 2 confirmed accounts). |
| Verify that paid `/api/orders/download` actually returns the PDF (vs 500) | Same blocker — needs a real paid session. |

These areas were compensated by full source review and by exercising the auth gates (401 responses) and RLS behaviour over direct REST.

---

## 7. Recommended priorities

1. **C1 — Re-secure `orders` / `order_items` RLS (P0).** Add a `to authenticated` (better: server-only write path) and remove the blind `using/check(true)` policies. The robust fix is to have server routes use a **service-role client** (bypasses RLS) for inserts and to scope any remaining policies tightly. Keep the dedicated SELECT policies as-is. Note: scoping to `authenticated` is not sufficient on its own — authenticated REST callers could still write `paid` rows directly; the server write path must not accept client-authored order state.
2. **H1 — Reconcile payment vs items.** In `/api/razorpay/verify`, fetch the Razorpay order (`orders.fetch(id)`) and require `charged amount ≥ recomputed total` and item count consistency before inserting order items; bind items/quantity into the Razorpay order `notes` as a cross-check.
3. **H2 — Whitelist the post-login redirect** to internal paths only (e.g. start with `/` and not `//` or `http`).
4. **M1 — Fix middleware routing:** let unknown HTML routes hit the 404; add `robots.txt`/`sitemap.xml`/`payment-success`/`auth/callback` to public handling.
5. **M2/M3 — Add security headers** (via `next.config`/headers) and social/OG + canonical meta per page.
6. **L1/Fix thumbnails** — point the `thumbnail` column at `resource-thumbnails` paths or drop to a single source of truth to remove the per-card 404.
7. **M4 — Verify PDF presence** in `resource-pdfs` once a purchase can be executed.