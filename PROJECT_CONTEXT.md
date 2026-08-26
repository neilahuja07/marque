# PROJECT_CONTEXT.md — Scholar Stack Digital Marketplace

> Premium marketplace for Cambridge IGCSE, O Level & A Level study resources.
> Two roles: student and admin. Supabase Auth (email/password + Google OAuth).

---

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.10 |
| UI | React | 19.2.4 |
| Language | TypeScript | ^5 |
| CSS | Tailwind CSS v4 | ^4 |
| Animation | Framer Motion | ^12.42 |
| Icons | Lucide React | ^1.25 |
| Utilities | clsx, tailwind-merge, class-variance-authority | — |

---

## Folder Structure

```
src/
├── app/                          # Pages (App Router)
│   ├── layout.tsx                # Root layout: fonts, metadata, globals
│   ├── page.tsx                  # Homepage: hero, categories, bestsellers, CTA
│   ├── not-found.tsx             # Custom 404
│   ├── globals.css               # Tailwind v4 theme, custom classes
│   ├── about/page.tsx
│   ├── browse/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── login/page.tsx
│   ├── orders/page.tsx
│   ├── privacy/page.tsx
│   ├── profile/page.tsx
│   ├── register/page.tsx
│   ├── terms/page.tsx
│   ├── downloads/page.tsx        # Legacy standalone page
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   ├── verify-email/page.tsx
│   ├── settings/page.tsx
│   ├── wishlist/page.tsx
│   ├── product/[slug]/page.tsx   # Dynamic: reads from ProductProvider context
│   ├── dashboard/                # Student dashboard
│   │   ├── page.tsx
│   │   ├── downloads/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── profile/page.tsx
│   └── admin/                    # Admin portal
│       ├── page.tsx              # Overview: platform stats, users, orders
│       ├── users/page.tsx        # User management with role/status badges
│       ├── resources/page.tsx    # Resource moderation queue
│       └── orders/page.tsx       # Order management + refund flow
├── components/
│   ├── marketplace/              # 34 marketplace components
│   ├── dashboard/                # 6 dashboard components
│   ├── admin/                    # Admin components (product-editor)
│   ├── providers.tsx             # AuthProvider + ProductProvider + ToastProvider
│   ├── auth-provider.tsx         # Auth context (user, role, session, signOut)
│   └── ui/                       # 13 shared UI primitives
└── lib/
    ├── dummy-data.ts             # Core types + 15 products + orders + FAQs
    ├── product-store.tsx         # Shared product state (React context + CRUD)
    ├── portal-data.ts            # Admin dummy data
    ├── dashboard-sidebar.tsx     # Student sidebar config
    ├── admin-sidebar.tsx         # Admin sidebar config
    ├── utils.ts                  # cn() utility
    └── supabase/
        ├── client.ts             # Browser client (with build-safe fallback)
        ├── server.ts             # Server client (cookies-based)
        └── middleware.ts         # Middleware client (session refresh + route protection)
```

---

## Routes (32 total)

### Core Pages
| Route | Description | Type |
|-------|-------------|------|
| `/` | Homepage: hero + auth form, categories, bestsellers, CTA | Static |
| `/browse` | Browse resources: search, filters, grid, pagination | Static |
| `/product/[slug]` | Product details: gallery, info, reviews, FAQ, related | SSG (15 pages) |
| `/cart` | Shopping cart: items, quantity, order summary, trust | Static |
| `/checkout` | Checkout: form, payment selector, order confirmation modal | Static |
| `/about` | About page: mission, stats, testimonials | Static |
| `/contact` | Contact form + info cards | Static |
| `/faq` | FAQ accordion | Static |
| `/privacy` | Privacy policy (7 sections) | Static |
| `/terms` | Terms of service (8 sections) | Static |
| `/wishlist` | Standalone wishlist: product grid, remove, move to cart | Static |

### Auth Pages
| Route | Description | Type |
|-------|-------------|------|
| `/login` | Login: split layout, branded left panel, form right | Auth |
| `/register` | Register: split layout, full form with validation | Auth |
| `/forgot-password` | Forgot password: email input, sent state | Auth |
| `/reset-password` | Reset password: new password + confirm, success state | Auth |
| `/verify-email` | Email verification: numbered steps, resend button | Auth |

### Student Dashboard
| Route | Description | Type |
|-------|-------------|------|
| `/dashboard` | Dashboard home: stats, learning, orders, downloads | Protected (student) |
| `/dashboard/downloads` | Downloads: table/cards, search, filters, bulk actions | Protected (student) |
| `/dashboard/orders` | Order history: table/cards, status filters, invoices | Protected (student) |
| `/dashboard/wishlist` | Wishlist: product grid, remove, move to cart | Protected (student) |
| `/dashboard/profile` | Profile: form, avatar, notifications, appearance, danger zone | Protected (student) |
| `/settings` | Settings: language, region, display, email, sessions, data & privacy | Protected (student) |

### Admin Portal
| Route | Description | Type |
|-------|-------------|------|
| `/admin` | Admin overview: platform stats, recent orders/users, quick actions | Protected (admin) |
| `/admin/users` | User management: search, filters, role badges, suspend/delete | Protected (admin) |
| `/admin/resources` | Resource moderation: approve, reject, feature, edit metadata | Protected (admin) |
| `/admin/orders` | Order management: refund button, status updates, invoice preview | Protected (admin) |

### Legacy Pages
| Route | Description | Type |
|-------|-------------|------|
| `/downloads` | Legacy standalone downloads page | Static |
| `/orders` | Legacy standalone orders page | Static |
| `/profile` | Legacy standalone profile page | Static |

### Auth Routes
| Route | Description | Type |
|-------|-------------|------|
| `/auth/callback` | Supabase email verification callback | Dynamic (Middleware) |

---

## Design System

### Fonts (loaded via `next/font` in `layout.tsx`)

| Font | CSS Variable | Usage |
|------|-------------|-------|
| Fraunces | `--font-display` | Headings, display text, nav logo |
| Inter | `--font-body` | Body text, UI elements |
| JetBrains Mono | `--font-mono` | Order IDs, code, monospace |

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#12181B` | Primary text, headings |
| `parchment` | `#F6F3EC` | Page background, input backgrounds |
| `slate` | `#5B6663` | Secondary text, descriptions |
| `teal` | `#8FB3A3` | Links, accents (same as `sage`) |
| `teal-dark` | `#1F4B43` | Primary buttons, active states, CTAs |
| `brass` | `#B08D57` | Badges, highlights, tick marks |
| `sage` | `#8FB3A3` | Success states, secondary accents |
| `warm-gray` | `#EFEAE0` | Hover backgrounds, subtle fills |

### CSS Custom Classes (globals.css)

| Class | Purpose |
|-------|---------|
| `.btn-primary` | Teal-dark button with hover lift + shadow |
| `.btn-outline` | Border button with hover lift |
| `.card-hover` | Card lift effect on hover (-3px + shadow) |
| `.nav-link` | Nav link with animated underline |
| `.input-field` | Form input with teal focus ring |
| `.animate-float` | Gentle floating animation (5s loop) |
| `.animate-fade-in-up` | Fade + slide up entrance |
| `.nav-scrolled` | Navbar shadow when scrolled |
| `.bg-grid` | Subtle 40px grid background pattern |
| `.tick-mark::before` | Brass dot pseudo-element |

### Touch Targets

All interactive elements meet 44px minimum touch target on mobile. Inputs use `py-3` (48px), buttons `py-3`, icon buttons `p-2.5`, nav links `py-2.5`.

---

## Animations

| Component | Animation | Trigger |
|-----------|-----------|---------|
| `FadeIn` | Opacity 0→1 + translateY 12px→0 | IntersectionObserver (threshold 0.1) |
| `AnimatedCounter` | Number counts up with easing | IntersectionObserver (threshold 0.3) |
| `.card-hover` | translateY(-3px) + shadow | CSS hover |
| `.btn-primary` | translateY(-1px) + teal shadow | CSS hover |
| `.nav-link::after` | Underline width 0→100% | CSS hover |
| `.input-field:focus` | Border + glow ring | CSS focus |
| `prefers-reduced-motion` | All animations disabled | System preference |

---

## Reusable Components

### Marketplace (`src/components/marketplace/`)

| Component | Props | Usage |
|-----------|-------|-------|
| `Navbar` | — | Sticky nav with scroll shadow, mobile menu, cart badge |
| `Footer` | — | Full footer with link sections, copyright |
| `ResourceCard` | `product: Product` | Product card with gradient cover, rating, price |
| `CategoryCard` | `category: Category` | Category card with accent color |
| `Hero` | — | Hero section with auth form |
| `HeroAuthForm` | — | Sign in/up toggle form (used in hero) |
| `Statistics` | — | Animated stats section (imports data internally) |
| `Testimonials` | — | Testimonials grid (imports data internally) |
| `CTA` | — | Call-to-action banner |
| `Breadcrumbs` | `items: {label, href?}[]` | Breadcrumb navigation |
| `CartItem` | `product, quantity, onQuantityChange, onRemove` | Cart line item |
| `OrderSummary` | `subtotal, discount, tax` | Order summary sidebar (cart) |
| `TrustSection` | — | Trust badges (reused in cart + checkout) |
| `EmptyCart` | — | Empty cart state |
| `FilterSidebar` | `filters, active, onChange, onClear` | Desktop filter sidebar |
| `MobileFilterDrawer` | same as FilterSidebar | Mobile filter drawer |
| `Pagination` | `currentPage, totalPages, onPageChange` | Page navigation |
| `BrowseEmpty` | `type, onClear` | Empty/no-results state |
| `ProductGallery` | `images, cover` | Product image gallery |
| `WhatsIncluded` | `items: string[]` | Checklist of included items |
| `SyllabusCoverage` | `topics: string[]` | Topic badges |
| `ResourceInfo` | `product` | Resource metadata card |
| `SamplePages` | `pages` | Sample page previews |
| `ReviewsSection` | `reviews, distribution` | Reviews with rating bars |
| `ProductFAQ` | `faqs: FAQ[]` | FAQ accordion |
| `ExamCodeBadge` | `code: string` | Exam code badge |
| `RatingStars` | `rating, count` | Star rating display |
| `PaymentMethodSelector` | `value, onChange` | Payment method radio selector (UPI, cards) |
| `OrderConfirmationModal` | `isOpen, onClose, orderNumber, email, total` | Success modal |
| `AuthBranding` | — | Left panel for auth pages (logo, headline, trust points) |
| `AuthCard` | `title, subtitle, children` | Right panel wrapper for auth forms |
| `AuthFormInput` | `id, label, value, onChange, error, success, ...` | Input with validation states |
| `PasswordInput` | extends AuthFormInput + show/hide toggle | Password field |
| `SocialLoginDivider` | — | "or" divider + Google button |

### Dashboard (`src/components/dashboard/`)

| Component | Props | Usage |
|-----------|-------|-------|
| `DashboardLayout` | `sidebarItems, header, children` | Full layout with collapsible sidebar + mobile drawer |
| `DashboardStatCard` | `label, target, icon, trend?` | Stat card with animated counter |
| `ContinueLearningCard` | `title, subject, level, progress, slug, cover` | Horizontal learning card with progress bar |
| `AchievementBadge` | `icon, label, value` | Achievement badge |
| `ActivityTimeline` | `items: {icon, label, date, color?}[]` | Vertical activity timeline |
| `DashboardSearch` | `value, onChange, placeholder?` | Search input for dashboard pages |
| `DashboardFilterPills` | `filters, active, onChange` | Horizontal filter pills |
| `DashboardEmpty` | `icon, title, description, action?` | Empty state for dashboard pages |
| `DashboardSectionHeader` | `title, count?, actions?` | Page title + count + action buttons |

### UI Primitives (`src/components/ui/`)

| Component | Props | Usage |
|-----------|-------|-------|
| `FadeIn` | `children, className?, delay?` | IntersectionObserver fade-in wrapper |
| `AnimatedCounter` | `target: string, className?` | Viewport-triggered number animation |
| `Skeleton` | `className?` | Loading skeleton base (also SkeletonCard, SkeletonTable, SkeletonDashboard) |
| `Modal` | `isOpen, onClose, children, title?, description?, maxWidth?` | Accessible modal with overlay, Escape close |
| `Tabs` | `children, defaultValue, className?` | Tab container (Tabs, TabsList, TabsTrigger, TabsContent) |
| `Dropdown` | `trigger, children, align?, className?` | Dropdown menu (Dropdown, DropdownItem, DropdownSeparator) |
| `Toast` | `ToastProvider, useToast` | Toast notification system (default/success/error variants) |
| `Avatar` | `initials, size?, className?` | Avatar display (sm/md/lg) |
| `Badge` | `children, variant?, className?` | Generic badge (default/success/warning/error/info) |
| `BarChart` | `data, title?, height?, color?` | Simple SVG bar chart |
| `LineChart` | `data, title?, height?, color?` | SVG line chart with area fill |
| `DonutChart` | `data, title?, size?` | SVG donut/pie chart |
| `InvoiceModal` | `isOpen, onClose, order, sellerName?` | Reusable invoice preview modal |

---

## Dummy Data

### Core Data (`src/lib/dummy-data.ts`)

| Export | Count | Description |
|--------|-------|-------------|
| `products` | 15 | Full product objects with details for product #1 |
| `categories` | 3 | Mathematics, Science, English |
| `testimonials` | 3 | Student/tutor testimonials |
| `stats` | 4 | Platform statistics |
| `faqs` | 5 | General FAQs |
| `sampleOrders` | 3 | Order history (completed, refunded) |
| `allLevels` | 3 | IGCSE, O Level, A Level |
| `allTypes` | 4 | Past Paper, Mock Test, Worksheet, Revision Notes |
| `allSubjects` | 3 | Mathematics, Science, English |

### Portal Data (`src/lib/portal-data.ts`)

| Export | Description |
|--------|-------------|
| `sellerProducts` | 8 seller products with status, sales, revenue, rating |
| `sellerOrders` | 8 seller orders with items, status |
| `sellerReviews` | 5 seller reviews with ratings |
| `sellerRevenueData` | 6-month revenue data for charts |
| `sellerDownloadsData` | 6-month downloads data for charts |
| `sellerSalesBySubject` | Sales breakdown by subject for donut chart |
| `adminUsers` | 10 admin users with roles and statuses |
| `adminResources` | 10 admin resources with moderation statuses |
| `adminOrders` | 7 admin orders |

---

## Dashboard Architecture

### Shared Sidebar Configs
- `src/lib/dashboard-sidebar.tsx` — Student dashboard sidebar (7 items)
- `src/lib/admin-sidebar.tsx` — Admin portal sidebar (8 items)

### DashboardLayout Pattern
```
DashboardLayout (sidebarItems, header, children)
├── Desktop sidebar (collapsible: 260px ↔ 72px)
├── Mobile sidebar (hamburger → drawer)
├── Header slot (optional, passed as prop)
└── Main content area (children)
```

All dashboard and admin pages wrap content in `<DashboardLayout>` with their respective sidebar items.

---

## Architecture Decisions

1. **Tailwind v4**: Uses `@import "tailwindcss"` and `@theme inline` blocks (not v3 config). Custom CSS in `globals.css`.
2. **No `"use client"` in layout**: Only page components that need interactivity use `"use client"`. Root layout is a server component.
3. **Shared product state**: `ProductProvider` (React context) holds all products in memory. Pages consume via `useProducts()`. Changes propagate instantly across the app.
4. **Component organization**: Marketplace in `src/components/marketplace/`, dashboard in `src/components/dashboard/`, admin in `src/components/admin/`, shared UI in `src/components/ui/`.
5. **Data co-location**: Core data in `src/lib/dummy-data.ts`, portal data in `src/lib/portal-data.ts`, product store in `src/lib/product-store.tsx`.
6. **Supabase Auth**: Email/password + Google OAuth via `@supabase/ssr`. Client utility has build-safe fallback for static generation. Middleware handles session refresh, route protection, and role-based redirects.
7. **Payment is UI-only**: `PaymentMethodSelector` is a standalone component designed to be swapped for Razorpay later.
8. **Sidebar configs are shared**: Two sidebar config files (student, admin). Adding a new page only requires adding an entry.
9. **Touch targets**: All interactive elements ≥ 44px on mobile. Inputs `py-3`, buttons `py-3`, icon buttons `p-2.5`.
10. **Animations**: Only `FadeIn` (IntersectionObserver) and `AnimatedCounter`. All respect `prefers-reduced-motion`.
11. **Charts are pure SVG**: BarChart, LineChart, DonutChart are lightweight SVG components with no external charting library.
12. **Roles**: Two roles — `student` and `admin`. No seller role.
13. **Route protection**: Middleware is currently bypassed for frontend-only development. Auth will be re-enabled after Supabase integration.
14. **Product CRUD**: Admin can add, edit, delete, duplicate, publish/unpublish, and feature/unfeature resources via the product editor modal. All changes reflect immediately across browse, search, categories, home featured, and product detail pages.

---

## Naming Conventions

- **Files**: kebab-case (`resource-card.tsx`, `dashboard-layout.tsx`)
- **Components**: PascalCase (`ResourceCard`, `DashboardLayout`)
- **Routes**: lowercase (`/dashboard/downloads`, `/admin/analytics`)
- **Types**: PascalCase, exported from `dummy-data.ts` or `portal-data.ts`
- **CSS classes**: kebab-case, prefixed with `btn-`, `nav-`, `card-`, `animate-`
- **Tailwind tokens**: `ink`, `parchment`, `slate`, `teal`, `teal-dark`, `brass`, `sage`, `warm-gray`
- **Barrel exports**: `marketplace/index.ts` exports select components (not all)

---

## Remaining TODOs

### Pages not yet built
- All pages are now built (32 routes + 15 SSG product pages)

### Features not implemented
- Real payment processing (Razorpay placeholder exists)
- Backend API routes
- Database integration
- Image uploads (avatar change is button-only)
- Google OAuth (button exists, requires Supabase provider config)
- PDF file upload in product editor (placeholder UI exists)

### Component gaps
- `DataTable` generic sortable/filterable table (currently duplicated per page)
- `Statistics` and `Testimonials` import data internally (should accept props for flexibility)

---

## Important Implementation Notes

- **Build command**: `npm run build` — always run before committing to verify no type errors
- **Static pages**: Most pages are statically rendered at build time. Product detail page (`/product/[slug]`) is dynamic (client component reading from ProductProvider context).
- **Product store**: `ProductProvider` wraps the app via `Providers`. All product state is shared React context. Use `useProducts()` hook to access products and CRUD methods.
- **Mobile menu**: Navbar has a hamburger → slide-in drawer pattern
- **Cart state**: Client-side only `useState`, resets on page load
- **Order confirmation**: Modal, not a separate page
- **Auth in hero**: Homepage hero has an inline sign-in/sign-up form (separate `/login` and `/register` pages also exist with split layout)
- **Supabase env vars**: `.env.local` must have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Client has build-safe fallback for missing values.
- **Route protection**: Middleware runs on every non-static request. Enforces auth for dashboard routes, redirects guests to `/login`, and enforces role-based access.
- **Sidebar collapse**: Desktop sidebar can collapse to 72px icon-only mode
- **Mobile dashboard**: Sidebar becomes a drawer overlay, tables become cards
- **Seller/Admin portals**: Use same DashboardLayout as student dashboard, with dedicated sidebar configs
- **Charts**: Pure SVG components (BarChart, LineChart, DonutChart) — no external charting library
- **Invoice modal**: Reusable across seller and admin portals via InvoiceModal component
