CREATE TABLE categories (
    id          BIGSERIAL PRIMARY KEY,
    parent_id   BIGINT REFERENCES categories (id) ON DELETE CASCADE,
    name        VARCHAR(200) NOT NULL,
    slug        VARCHAR(220) NOT NULL,
    icon_key    VARCHAR(50),
    badge       VARCHAR(20),
    node_type   VARCHAR(20) NOT NULL,
    sort_order  INT NOT NULL DEFAULT 0,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_categories_slug UNIQUE (slug),
    CONSTRAINT ck_categories_node_type CHECK (node_type IN ('ROOT', 'GROUP', 'ITEM'))
);

CREATE INDEX idx_categories_parent_id ON categories (parent_id);
CREATE INDEX idx_categories_node_type ON categories (node_type);
CREATE INDEX idx_categories_sort ON categories (parent_id, sort_order);
