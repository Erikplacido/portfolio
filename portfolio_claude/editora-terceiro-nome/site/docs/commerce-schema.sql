-- Modelo inicial para a futura integração. Não é um serviço de checkout.
PRAGMA foreign_keys = ON;
CREATE TABLE products (
 id TEXT PRIMARY KEY, title TEXT NOT NULL, catalog_id TEXT NOT NULL UNIQUE,
 active INTEGER NOT NULL DEFAULT 0 CHECK(active IN (0,1))
);
CREATE TABLE variants (
 id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id),
 sku TEXT NOT NULL UNIQUE, isbn TEXT, format TEXT NOT NULL,
 price_cents INTEGER NOT NULL CHECK(price_cents>=0), currency TEXT NOT NULL DEFAULT 'BRL' CHECK(currency='BRL'),
 weight_grams INTEGER CHECK(weight_grams>0), stock INTEGER NOT NULL DEFAULT 0 CHECK(stock>=0),
 reserved INTEGER NOT NULL DEFAULT 0 CHECK(reserved>=0 AND reserved<=stock),
 version INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE orders (
 id TEXT PRIMARY KEY, idempotency_key TEXT NOT NULL UNIQUE,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','cancelled','refunded','fulfilled')),
 customer_email TEXT NOT NULL, shipping_address_json TEXT NOT NULL,
 subtotal_cents INTEGER NOT NULL CHECK(subtotal_cents>=0),
 shipping_cents INTEGER NOT NULL CHECK(shipping_cents>=0),
 discount_cents INTEGER NOT NULL DEFAULT 0 CHECK(discount_cents>=0),
 total_cents INTEGER NOT NULL CHECK(total_cents>=0 AND total_cents=subtotal_cents+shipping_cents-discount_cents),
 currency TEXT NOT NULL DEFAULT 'BRL' CHECK(currency='BRL'), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE order_items (
 order_id TEXT NOT NULL REFERENCES orders(id), variant_id TEXT NOT NULL REFERENCES variants(id),
 title_snapshot TEXT NOT NULL, sku_snapshot TEXT NOT NULL,
 quantity INTEGER NOT NULL CHECK(quantity>0), unit_price_cents INTEGER NOT NULL CHECK(unit_price_cents>=0),
 PRIMARY KEY(order_id,variant_id)
);
CREATE TABLE payments (
 id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id), provider TEXT NOT NULL,
 provider_payment_id TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('pending','approved','failed','refunded')),
 amount_cents INTEGER NOT NULL CHECK(amount_cents>=0), UNIQUE(provider,provider_payment_id)
);
CREATE TABLE webhook_events (
 provider TEXT NOT NULL, event_id TEXT NOT NULL, processed_at TEXT,
 PRIMARY KEY(provider,event_id)
);
CREATE TABLE inventory_reservations (
 id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id), variant_id TEXT NOT NULL REFERENCES variants(id),
 quantity INTEGER NOT NULL CHECK(quantity>0), expires_at TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('reserved','consumed','released')), UNIQUE(order_id,variant_id)
);
