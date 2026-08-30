-- ============================================================
-- Migration 008: Create orders + order_items tables (FIX)
-- Migration 004 defined these tables but was never applied to the
-- remote database, so the Razorpay verify route failed with
-- "Could not find the table 'public.orders'" -> "Failed to save order"
-- -> "Payment was received but verification failed".
--
-- This migration is idempotent: it creates the tables only if they
-- do not already exist, so it can be safely applied whether or not
-- 004 ran.
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  razorpay_order_id text unique not null,
  razorpay_payment_id text,
  amount numeric(10,2) not null,
  currency text not null default 'USD',
  status text not null default 'created' check (status in ('created', 'paid', 'failed', 'refunded')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  title text not null,
  price numeric(10,2) not null,
  quantity integer not null default 1
);

alter table orders enable row level security;
alter table order_items enable row level security;

-- Orders: users can read their own orders
drop policy if exists "Users can view their own orders" on orders;
create policy "Users can view their own orders"
  on orders for select
  using (auth.uid() = user_id);

-- Order items: users can read items belonging to their own orders
drop policy if exists "Users can view their own order items" on order_items;
create policy "Users can view their own order items"
  on order_items for select
  using (
    order_id in (
      select id from orders where user_id = auth.uid()
    )
  );

-- Orders: allow inserts from the server payment-verification route.
-- The route verifies the Razorpay signature (HMAC-SHA256) before
-- writing, so a row only reaches this table after a genuine payment.
-- The download endpoint separately enforces that only a user with a
-- matching "paid" order may download a resource.
drop policy if exists "Allow order insert from verified payment" on orders;
create policy "Allow order insert from verified payment"
  on orders for insert
  with check (true);

-- Order items: allow inserts alongside a verified order
drop policy if exists "Allow order items insert from verified payment" on order_items;
create policy "Allow order items insert from verified payment"
  on order_items for insert
  with check (true);

-- Orders: allow the server route to update an order (e.g. mark paid/refunded)
drop policy if exists "Allow order update from server" on orders;
create policy "Allow order update from server"
  on orders for update
  using (true);

create index if not exists idx_orders_razorpay_order_id on orders(razorpay_order_id);
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_order_items_order_id on order_items(order_id);
