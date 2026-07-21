# CHANGELOG.md — Marque Digital Marketplace

---

## [0.2.0] — 2026-07-21

### Added

- **Shared product store** (`src/lib/product-store.tsx`): React context holding all products in memory with full CRUD operations. Accessible via `useProducts()` hook.
- **Admin product editor** (`src/components/admin/product-editor.tsx`): Modal form for adding and editing resources. Supports all fields: title, description, subject, qualification, exam board, session, paper, variant, price, discount, thumbnail, PDF, tags, featured, and published.
- **Admin resource CRUD**: Admin Resources page now supports add, edit, delete, duplicate, publish/unpublish, and feature/unfeature operations with confirmation dialogs.
- **Dynamic search**: Browse page search input is now wired to filter products by title, subject, exam code, description, and tags.
- **Dynamic category counts**: Homepage category counts now reflect the actual number of published products per subject.

### Changed

- **Product type extended**: Added `published`, `featured`, `paper`, `variant`, `discount`, `thumbnail`, `pdfUrl` fields to the `Product` type.
- **Homepage** (`src/app/page.tsx`): Now reads bestsellers and categories from shared product store instead of static imports.
- **Browse page** (`src/app/browse/page.tsx`): Now reads products from shared store. Search and filters operate on live data.
- **Product detail page** (`src/app/product/[slug]/page.tsx`): Converted from static SSG to dynamic client component. Reads product from `ProductProvider` context via `useParams()`. Shows "Product Not Found" gracefully.
- **Admin Resources page** (`src/app/admin/resources/page.tsx`): Rewired to use shared product store. Added "Add Resource" button, working dropdown actions (Edit, Publish/Unpublish, Feature/Unfeature, Duplicate, Delete), and delete confirmation modal.
- **Providers** (`src/components/providers.tsx`): Now wraps app in `ProductProvider` in addition to `AuthProvider` and `ToastProvider`.
- **All initial products**: Now include `published: true` and `featured` fields.

### Architecture Notes

- Product detail route changed from SSG (static) to Dynamic (client-rendered) because it reads from React context.
- All 15 seed products remain in `dummy-data.ts` as initial state. The store clones them into React state on mount.
- Admin CRUD operations modify only the in-memory state. Changes are lost on page reload (no persistence).
- Middleware auth bypass remains in place from previous change — auth will be re-enabled after Supabase integration.

---

## [0.1.0] — 2026-07-20

### Added

- Initial release with 32 routes + 15 SSG product pages
- Full marketplace UI: homepage, browse, product details, cart, checkout
- Student dashboard: downloads, orders, wishlist, profile, settings
- Admin portal: overview, users, resources, orders, categories, reviews, analytics, settings
- Auth pages: login, register, forgot/reset password, verify email
- Design system: Fraunces/Inter/JetBrains Mono fonts, 8 color tokens, CSS utility classes
- 34 marketplace components, 9 dashboard components, 15 UI primitives
- Supabase Auth integration (paused for frontend-only development)
- Static data: 15 products, categories, testimonials, FAQs, orders
