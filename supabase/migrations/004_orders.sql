create table orders (
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

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text not null,
  title text not null,
  price numeric(10,2) not null,
  quantity integer not null default 1
);

alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Users can view their own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "Users can view their own order items"
  on order_items for select
  using (
    order_id in (
      select id from orders where user_id = auth.uid()
    )
  );

create policy "Service role can insert orders"
  on orders for insert
  with check (true);

create policy "Service role can insert order items"
  on order_items for insert
  with check (true);

create policy "Service role can update orders"
  on orders for update
  using (true);

create index idx_orders_razorpay_order_id on orders(razorpay_order_id);
create index idx_orders_user_id on orders(user_id);
create index idx_order_items_order_id on order_items(order_id);
