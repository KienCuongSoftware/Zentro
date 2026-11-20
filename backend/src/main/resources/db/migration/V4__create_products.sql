CREATE TABLE products (
    id                BIGSERIAL PRIMARY KEY,
    category_id       BIGINT REFERENCES categories (id) ON DELETE SET NULL,
    name              VARCHAR(255) NOT NULL,
    slug              VARCHAR(280) NOT NULL,
    description       TEXT,
    brand             VARCHAR(120),
    price             NUMERIC(14, 2) NOT NULL,
    compare_at_price  NUMERIC(14, 2),
    stock             INT NOT NULL DEFAULT 0,
    image_url         VARCHAR(500),
    active            BOOLEAN NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_products_slug UNIQUE (slug),
    CONSTRAINT ck_products_price CHECK (price >= 0),
    CONSTRAINT ck_products_stock CHECK (stock >= 0)
);

CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_active ON products (active);
CREATE INDEX idx_products_name ON products (name);
