-- Cập nhật theo sắp xếp ĐVHC cấp tỉnh năm 2025: 34 đơn vị
-- (9 thành phố trực thuộc Trung ương + 25 tỉnh)

DELETE FROM product_stocks;
DELETE FROM provinces;

INSERT INTO provinces (name, slug, sort_order) VALUES
-- Thành phố trực thuộc Trung ương (ưu tiên hiển thị)
('Hồ Chí Minh', 'ho-chi-minh', 1),
('Hà Nội', 'ha-noi', 2),
('Hải Phòng', 'hai-phong', 3),
('Đà Nẵng', 'da-nang', 4),
('Cần Thơ', 'can-tho', 5),
('Huế', 'hue', 6),
('Đồng Nai', 'dong-nai', 7),
('Quảng Ninh', 'quang-ninh', 8),
('Bắc Ninh', 'bac-ninh', 9),
-- Các tỉnh
('An Giang', 'an-giang', 20),
('Cao Bằng', 'cao-bang', 21),
('Cà Mau', 'ca-mau', 22),
('Điện Biên', 'dien-bien', 23),
('Đắk Lắk', 'dak-lak', 24),
('Đồng Tháp', 'dong-thap', 25),
('Gia Lai', 'gia-lai', 26),
('Hà Tĩnh', 'ha-tinh', 27),
('Hưng Yên', 'hung-yen', 28),
('Khánh Hòa', 'khanh-hoa', 29),
('Lai Châu', 'lai-chau', 30),
('Lào Cai', 'lao-cai', 31),
('Lạng Sơn', 'lang-son', 32),
('Lâm Đồng', 'lam-dong', 33),
('Nghệ An', 'nghe-an', 34),
('Ninh Bình', 'ninh-binh', 35),
('Phú Thọ', 'phu-tho', 36),
('Quảng Ngãi', 'quang-ngai', 37),
('Quảng Trị', 'quang-tri', 38),
('Sơn La', 'son-la', 39),
('Thanh Hóa', 'thanh-hoa', 40),
('Thái Nguyên', 'thai-nguyen', 41),
('Tây Ninh', 'tay-ninh', 42),
('Tuyên Quang', 'tuyen-quang', 43),
('Vĩnh Long', 'vinh-long', 44);

-- Gán lại tồn kho: tổng hiện có về Hồ Chí Minh, các tỉnh còn lại = 0
INSERT INTO product_stocks (product_id, province_id, quantity)
SELECT p.id, prv.id, p.stock
FROM products p
CROSS JOIN provinces prv
WHERE prv.slug = 'ho-chi-minh';

INSERT INTO product_stocks (product_id, province_id, quantity)
SELECT p.id, prv.id, 0
FROM products p
CROSS JOIN provinces prv
WHERE prv.slug <> 'ho-chi-minh';
