# Changelog — Marque Digital Marketplace

All notable changes to this project will be documented in this file.

---

## v0.1.0 — Initial Marketplace

### Added
- Homepage (hero with auth form, categories, bestsellers, CTA, footer)
- Browse Resources page (search, filter sidebar, mobile filter drawer, product grid, pagination)
- Product Details page (gallery, info, what's included, syllabus, reviews, FAQ, related, CTA)
- Shopping Cart page (cart items, quantity controls, order summary, trust section)
- 15 product dummy data with full details
- Navbar (sticky, scroll shadow, mobile menu, cart badge)
- Footer (link sections, newsletter, copyright)
- Design system (Fraunces, Inter, JetBrains Mono fonts)
- Color tokens (ink, parchment, slate, teal, teal-dark, brass, sage, warm-gray)
- CSS utility classes (btn-primary, btn-outline, card-hover, nav-link, input-field)
- FadeIn animation component (IntersectionObserver)
- AnimatedCounter component (viewport-triggered)
- ResourceCard, CategoryCard, Breadcrumbs, Pagination components
- FilterSidebar, MobileFilterDrawer components
- CartItem, OrderSummary, TrustSection, EmptyCart components
- ProductGallery, WhatsIncluded, SyllabusCoverage, ResourceInfo components
- ReviewsSection, ProductFAQ, ExamCodeBadge, RatingStars components

---

## v0.2.0 — Micro-Interactions & Polish

### Added
- Card hover lift effect (translateY -3px + shadow)
- Button hover lift + shadow transitions
- Nav link animated underline
- Input focus teal ring
- Navbar scroll-aware shadow
- Hero auth form fade-in animation

### Improved
- All interactive elements now have smooth transitions
- Reduced motion support via `prefers-reduced-motion`

### Fixed
- Navbar z-index overlap on mobile
- Responsive spacing across all breakpoints
- Mobile touch targets below 44px minimum

---

## v0.2.1 — Mobile Touch Targets

### Fixed
- Navbar cart/hamburger icons (p-2 → p-2.5, 44px)
- Mobile nav links (added py-2.5)
- Hero auth form inputs (py-2 → py-3)
- Hero auth form buttons (py-2.5 → py-3)
- Password toggle buttons (h-9 w-9)
- Cart item quantity buttons (h-7 w-7 → h-10 w-10)
- Filter sidebar checkboxes (added py-1)
- Pagination buttons (h-9 w-9 → h-10 w-10)
- Order summary inputs/buttons (py-2 → py-2.5)
- Browse page search/filters (py-2.5 → py-3)
- Product page Wishlist/Share buttons (added py-2.5 px-3)
- Reviews show-all button (added py-2)
- Footer links (added py-1.5)
- Product gallery thumbnail overflow (added overflow-x-auto)

---

## v0.3.0 — Checkout & Auth Pages

### Added
- Checkout page (contact info, billing details, payment method selector, order notes, sticky summary, trust section, confirmation modal, mobile sticky CTA)
- PaymentMethodSelector component (UPI, Credit Card, Debit Card, International Cards — Razorpay-ready)
- OrderConfirmationModal component (success state, order number, email confirmation)
- Login page (split layout, branded left panel, form with validation, loading state)
- Register page (split layout, full form with validation, password strength, terms checkbox)
- AuthBranding component (left panel with logo, headline, trust points)
- AuthCard component (right panel wrapper)
- AuthFormInput component (validation states: error, success, focus, disabled)
- PasswordInput component (show/hide toggle)
- SocialLoginDivider component ("or" + Google button)
- About page (mission, values, stats, testimonials, CTA)
- Contact page (form, info cards, response times)
- FAQ page (accordion, contact CTA)
- Privacy Policy page (7 sections)
- Terms of Service page (8 sections)
- Custom 404 page

### Improved
- Touch targets across all form inputs and buttons
- Form validation UX (error messages, success checkmarks)

---

## v0.4.0 — Student Dashboard

### Added
- DashboardLayout component (collapsible sidebar 260px ↔ 72px, mobile drawer)
- DashboardStatCard component (animated counter, optional trend)
- ContinueLearningCard component (horizontal card with progress bar)
- AchievementBadge component
- ActivityTimeline component
- DashboardSearch component
- DashboardFilterPills component
- DashboardEmpty component
- DashboardSectionHeader component
- Shared sidebar config (`/lib/dashboard-sidebar.tsx`)
- Student Dashboard home page (greeting header, stats, continue learning, recent downloads/orders, recommended, achievements, activity timeline, quick actions)
- Downloads page (search, filter pills, bulk select, table + mobile cards)
- Orders page (search, status filters, table + mobile cards, invoice button)
- Wishlist page (search, product grid, remove/move to cart, empty states)
- Profile page (avatar, personal info, password, notifications, appearance, connected accounts, danger zone)

### Improved
- Mobile responsiveness across all dashboard pages
- Tables convert to cards on mobile
- Sidebar becomes drawer overlay on mobile

### Fixed
- Dashboard sidebar active state highlighting
- Mobile header spacing

---

## v0.5.0 — Seller, Admin & Legacy Pages

### Added
- Seller Dashboard (revenue stats, listings table)
- Admin Dashboard (platform stats, recent orders/users, quick actions)
- Legacy standalone pages (`/downloads`, `/orders`, `/profile`)
- Dashboard sub-page reusable components

### Improved
- Component reuse across all dashboard pages
- Consistent card/table patterns

---

## v0.6.0 — Documentation & Context

### Added
- PROJECT_CONTEXT.md (full project summary for AI engineers)
- TODO_FRONTEND.md (complete feature checklist by priority)
- CHANGELOG.md (this file)

---

## v0.7.0 — Missing Pages & Components

### Added
- `/wishlist` — Standalone wishlist page (Navbar/Footer layout, product grid, remove/move-to-cart)
- `/settings` — Settings page (DashboardLayout, language/region, display preferences, email prefs, data & privacy, active sessions)
- `/forgot-password` — Forgot password page (split layout, email sent state, try again)
- `/reset-password` — Reset password page (split layout, new password + confirm with validation, success state)
- `/verify-email` — Email verification page (split layout, numbered steps, resend button)
- `Skeleton` component — Loading skeleton (SkeletonCard, SkeletonTable, SkeletonDashboard variants)
- `Toast` component — Notification system (ToastProvider, useToast hook, success/error/default variants)
- `Modal` component — Generic modal (overlay, Escape key close, focus management, aria attributes)
- `Tabs` component — Tab navigation (Tabs, TabsList, TabsTrigger, TabsContent)
- `Dropdown` component — Dropdown menu (Dropdown, DropdownItem, DropdownSeparator, click-outside close)
- `Avatar` component — Reusable avatar (sm/md/lg sizes, initials-based)
- `Badge` component — Generic badge (default/success/warning/error/info variants)
- Skip-to-content link in root layout (sr-only, visible on focus)
- `id="main-content"` on all `<main>` elements for skip link target
- Open Graph / meta tags on all pages (server metadata exports + client layout metadata files)
- `Providers` component wrapping root layout (ToastProvider)
- 17 layout.tsx files for client component pages (metadata exports)

### Improved
- Accessibility: keyboard navigation for modals (Escape to close), focus management
- SEO: every page now has proper `<title>` and `<meta description>` tags
- SEO: Open Graph tags (title, description, type) for social sharing

### Fixed
- Missing `/settings` page (sidebar link was broken)
- Missing `/wishlist` standalone page

---

## v0.8.0 — Seller Portal & Admin Portal

### Added
- **Seller Portal** — Full seller management interface
  - `/seller` — Overview dashboard with revenue stats, sales chart, recent sales, reviews, top products, quick actions
  - `/seller/products` — Product management table (search, filters, status badges, dropdown actions, bulk operations)
  - `/seller/upload` — 5-step upload wizard (basic info, PDF upload, pricing, preview, publish)
  - `/seller/orders` — Order management (search, filters, payment status, invoice modal)
  - `/seller/analytics` — Revenue/downloads charts, sales by subject donut chart, top products, stats, activity timeline
  - `/seller/settings` — Store info, payout details, notification toggles, danger zone
  - Seller sidebar config (`/lib/seller-sidebar.tsx`) — 6 navigation items

- **Admin Portal** — Full admin management interface
  - `/admin` — Overview dashboard with platform stats, recent orders/users, quick actions
  - `/admin/users` — User management (search, filters, role/status badges, suspend/delete, dropdown actions)
  - `/admin/resources` — Resource moderation (approve, reject, feature, edit metadata)
  - `/admin/orders` — Order management (refund flow, invoice modal, status updates)
  - `/admin/categories` — Category CRUD by type (subject, level, tag, resource type)
  - `/admin/reviews` — Review moderation (approve, hide, delete, reported review highlights)
  - `/admin/analytics` — Platform analytics (revenue/users/downloads charts, sales by country donut, top sellers, top products)
  - `/admin/settings` — 6-tab platform settings (general, branding, email, payment, storage, security)
  - Admin sidebar config (`/lib/admin-sidebar.tsx`) — 8 navigation items

- **Shared UI Components**
  - `BarChart` — Simple SVG bar chart (pure SVG, no external dependencies)
  - `LineChart` — SVG line chart with area fill
  - `DonutChart` — SVG donut/pie chart
  - `InvoiceModal` — Reusable invoice preview modal (shared across seller and admin portals)

- **Portal Data** — `/lib/portal-data.ts`
  - Seller data: products, orders, reviews, revenue/downloads/subject data
  - Admin data: users, resources, orders, reviews, categories, revenue/users/downloads/country data, top sellers

### Improved
- All seller/admin pages use DashboardLayout with dedicated sidebar configs
- Consistent card/table patterns across all portal pages
- Tables convert to cards on mobile
- Charts are pure SVG with no external charting library dependencies
- All portal pages follow same layout pattern as student dashboard

### Architecture
- Three sidebar configs (student, seller, admin) for shared DashboardLayout
- Core data in `dummy-data.ts`, portal data in `portal-data.ts`
- Portal data co-located with its domain (seller + admin in one file)

---

## Roadmap

### v0.9.0 — UX Polish
- Dark mode toggle
- Page transition animations
- Scroll restoration
- Structured data (JSON-LD)
- DataTable component

### v1.0.0 — Backend Integration
- Supabase Auth
- Razorpay payments
- Database (Supabase)
- File storage
- Email (Resend/SendGrid)
- API routes
