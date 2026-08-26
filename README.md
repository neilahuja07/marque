# Scholar Stack — Digital Marketplace for Cambridge Study Resources

Premium marketplace for Cambridge IGCSE, O Level & A Level study resources. Two roles: student and admin. Supabase Auth (email/password + Google OAuth).

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
| Auth | Supabase (SSR) | ^0.6 |

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

## Supabase Setup

1. Create a Supabase project
2. Copy `.env.local` variables
3. Run `supabase/migrations/001_profiles.sql` in Supabase SQL editor
4. Enable Google OAuth in Supabase Auth settings
5. Set Site URL to `http://localhost:3000` and redirect URLs to `http://localhost:3000/auth/callback`

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
│   ├── providers.tsx             # AuthProvider + ToastProvider wrapper
│   ├── auth-provider.tsx         # Auth context (user, role, session, signOut)
│   └── ui/                       # 15 shared UI primitives
└── lib/
    ├── dummy-data.ts             # Core types + 15 products + orders + FAQs
    ├── portal-data.ts            # Admin dummy data
    ├── dashboard-sidebar.tsx     # Student sidebar config
    ├── admin-sidebar.tsx         # Admin sidebar config
    ├── utils.ts                  # cn() utility
    └── supabase/
        ├── client.ts             # Browser client (with build-safe fallback)
        ├── server.ts             # Server client (cookies-based)
        └── middleware.ts         # Middleware client (session refresh + route protection)
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

## Routes (50 total)

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

### Auth Routes
| Route | Description |
|-------|-------------|
| `/auth/callback` | Supabase email verification callback |

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
- **Shared Layout** — DashboardLayout used across student and admin portals with dedicated sidebar configs
- **Two Sidebar Configs** — `dashboard-sidebar.tsx` (student), `admin-sidebar.tsx`
- **Chart Components** — Pure SVG (BarChart, LineChart, DonutChart), no external charting library
- **Portal Data** — `portal-data.ts` co-locates admin dummy data
- **Supabase Auth** — Email/password + Google OAuth via `@supabase/ssr`. Client has build-safe fallback for static generation. Middleware handles session refresh, route protection, and role-based redirects.
- **Roles** — Two roles: `student` and `admin`. No seller role.
- **No Payment** — PaymentMethodSelector is a Razorpay-ready placeholder
- **Touch Targets** — All interactive elements ≥ 44px on mobile
- **Reduced Motion** — All animations respect `prefers-reduced-motion`

## What's Not Implemented

- Real payment processing (Razorpay placeholder)
- Backend API routes
- File storage / uploads
- DataTable generic component
- Page transition animations

## License

Private — For educational use only.
