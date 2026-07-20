# Marque — Digital Marketplace for Cambridge Study Resources

Premium marketplace for Cambridge IGCSE, O Level & A Level study resources. Frontend only — no auth, APIs, databases, or payments. All dummy data.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.10 |
| UI | React | 19.2.4 |
| Language | TypeScript | ^5 |
| CSS | Tailwind CSS v4 | ^4 |
| Animation | Framer Motion | ^12.42 |
| Icons | Lucide React | ^1.25 |
| Utilities | clsx, tailwind-merge, class-variance-authority | — |

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build (static export)
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                          # Pages (App Router)
│   ├── layout.tsx                # Root layout: fonts, metadata, globals
│   ├── page.tsx                  # Homepage: hero, categories, bestsellers, CTA
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
│   ├── downloads/page.tsx
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   ├── verify-email/page.tsx
│   ├── settings/page.tsx
│   ├── wishlist/page.tsx
│   ├── not-found.tsx
│   ├── product/[slug]/page.tsx   # 15 SSG pages
│   ├── dashboard/                # Student dashboard
│   │   ├── page.tsx
│   │   ├── downloads/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── profile/page.tsx
│   ├── seller/                   # Seller portal
│   │   ├── page.tsx
│   │   ├── products/page.tsx
│   │   ├── upload/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   └── admin/                    # Admin portal
│       ├── page.tsx
│       ├── users/page.tsx
│       ├── resources/page.tsx
│       ├── orders/page.tsx
│       ├── categories/page.tsx
│       ├── reviews/page.tsx
│       ├── analytics/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── marketplace/              # 34 marketplace components
│   ├── dashboard/                # 9 dashboard components
│   ├── providers.tsx             # ToastProvider wrapper
│   └── ui/                       # 15 shared UI primitives
└── lib/
    ├── dummy-data.ts             # Core types + 15 products + orders + FAQs
    ├── portal-data.ts            # Seller + admin dummy data
    ├── dashboard-sidebar.tsx     # Student sidebar config
    ├── seller-sidebar.tsx        # Seller sidebar config
    ├── admin-sidebar.tsx         # Admin sidebar config
    └── utils.ts                  # cn() utility
```

## Design System

### Fonts

| Font | Variable | Usage |
|------|----------|-------|
| Fraunces | `--font-display` | Headings, display text, nav logo |
| Inter | `--font-body` | Body text, UI elements |
| JetBrains Mono | `--font-mono` | Order IDs, code, monospace |

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#12181B` | Primary text, headings |
| `parchment` | `#F6F3EC` | Page background, input backgrounds |
| `slate` | `#5B6663` | Secondary text, descriptions |
| `teal` | `#8FB3A3` | Links, accents |
| `teal-dark` | `#1F4B43` | Primary buttons, active states, CTAs |
| `brass` | `#B08D57` | Badges, highlights, tick marks |
| `sage` | `#8FB3A3` | Success states, secondary accents |
| `warm-gray` | `#EFEAE0` | Hover backgrounds, subtle fills |

### CSS Utility Classes

| Class | Purpose |
|-------|---------|
| `.btn-primary` | Teal-dark button with hover lift + shadow |
| `.btn-outline` | Border button with hover lift |
| `.card-hover` | Card lift effect on hover (-3px + shadow) |
| `.nav-link` | Nav link with animated underline |
| `.input-field` | Form input with teal focus ring |

## Routes (56 total)

### Core Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with hero auth form, categories, bestsellers, CTA |
| `/browse` | Browse resources: search, filters, grid, pagination |
| `/product/[slug]` | Product details: gallery, info, reviews, FAQ, related (15 SSG pages) |
| `/cart` | Shopping cart with quantity controls and order summary |
| `/checkout` | Checkout with payment method selector and confirmation modal |
| `/about` | About page with mission, stats, testimonials |
| `/contact` | Contact form with info cards |
| `/faq` | FAQ accordion |
| `/privacy` | Privacy policy (7 sections) |
| `/terms` | Terms of service (8 sections) |

### Auth Pages
| Route | Description |
|-------|-------------|
| `/login` | Login with split layout and validation |
| `/register` | Register with password strength and terms checkbox |
| `/forgot-password` | Forgot password with email sent state |
| `/reset-password` | Reset password with validation |
| `/verify-email` | Email verification with steps and resend |

### Student Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard` | Dashboard home with stats, learning, orders, downloads |
| `/dashboard/downloads` | Downloads with search, filters, bulk actions |
| `/dashboard/orders` | Order history with status filters |
| `/dashboard/wishlist` | Wishlist with product grid |
| `/dashboard/profile` | Profile with avatar, form, notifications |
| `/settings` | Settings: language, region, display, email, sessions |

### Seller Portal
| Route | Description |
|-------|-------------|
| `/seller` | Overview: revenue stats, sales chart, recent sales, reviews |
| `/seller/products` | Product management: search, filters, table, bulk actions |
| `/seller/upload` | 5-step upload wizard (info, PDF, pricing, preview, publish) |
| `/seller/orders` | Orders: table, invoice modal, payment status |
| `/seller/analytics` | Charts, top products, sales by subject donut chart |
| `/seller/settings` | Store info, payout, notifications, danger zone |

### Admin Portal
| Route | Description |
|-------|-------------|
| `/admin` | Overview: platform stats, recent orders/users, quick actions |
| `/admin/users` | User management: search, filters, role badges, suspend/delete |
| `/admin/resources` | Resource moderation: approve, reject, feature, edit |
| `/admin/orders` | Order management: refund flow, invoice modal |
| `/admin/categories` | Category CRUD: type filters, add/edit/delete |
| `/admin/reviews` | Review moderation: approve, hide, delete, reported highlights |
| `/admin/analytics` | Platform analytics: charts, donut, top sellers/products |
| `/admin/settings` | 6-tab platform settings (general, branding, email, payment, storage, security) |

### Legacy Pages
| Route | Description |
|-------|-------------|
| `/downloads` | Legacy standalone downloads |
| `/orders` | Legacy standalone orders |
| `/profile` | Legacy standalone profile |

## Shared Components

### Marketplace (34)
Navbar, Footer, Hero, HeroAuthForm, ResourceCard, CategoryCard, Statistics, Testimonials, CTA, Breadcrumbs, CartItem, OrderSummary, TrustSection, EmptyCart, FilterSidebar, MobileFilterDrawer, Pagination, BrowseEmpty, ProductGallery, WhatsIncluded, SyllabusCoverage, ResourceInfo, SamplePages, ReviewsSection, ProductFAQ, ExamCodeBadge, RatingStars, PaymentMethodSelector, OrderConfirmationModal, AuthBranding, AuthCard, AuthFormInput, PasswordInput, SocialLoginDivider

### Dashboard (9)
DashboardLayout, DashboardStatCard, ContinueLearningCard, AchievementBadge, ActivityTimeline, DashboardSearch, DashboardFilterPills, DashboardEmpty, DashboardSectionHeader

### UI Primitives (15)
FadeIn, AnimatedCounter, Skeleton, Toast, Modal, Tabs, Dropdown, Avatar, Badge, BarChart, LineChart, DonutChart, InvoiceModal

## Architecture

- **Tailwind v4** — Uses `@import "tailwindcss"` and `@theme inline` blocks (not v3 config)
- **Static Generation** — All pages statically rendered at build time. Product pages use `generateStaticParams`
- **Shared Layout** — DashboardLayout used across student, seller, and admin portals with dedicated sidebar configs
- **Three Sidebar Configs** — `dashboard-sidebar.tsx` (student), `seller-sidebar.tsx`, `admin-sidebar.tsx`
- **Chart Components** — Pure SVG (BarChart, LineChart, DonutChart), no external charting library
- **Portal Data** — `portal-data.ts` co-locates seller and admin dummy data
- **No Auth** — All forms are dummy submit handlers. No real authentication
- **No Payment** — PaymentMethodSelector is a Razorpay-ready placeholder
- **Touch Targets** — All interactive elements ≥ 44px on mobile
- **Reduced Motion** — All animations respect `prefers-reduced-motion`

## What's Not Implemented

- Real authentication (all forms are UI-only)
- Real payment processing (Razorpay placeholder)
- Backend API routes
- Database integration
- Image uploads
- Dark mode toggle
- Newsletter subscription (footer form)
- DataTable generic component
- Page transition animations

## License

Private — For educational use only.
