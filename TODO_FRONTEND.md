# TODO_FRONTEND.md — Marque Digital Marketplace

> Frontend feature checklist. All routes, components, and features.
> Last updated: July 2026

---

## Complete

### Core Pages
- [x] `/` — Homepage (hero + auth form, categories, bestsellers, CTA, footer)
- [x] `/browse` — Browse Resources (search, filter sidebar, mobile filter drawer, product grid, pagination, empty states)
- [x] `/product/[slug]` — Product Details (breadcrumbs, gallery, info, what's included, syllabus, resource info, sample pages, reviews, FAQ, related, CTA). 15 products statically generated.
- [x] `/cart` — Shopping Cart (cart items, quantity controls, order summary, coupon, trust section, empty cart, recommended)
- [x] `/checkout` — Checkout (contact info, billing details, payment method selector, order notes, sticky order summary, trust section, confirmation modal, mobile sticky CTA)
- [x] `/about` — About (mission, values, stats, testimonials, CTA)
- [x] `/contact` — Contact (form, info cards, response times)
- [x] `/faq` — FAQ (accordion, contact CTA)
- [x] `/privacy` — Privacy Policy (7 sections)
- [x] `/terms` — Terms of Service (8 sections)
- [x] `/not-found` — Custom 404 page

### Auth Pages
- [x] `/login` — Login (split layout, branding left, form right, validation, loading state, social login)
- [x] `/register` — Register (split layout, branding left, full form, validation, password strength, terms checkbox)

### Student Dashboard
- [x] `/dashboard` — Dashboard Home (greeting header, stats, continue learning, recent downloads, recent orders, recommended, achievements, activity timeline, quick actions)
- [x] `/dashboard/downloads` — Downloads (search, filter pills, bulk select, table + mobile cards, download/preview buttons, empty states)
- [x] `/dashboard/orders` — Order History (search, status filters, table + mobile cards, invoice button, empty states)
- [x] `/dashboard/wishlist` — Wishlist (search, product grid, remove/move to cart buttons, empty states)
- [x] `/dashboard/profile` — Profile (avatar, personal info form, password, notifications toggles, appearance theme, connected accounts, danger zone, save)

### Seller Portal
- [x] `/seller` — Seller Overview (revenue stats, sales chart, recent sales, recent reviews, top products, quick actions)
- [x] `/seller/products` — Product Management (search, filters, product table, status badges, bulk actions, dropdown menu)
- [x] `/seller/upload` — Upload Wizard (5-step form: basic info, PDF upload, pricing, preview, publish)
- [x] `/seller/orders` — Orders (search, filters, order table, payment status, invoice modal)
- [x] `/seller/analytics` — Analytics (revenue chart, downloads chart, sales by subject donut, top products, stats, activity timeline)
- [x] `/seller/settings` — Settings (store info, payout details, notification toggles, danger zone)

### Admin Portal
- [x] `/admin` — Admin Overview (platform stats, recent orders, recent users, quick actions)
- [x] `/admin/users` — User Management (search, filters, user table, role/status badges, suspend/delete, dropdown actions)
- [x] `/admin/resources` — Resource Moderation (search, filters, resource table, approve/reject/feature actions)
- [x] `/admin/orders` — Order Management (search, filters, order table, refund button, invoice modal)
- [x] `/admin/categories` — Category CRUD (type filters, category table, add/edit/delete, add modal)
- [x] `/admin/reviews` — Review Moderation (search, filters, review table, approve/hide/delete, reported highlights)
- [x] `/admin/analytics` — Platform Analytics (revenue/users/downloads charts, sales by country donut, top sellers, top products)
- [x] `/admin/settings` — Platform Settings (6 tabs: general, branding, email, payment, storage, security)

### Legacy Standalone Pages
- [x] `/downloads` — Standalone downloads page
- [x] `/orders` — Standalone orders page
- [x] `/profile` — Standalone profile page

### Reusable Components — Marketplace
- [x] `Navbar` — Sticky, scroll shadow, mobile menu, cart badge
- [x] `Footer` — Link sections, newsletter, copyright
- [x] `Hero` — Hero section with auth form
- [x] `HeroAuthForm` — Sign in/up toggle, forgot password flow
- [x] `ResourceCard` — Product card with gradient cover, rating, price
- [x] `CategoryCard` — Category card with accent
- [x] `Statistics` — Animated stats section
- [x] `Testimonials` — Testimonial grid
- [x] `CTA` — Call-to-action banner
- [x] `Breadcrumbs` — Breadcrumb navigation
- [x] `CartItem` — Cart line item with quantity
- [x] `OrderSummary` — Order summary sidebar
- [x] `TrustSection` — Trust badges
- [x] `EmptyCart` — Empty cart state
- [x] `FilterSidebar` — Desktop filter sidebar
- [x] `MobileFilterDrawer` — Mobile filter drawer
- [x] `Pagination` — Page navigation
- [x] `BrowseEmpty` — Empty/no-results state
- [x] `ProductGallery` — Image gallery with thumbnails
- [x] `WhatsIncluded` — Checklist
- [x] `SyllabusCoverage` — Topic badges
- [x] `ResourceInfo` — Metadata card
- [x] `SamplePages` — Sample page previews
- [x] `ReviewsSection` — Reviews with rating bars
- [x] `ProductFAQ` — FAQ accordion
- [x] `ExamCodeBadge` — Exam code badge
- [x] `RatingStars` — Star rating display
- [x] `PaymentMethodSelector` — UPI, Credit Card, Debit Card, International Cards (Razorpay-ready swap point)
- [x] `OrderConfirmationModal` — Success modal
- [x] `AuthBranding` — Left panel for auth pages
- [x] `AuthCard` — Right panel wrapper
- [x] `AuthFormInput` — Input with validation states (error/success/focus)
- [x] `PasswordInput` — Password with show/hide toggle
- [x] `SocialLoginDivider` — "or" divider + Google button

### Reusable Components — Dashboard
- [x] `DashboardLayout` — Collapsible sidebar + mobile drawer + header slot
- [x] `DashboardStatCard` — Stat card with animated counter
- [x] `ContinueLearningCard` — Horizontal card with progress bar
- [x] `AchievementBadge` — Achievement badge
- [x] `ActivityTimeline` — Vertical timeline
- [x] `DashboardSearch` — Search input
- [x] `DashboardFilterPills` — Filter pill buttons
- [x] `DashboardEmpty` — Empty state
- [x] `DashboardSectionHeader` — Title + count + actions

### Reusable Components — UI
- [x] `FadeIn` — IntersectionObserver fade-in wrapper
- [x] `AnimatedCounter` — Viewport-triggered number animation
- [x] `Skeleton` — Loading skeleton (SkeletonCard, SkeletonTable, SkeletonDashboard)
- [x] `Toast` — Notification system (ToastProvider, useToast hook, success/error/default)
- [x] `Modal` — Generic modal (overlay, Escape close, focus management, accessible)
- [x] `Tabs` — Tab navigation (Tabs, TabsList, TabsTrigger, TabsContent)
- [x] `Dropdown` — Dropdown menu (Dropdown, DropdownItem, DropdownSeparator, click-outside)
- [x] `Avatar` — Reusable avatar (sm/md/lg sizes, initials-based)
- [x] `Badge` — Generic badge (default/success/warning/error/info variants)
- [x] `BarChart` — Simple SVG bar chart (pure SVG, no dependencies)
- [x] `LineChart` — SVG line chart with area fill
- [x] `DonutChart` — SVG donut/pie chart
- [x] `InvoiceModal` — Reusable invoice preview modal (shared across seller/admin)

### Design System
- [x] Typography: Fraunces (display), Inter (body), JetBrains Mono (code)
- [x] Color tokens: ink, parchment, slate, teal, teal-dark, brass, sage, warm-gray
- [x] CSS classes: btn-primary, btn-outline, card-hover, nav-link, input-field
- [x] Animations: FadeIn, AnimatedCounter, card-hover, btn lift, nav underline
- [x] Touch targets: All interactive elements ≥ 44px on mobile
- [x] prefers-reduced-motion support

### Infrastructure
- [x] Shared dashboard sidebar config (`/lib/dashboard-sidebar.tsx`)
- [x] Shared seller sidebar config (`/lib/seller-sidebar.tsx`)
- [x] Shared admin sidebar config (`/lib/admin-sidebar.tsx`)
- [x] Core dummy data with types (`/lib/dummy-data.ts`)
- [x] Portal dummy data — seller + admin (`/lib/portal-data.ts`)
- [x] `cn()` utility (`/lib/utils.ts`)
- [x] Root layout with fonts and metadata
- [x] `Providers` component (ToastProvider wrapper)

---

## Remaining

### Pages
- [x] `/wishlist` — Standalone wishlist page (outside dashboard layout)
- [x] `/settings` — Settings page (language, region, display, email prefs, sessions)
- [x] `/forgot-password` — Forgot password page (split layout, email sent state)
- [x] `/reset-password` — Reset password page (split layout, new password + confirm)
- [x] `/verify-email` — Email verification page (split layout, steps, resend)

### Components
- [x] `Skeleton` — Loading skeleton (SkeletonCard, SkeletonTable, SkeletonDashboard)
- [x] `Toast` / `Snackbar` — Notification toast (ToastProvider + useToast hook, success/error/default variants)
- [x] `Modal` — Generic modal (overlay, close on Escape, focus trap, accessible)
- [x] `Tabs` — Tab component (Tabs, TabsList, TabsTrigger, TabsContent)
- [x] `Dropdown` — Dropdown menu component (Dropdown, DropdownItem, DropdownSeparator)
- [x] `Avatar` — Reusable avatar component (sm/md/lg sizes, initials-based)
- [x] `Badge` — Generic badge component (default/success/warning/error/info variants)
- [ ] `DataTable` — Generic sortable/filterable table (currently duplicated per page)

### Features
- [ ] Dark mode (appearance toggle exists, doesn't apply theme)
- [ ] Newsletter subscription (footer form is non-functional)
- [ ] Image uploads (avatar change button is placeholder)
- [ ] Client-side search filtering wired to URL params
- [ ] Sort controls on browse page (by price, rating, newest)
- [ ] Recently viewed products
- [ ] Share button functionality on product page
- [ ] Wishlist toggle on product cards
- [ ] Quantity persistence in cart (currently resets on reload)
- [ ] Product comparison feature
- [ ] Resource preview modal (currently links to product page)
- [x] Keyboard navigation for modals and drawers (Escape to close, focus management)
- [x] Skip-to-content link for accessibility (sr-only link in root layout)
- [x] Proper `<title>` and meta descriptions on all pages (server + client layout metadata)
- [x] Open Graph / social sharing meta tags (OG title, description, type on all pages)

### Polish
- [ ] Skeleton loading states for all data-dependent sections
- [ ] Page transition animations (currently hard cut)
- [ ] Scroll restoration on navigation
- [ ] Print stylesheet for invoice/order pages
- [ ] Empty state illustrations (currently using icons)
- [ ] Micro-interaction on add-to-cart (button animation)
- [ ] Cart badge animation when item added
- [ ] Search autocomplete / suggestions
- [ ] Infinite scroll option for browse page
- [ ] Sticky filter bar on browse (currently scrolls away)

---

## Nice to Have

### UX Enhancements
- [ ] Keyboard shortcuts (e.g., `/` to focus search)
- [ ] Breadcrumb structured data (JSON-LD)
- [ ] Product structured data (JSON-LD)
- [ ] Before/after exam score comparison widget
- [ ] Study timer / Pomodoro widget on dashboard
- [ ] Notes/annotations on purchased resources
- [ ] Resource rating/review submission form
- [ ] Social sharing with pre-filled text
- [ ] Referral program UI
- [ ] Gift a resource flow

### Dashboard Enhancements
- [ ] Dashboard analytics charts (spending over time, subjects studied)
- [ ] Study streak calendar heatmap
- [ ] Leaderboard page
- [ ] Certificates / completion badges
- [ ] Resource usage stats (time spent, pages viewed)
- [ ] Bulk actions on downloads (select all, bulk download, bulk delete)
- [ ] Export order history as CSV/PDF
- [ ] Notification center (in-app notifications)
- [ ] Dashboard widget customization (drag to reorder)

### Seller / Admin
- [x] Seller dashboard: listing editor, analytics, payout history
- [x] Admin dashboard: user management, content moderation, platform analytics
- [ ] Seller onboarding flow
- [x] Resource upload wizard
- [x] Revenue reports with charts

### Component Library
- [ ] Storybook setup for all reusable components
- [ ] Component documentation
- [ ] Visual regression testing
- [ ] Design token documentation page

---

## Backend (Do NOT implement yet)

### Authentication
- [ ] Supabase Auth integration
- [ ] Email/password sign up
- [ ] Email/password sign in
- [ ] Google OAuth
- [ ] Forgot password flow (email link)
- [ ] Reset password flow
- [ ] Email verification
- [ ] Session management
- [ ] Protected routes middleware
- [ ] User roles (student, seller, admin)

### Database (Supabase)
- [ ] Users table
- [ ] Products table
- [ ] Orders table
- [ ] Reviews table
- [ ] Wishlist table
- [ ] Downloads table
- [ ] Categories table
- [ ] Row Level Security policies

### Payments (Razorpay)
- [ ] Razorpay Checkout integration (swap `PaymentMethodSelector`)
- [ ] Order creation API
- [ ] Payment verification webhook
- [ ] Refund flow
- [ ] Invoice generation
- [ ] Subscription plans (future)

### File Storage
- [ ] Resource file uploads (Supabase Storage)
- [ ] File download with signed URLs
- [ ] Download count tracking
- [ ] Download limit enforcement (10 per file)
- [ ] Avatar uploads

### Email
- [ ] Order confirmation email (Resend / SendGrid)
- [ ] Download link email
- [ ] Password reset email
- [ ] Email verification email
- [ ] Marketing email opt-in
- [ ] Weekly digest email

### APIs
- [ ] `POST /api/checkout` — Create order
- [ ] `POST /api/webhook/razorpay` — Payment webhook
- [ ] `GET /api/downloads/[id]` — Signed download URL
- [ ] `POST /api/reviews` — Submit review
- [ ] `GET /api/products` — Product listing with filters
- [ ] `GET /api/products/[slug]` — Single product
- [ ] `PUT /api/profile` — Update profile
- [ ] `POST /api/newsletter` — Subscribe to newsletter

### Analytics
- [ ] Page view tracking
- [ ] Product view tracking
- [ ] Download tracking
- [ ] Conversion funnel
- [ ] Revenue dashboard

---

## Route Status Summary

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Complete | |
| `/browse` | ✅ Complete | Sort/filter wired client-side only |
| `/product/[slug]` | ✅ Complete | 15 SSG pages |
| `/cart` | ✅ Complete | Client-side state, resets on reload |
| `/checkout` | ✅ Complete | PaymentMethodSelector is Razorpay-ready |
| `/login` | ✅ Complete | Dummy submit |
| `/register` | ✅ Complete | Dummy submit |
| `/dashboard` | ✅ Complete | |
| `/dashboard/downloads` | ✅ Complete | |
| `/dashboard/orders` | ✅ Complete | |
| `/dashboard/wishlist` | ✅ Complete | |
| `/dashboard/profile` | ✅ Complete | |
| `/about` | ✅ Complete | |
| `/contact` | ✅ Complete | Form is non-functional |
| `/faq` | ✅ Complete | |
| `/privacy` | ✅ Complete | |
| `/terms` | ✅ Complete | |
| `/seller` | ✅ Complete | Full seller overview dashboard |
| `/seller/products` | ✅ Complete | Product management table |
| `/seller/upload` | ✅ Complete | 5-step upload wizard |
| `/seller/orders` | ✅ Complete | Order management + invoice modal |
| `/seller/analytics` | ✅ Complete | Charts, stats, sales by subject |
| `/seller/settings` | ✅ Complete | Store info, payouts, notifications |
| `/admin` | ✅ Complete | Full admin overview dashboard |
| `/admin/users` | ✅ Complete | User management with roles |
| `/admin/resources` | ✅ Complete | Resource moderation queue |
| `/admin/orders` | ✅ Complete | Order management + refunds |
| `/admin/categories` | ✅ Complete | Category CRUD by type |
| `/admin/reviews` | ✅ Complete | Review moderation |
| `/admin/analytics` | ✅ Complete | Platform analytics + charts |
| `/admin/settings` | ✅ Complete | 6-tab platform settings |
| `/downloads` | ✅ Legacy | Duplicate of `/dashboard/downloads` |
| `/orders` | ✅ Legacy | Duplicate of `/dashboard/orders` |
| `/profile` | ✅ Legacy | Duplicate of `/dashboard/profile` |
| `/wishlist` | ✅ Complete | Standalone version with Navbar/Footer |
| `/settings` | ✅ Complete | Language, region, display, email, sessions, data & privacy |
| `/forgot-password` | ✅ Complete | Split layout, email sent state |
| `/reset-password` | ✅ Complete | Split layout, password + confirm with validation |
| `/verify-email` | ✅ Complete | Split layout, verification steps, resend |
