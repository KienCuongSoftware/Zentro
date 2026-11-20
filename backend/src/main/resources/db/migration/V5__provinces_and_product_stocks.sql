CREATE TABLE provinces (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    slug        VARCHAR(140) NOT NULL,
    sort_order  INT NOT NULL DEFAULT 0,
    CONSTRAINT uq_provinces_slug UNIQUE (slug),
    CONSTRAINT uq_provinces_name UNIQUE (name)
);

CREATE TABLE product_stocks (
    id           BIGSERIAL PRIMARY KEY,
    product_id   BIGINT NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    province_id  BIGINT NOT NULL REFERENCES provinces (id) ON DELETE CASCADE,
    quantity     INT NOT NULL DEFAULT 0,
    CONSTRAINT uq_product_stocks_product_province UNIQUE (product_id, province_id),
    CONSTRAINT ck_product_stocks_quantity CHECK (quantity >= 0)
);

CREATE INDEX idx_product_stocks_product_id ON product_stocks (product_id);
CREATE INDEX idx_product_stocks_province_id ON product_stocks (province_id);

-- Ưu tiên 2 thành phố lớn, sau đó theo alphabet (63 tỉnh/thành)
INSERT INTO provinces (name, slug, sort_order) VALUES
('Hồ Chí Minh', 'ho-chi-minh', 1),
('Hà Nội', 'ha-noi', 2),
('An Giang', 'an-giang', 10),
('Bà Rịa - Vũng Tàu', 'ba-ria-vung-tau', 11),
('Bạc Liêu', 'bac-lieu', 12),
('Bắc Giang', 'bac-giang', 13),
('Bắc Kạn', 'bac-kan', 14),
('Bắc Ninh', 'bac-ninh', 15),
('Bến Tre', 'ben-tre', 16),
('Bình Dương', 'binh-duong', 17),
('Bình Định', 'binh-dinh', 18),
('Bình Phước', 'binh-phuoc', 19),
('Bình Thuận', 'binh-thuan', 20),
('Cà Mau', 'ca-mau', 21),
('Cao Bằng', 'cao-bang', 22),
('Cần Thơ', 'can-tho', 23),
('Đà Nẵng', 'da-nang', 24),
('Đắk Lắk', 'dak-lak', 25),
('Đắk Nông', 'dak-nong', 26),
('Điện Biên', 'dien-bien', 27),
('Đồng Nai', 'dong-nai', 28),
('Đồng Tháp', 'dong-thap', 29),
('Gia Lai', 'gia-lai', 30),
('Hà Giang', 'ha-giang', 31),
('Hà Nam', 'ha-nam', 32),
('Hà Tĩnh', 'ha-tinh', 33),
('Hải Dương', 'hai-duong', 34),
('Hải Phòng', 'hai-phong', 35),
('Hậu Giang', 'hau-giang', 36),
('Hòa Bình', 'hoa-binh', 37),
('Hưng Yên', 'hung-yen', 38),
('Khánh Hòa', 'khanh-hoa', 39),
('Kiên Giang', 'kien-giang', 40),
('Kon Tum', 'kon-tum', 41),
('Lai Châu', 'lai-chau', 42),
('Lâm Đồng', 'lam-dong', 43),
('Lạng Sơn', 'lang-son', 44),
('Lào Cai', 'lao-cai', 45),
('Long An', 'long-an', 46),
('Nam Định', 'nam-dinh', 47),
('Nghệ An', 'nghe-an', 48),
('Ninh Bình', 'ninh-binh', 49),
('Ninh Thuận', 'ninh-thuan', 50),
('Phú Thọ', 'phu-tho', 51),
('Phú Yên', 'phu-yen', 52),
('Quảng Bình', 'quang-binh', 53),
('Quảng Nam', 'quang-nam', 54),
('Quảng Ngãi', 'quang-ngai', 55),
('Quảng Ninh', 'quang-ninh', 56),
('Quảng Trị', 'quang-tri', 57),
('Sóc Trăng', 'soc-trang', 58),
('Sơn La', 'son-la', 59),
('Tây Ninh', 'tay-ninh', 60),
('Thái Bình', 'thai-binh', 61),
('Thái Nguyên', 'thai-nguyen', 62),
('Thanh Hóa', 'thanh-hoa', 63),
('Thừa Thiên Huế', 'thua-thien-hue', 64),
('Tiền Giang', 'tien-giang', 65),
('Trà Vinh', 'tra-vinh', 66),
('Tuyên Quang', 'tuyen-quang', 67),
('Vĩnh Long', 'vinh-long', 68),
('Vĩnh Phúc', 'vinh-phuc', 69),
('Yên Bái', 'yen-bai', 70);

-- Chuyển tồn kho cũ về Hồ Chí Minh (nếu có sản phẩm)
INSERT INTO product_stocks (product_id, province_id, quantity)
SELECT p.id, prv.id, p.stock
FROM products p
CROSS JOIN provinces prv
WHERE prv.slug = 'ho-chi-minh'
  AND NOT EXISTS (
      SELECT 1 FROM product_stocks ps
      WHERE ps.product_id = p.id AND ps.province_id = prv.id
  );

INSERT INTO product_stocks (product_id, province_id, quantity)
SELECT p.id, prv.id, 0
FROM products p
CROSS JOIN provinces prv
WHERE prv.slug <> 'ho-chi-minh'
  AND NOT EXISTS (
      SELECT 1 FROM product_stocks ps
      WHERE ps.product_id = p.id AND ps.province_id = prv.id
  );
