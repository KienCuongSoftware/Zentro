package com.ecommerce.zentro.catalog;

import java.text.Normalizer;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class CategoryMenuSeeder implements ApplicationRunner {

	private final CategoryRepository categoryRepository;
	private final Set<String> usedSlugs = new HashSet<>();

	@Override
	@Transactional
	public void run(ApplicationArguments args) {
		if (categoryRepository.existsByNodeType(CategoryNodeType.ROOT)) {
			return;
		}

		usedSlugs.clear();
		seedPhones();
		seedLaptops();
		seedAudio();
		seedWatchCamera();
		seedHomeBeauty();
		seedAccessories();
		seedPc();
		seedTv();
		seedTradeIn();
		seedUsed();
		seedPromos();
		seedNews();

		log.info("Seeded category mega menu");
	}

	private void seedPhones() {
		Category root = root("Điện thoại, Tablet", "phone", 1);
		group(root, "Hãng điện thoại", 1, List.of(
				item("iPhone"), item("Samsung"), item("OPPO"), item("Xiaomi"), item("TECNO"),
				item("HONOR"), item("Nubia"), item("Sony"), item("Nokia"), item("Nothing Phone"),
				item("Masstel"), item("Huawei"), item("Meizu"), item("realme")
		));
		group(root, "Mức giá điện thoại", 2, List.of(
				item("Dưới 2 triệu"), item("Từ 2 - 4 triệu"), item("Từ 4 - 7 triệu"),
				item("Từ 7 - 13 triệu"), item("Từ 13 - 20 triệu"), item("Trên 20 triệu")
		));
		group(root, "Điện thoại HOT", 3, List.of(
				item("iPhone 16 Pro Max", "HOT"), item("iPhone 16 Pro"), item("iPhone 16 series"),
				item("iPhone Duo", "HOT"), item("iPhone 17 Pro Max"), item("iPhone Air"),
				item("Samsung Galaxy S26 Series"), item("Samsung Galaxy Z6 Series", "HOT"),
				item("OPPO Find X10 Pro Max", "MỚI"), item("OPPO Find X10", "MỚI"),
				item("Redmi Note 17 Series"), item("Xiaomi 17T")
		));
		group(root, "Hãng máy tính bảng", 4, List.of(
				item("iPad"), item("Samsung Tablet"), item("Xiaomi Tablet"), item("Huawei Tablet"),
				item("Lenovo Tablet"), item("Teclast"), item("Nubia Tablet"), item("HONOR Tablet"),
				item("OPPO Tablet"), item("Máy đọc sách Kindle"), item("Boox"), item("Xem thêm tất cả Tablet")
		));
		group(root, "Máy tính bảng HOT", 5, List.of(
				item("iPad Pro M5"), item("iPad Air M4"), item("iPad A16"), item("iPad mini 2026", "MỚI"),
				item("Galaxy Tab S12 Series", "HOT"), item("Lenovo Idea Tab Pro Gen 2"),
				item("HUAWEI MatePad Air"), item("Xiaomi Poco Pad M1")
		));
	}

	private void seedLaptops() {
		Category root = root("Laptop", "laptop", 2);
		group(root, "Thương hiệu", 1, List.of(
				item("Mac"), item("ASUS"), item("Lenovo"), item("Dell"), item("HP"), item("Acer"),
				item("LG"), item("MSI"), item("Gigabyte"), item("Microsoft Surface"),
				item("Thunderobot"), item("Colorful")
		));
		group(root, "Phân khúc giá", 2, List.of(
				item("Dưới 10 triệu"), item("Từ 10 - 15 triệu"), item("Từ 15 - 20 triệu"),
				item("Từ 20 - 25 triệu"), item("Từ 25 - 30 triệu")
		));
		group(root, "Nhu cầu sử dụng", 3, List.of(
				item("Văn phòng"), item("Gaming"), item("Mỏng nhẹ"), item("Đồ họa - Kỹ thuật"),
				item("Sinh viên"), item("Cảm ứng"), item("Laptop AI", "HOT"), item("Mac CTO")
		));
		group(root, "Dòng chip", 4, List.of(
				item("Laptop Core i3"), item("Laptop Core i5"), item("Laptop Core i7"), item("Laptop Core i9"),
				item("Laptop Core Ultra 5"), item("Laptop Core Ultra 7"), item("Laptop Core Ultra 9"),
				item("Apple M4 Series", "MỚI"), item("Apple M5 Series", "MỚI"), item("Apple M6 Series", "MỚI"),
				item("A18 Pro"), item("AMD Ryzen"), item("Intel Core Ultra", "HOT")
		));
		group(root, "Kích thước màn hình", 5, List.of(
				item("Laptop 13 inch"), item("Laptop 14 inch"), item("Laptop 15.6 inch"), item("Laptop 16 inch")
		));
	}

	private void seedAudio() {
		Category root = root("Âm thanh, Mic thu âm", "audio", 3);
		group(root, "Chọn loại tai nghe", 1, List.of(
				item("Bluetooth"), item("Chụp tai"), item("Nhét tai"), item("Có dây"),
				item("Chống ồn"), item("Thể thao"), item("Gaming Headset")
		));
		group(root, "Mic", 2, List.of(
				item("Mic phòng thu"), item("Mic cài áo"), item("Mic livestream"), item("Mic USB")
		));
		group(root, "Hãng tai nghe", 3, List.of(
				item("Apple"), item("Sony"), item("JBL"), item("Samsung Audio"), item("Xiaomi Audio"),
				item("Beats"), item("Sennheiser"), item("Marshall"), item("Bose")
		));
		group(root, "Chọn theo giá", 4, List.of(
				item("Dưới 200 nghìn"), item("Từ 200 - 500 nghìn"), item("Từ 500 nghìn - 1 triệu"),
				item("Từ 1 - 2 triệu"), item("Trên 2 triệu")
		));
		group(root, "Chọn loại loa", 5, List.of(
				item("Loa Bluetooth"), item("Loa kéo"), item("Loa soundbar"), item("Loa vi tính")
		));
		group(root, "Hãng loa", 6, List.of(
				item("JBL Loa"), item("Sony Loa"), item("Harman Kardon"), item("LG XBOOM"), item("Samsung Loa")
		));
		group(root, "Sản phẩm nổi bật", 7, List.of(
				item("AirPods Pro 3", "HOT"), item("Sony WH-1000XM6", "MỚI"), item("JBL Charge 6", "HOT")
		));
	}

	private void seedWatchCamera() {
		Category root = root("Đồng hồ, Camera", "watch", 4);
		group(root, "Loại đồng hồ", 1, List.of(
				item("Smartwatch"), item("Smart band"), item("Đồng hồ định vị trẻ em"), item("Dây đồng hồ thông minh")
		));
		group(root, "Chọn theo thương hiệu", 2, List.of(
				item("Apple Watch"), item("Samsung Watch"), item("Xiaomi Watch"), item("Huawei Watch", "HOT"),
				item("Coros"), item("Garmin"), item("Kieslect"), item("Amazfit"), item("Black Shark"),
				item("Mibro"), item("Masstel Watch"), item("imoo"), item("Kospet"), item("MyKID")
		));
		group(root, "Sản phẩm nổi bật", 3, List.of(
				item("Huawei Watch GT7", "HOT"), item("Garmin Fenix 8", "MỚI"), item("COROS PACE 3 PRO", "MỚI"),
				item("Xiaomi Mi Band 9", "MỚI"), item("Apple Watch Series 10", "HOT"), item("Apple Watch Ultra 2"),
				item("Samsung Galaxy Watch7", "MỚI")
		));
		group(root, "Camera", 4, List.of(
				item("Camera giám sát"), item("Camera hành trình"), item("Camera hành động"),
				item("AI Camera", "MỚI"), item("Gimbal"), item("Tripod"), item("Máy ảnh"),
				item("Flycam"), item("Phụ kiện camera"), item("Xem tất cả camera")
		));
		group(root, "Camera nổi bật", 5, List.of(
				item("Imou"), item("Ezviz"), item("Xiaomi Camera"), item("TP-Link"), item("Tiandy", "HOT"),
				item("DJI"), item("Insta360"), item("Fujifilm"), item("Canon", "HOT"), item("Sony Camera", "HOT"),
				item("Gopro Hero 13"), item("Flycam DJI"), item("DJI Action 5 Pro"), item("DJI Action 4")
		));
	}

	private void seedHomeBeauty() {
		Category root = root("Đồ gia dụng, Làm đẹp", "home", 5);
		group(root, "Thiết bị gia đình", 1, List.of(
				item("Quạt", "HOT"), item("Robot hút bụi", "HOT"), item("Máy chiếu", "HOT"),
				item("Máy lọc không khí"), item("Máy hút ẩm"), item("Máy hút bụi cầm tay"),
				item("TV Box"), item("Máy sưởi - Quạt sưởi"), item("Bàn ủi")
		));
		group(root, "Gia dụng nhà bếp", 2, List.of(
				item("Nồi chiên không dầu", "HOT"), item("Nồi cơm điện", "HOT"), item("Máy xay sinh tố"),
				item("Máy ép trái cây"), item("Máy làm sữa hạt"), item("Bếp điện"), item("Ấm siêu tốc"),
				item("Nồi áp suất"), item("Nồi nấu chậm"), item("Nồi lẩu điện")
		));
		group(root, "Sức khỏe - Làm đẹp", 3, List.of(
				item("Máy sấy tóc"), item("Máy massage"), item("Máy cạo râu"), item("Cân sức khỏe"),
				item("Bàn chải điện"), item("Máy tăm nước"), item("Tông đơ cắt tóc"), item("Máy tỉa lông mũi"),
				item("Máy rửa mặt"), item("Máy tạo kiểu tóc"), item("Máy triệt lông"), item("Máy đo huyết áp"),
				item("Mẹ và bé", "MỚI"), item("Phụ kiện thú cưng", "MỚI")
		));
		group(root, "Sản phẩm nổi bật", 4, List.of(
				item("Robot hút bụi Ecovacs T30S Omni", "HOT"), item("Máy lọc không khí Dyson"),
				item("Nồi chiên không dầu Philips")
		));
		group(root, "Thương hiệu gia dụng", 5, List.of(
				item("Philips"), item("Panasonic"), item("Sunhouse"), item("Sharp"), item("Gaabor"),
				item("Bear"), item("AQUA"), item("Toshiba"), item("Midea"), item("Dreame"),
				item("Xiaomi Home"), item("Cuckoo")
		));
	}

	private void seedAccessories() {
		Category root = root("Phụ kiện", "accessory", 6);
		group(root, "Phụ kiện di động", 1, List.of(
				item("Phụ kiện Apple"), item("Dán màn hình"), item("Ốp lưng - Bao da"), item("Thẻ nhớ"),
				item("Apple Care+"), item("Samsung Care+"), item("Sim 4G - 5G"), item("Cáp sạc"),
				item("Sạc dự phòng"), item("Trạm sạc dự phòng"), item("Dây đeo chéo điện thoại"),
				item("Phụ kiện điện thoại")
		));
		group(root, "Phụ kiện Laptop", 2, List.of(
				item("Chuột, bàn phím"), item("Balo Laptop | Túi chống sốc"), item("Phần mềm"),
				item("Webcam"), item("Giá đỡ"), item("Thảm, lót chuột"), item("Sạc laptop"),
				item("Camera phòng họp"), item("Hub chuyển đổi")
		));
		group(root, "Thiết bị mạng", 3, List.of(
				item("Thiết bị phát sóng WIFI"), item("Bộ phát wifi di động"), item("Bộ kích sóng WIFI"),
				item("Hub-Switch"), item("USB wifi"), item("Card mạng"), item("Xem tất cả thiết bị mạng")
		));
		group(root, "Thiết bị lưu trữ", 4, List.of(
				item("Thẻ nhớ lưu trữ"), item("USB"), item("Ổ cứng di động")
		));
		group(root, "Phụ kiện khác", 5, List.of(
				item("PlayStation"), item("ROG Ally"), item("Dây đeo đồng hồ"), item("Bút cảm ứng"),
				item("Giá đỡ điện thoại"), item("Túi chống nước"), item("Phụ kiện ô tô"),
				item("Thiết bị định vị"), item("Đèn năng lượng mặt trời", "MỚI"), item("Đèn pin", "MỚI"),
				item("Pin tiểu")
		));
		group(root, "Phụ kiện hot", 6, List.of(
				item("Ốp lưng iPhone 16", "MỚI"), item("Ốp lưng iPhone Duo"), item("Dán màn hình iPhone 16", "MỚI"),
				item("Ốp lưng S24 Series"), item("Quạt cầm tay | Quạt mini", "HOT"), item("Gậy chụp ảnh"),
				item("Kính thông minh")
		));
	}

	private void seedPc() {
		Category root = root("PC, Màn hình, Máy in", "pc", 7);
		group(root, "Loại PC", 1, List.of(
				item("Build PC"), item("Cấu hình sẵn"), item("All In One"), item("PC bộ")
		));
		group(root, "Chọn PC theo nhu cầu", 2, List.of(
				item("Gaming PC"), item("Đồ họa PC"), item("Văn phòng PC")
		));
		group(root, "Linh kiện máy tính", 3, List.of(
				item("CPU"), item("Main"), item("RAM"), item("Ổ cứng"), item("Nguồn"), item("VGA"),
				item("Tản nhiệt"), item("Case"), item("Xem tất cả linh kiện")
		));
		group(root, "Chọn màn hình theo hãng", 4, List.of(
				item("ASUS Monitor"), item("Samsung Monitor"), item("DELL Monitor"), item("LG Monitor"),
				item("MSI Monitor"), item("Acer Monitor"), item("Xiaomi Monitor"), item("ViewSonic"),
				item("Philips Monitor"), item("AOC"), item("Dahua"), item("VSP")
		));
		group(root, "Chọn màn hình theo nhu cầu", 5, List.of(
				item("Gaming Monitor"), item("Văn phòng Monitor"), item("Đồ họa Monitor"),
				item("Lập trình"), item("Màn hình di động"), item("Arm màn hình"), item("Xem tất cả màn hình")
		));
		group(root, "Gaming Gear", 6, List.of(
				item("PlayStation Gear"), item("ROG Ally Gear"), item("Bàn phím Gaming"),
				item("Chuột chơi game"), item("Tai nghe Gaming"), item("Tay cầm chơi Game"),
				item("Xem tất cả Gaming Gear")
		));
		group(root, "Thiết bị văn phòng", 7, List.of(
				item("Máy in"), item("Phần mềm văn phòng"), item("Bảng vẽ điện tử"),
				item("Máy tính Casio"), item("Decor bàn làm việc")
		));
	}

	private void seedTv() {
		Category root = root("Tivi, Điện máy", "tv", 8);
		group(root, "Chọn hãng tivi", 1, List.of(
				item("Samsung Tivi"), item("LG Tivi"), item("Xiaomi Tivi"), item("Coocaa"),
				item("Sony Tivi"), item("TCL"), item("VSP Tivi"), item("Aqua Tivi"), item("Xem tất cả tivi")
		));
		group(root, "Chọn hãng máy lọc nước", 2, List.of(
				item("Karofi", "MỚI"), item("Livotec"), item("Xem tất cả máy lọc nước")
		));
		group(root, "Chọn hãng tủ lạnh", 3, List.of(
				item("Samsung Tủ lạnh"), item("Panasonic Tủ lạnh"), item("LG Tủ lạnh"), item("Aqua Tủ lạnh"),
				item("Toshiba Tủ lạnh"), item("Xiaomi Tủ lạnh"), item("Sharp Tủ lạnh"), item("Hitachi"),
				item("Bosch"), item("Xem tất cả tủ lạnh")
		));
		group(root, "Chọn hãng tủ đông", 4, List.of(
				item("Toshiba Tủ đông"), item("Xem tất cả tủ đông")
		));
		group(root, "Chọn hãng máy giặt", 5, List.of(
				item("Aqua Máy giặt"), item("Electrolux"), item("Hitachi Máy giặt"), item("LG Máy giặt"),
				item("Panasonic Máy giặt"), item("Samsung Máy giặt"), item("Sharp Máy giặt"),
				item("Toshiba Máy giặt"), item("Xiaomi Máy giặt"), item("Roborock"), item("Bosch Máy giặt"),
				item("Xem tất cả máy giặt")
		));
		group(root, "Chọn hãng máy sấy", 6, List.of(
				item("LG Máy sấy"), item("Samsung Máy sấy"), item("Panasonic Máy sấy"),
				item("Aqua Máy sấy"), item("Toshiba Máy sấy"), item("Xem tất cả máy sấy quần áo")
		));
		group(root, "Chọn hãng máy rửa chén bát", 7, List.of(
				item("Bosch Máy rửa bát"), item("Panasonic Máy rửa bát"), item("Hòa Phát"),
				item("Samsung Máy rửa bát"), item("Galanz"), item("Xem tất cả máy rửa chén bát")
		));
	}

	private void seedTradeIn() {
		Category root = root("Thu cũ đổi mới", "trade-in", 9);
		group(root, "Chương trình nổi bật", 1, List.of(
				item("S-BuyBack", "MỚI")
		));
		group(root, "Chọn theo hãng", 2, List.of(
				item("Thu cũ iPhone"), item("Thu cũ Samsung"), item("Thu cũ Xiaomi"), item("Thu cũ Laptop"),
				item("Thu cũ Mac"), item("Thu cũ iPad"), item("Thu cũ Đồng hồ"), item("Thu cũ Apple Watch")
		));
		group(root, "Sản phẩm trợ giá cao", 3, List.of(
				item("iPhone 16 Series Trade"), item("Samsung Galaxy Z6 Series Trade"),
				item("OPPO Find X8 Ultra Trade"), item("Redmi Note 17 Pro Max Trade"),
				item("HONOR 300 Trade"), item("Macbook Trade"), item("Laptop Trade")
		));
		group(root, "Sản phẩm giá thu cao", 4, List.of(
				item("iPhone 17 Pro Max Trade"), item("iPhone 16 Pro Max Trade"), item("iPhone 15 Pro Max Trade"),
				item("Samsung Galaxy Z Fold 7 Trade"), item("Samsung Galaxy Z Flip 7 Trade"),
				item("Samsung Galaxy S25 Ultra Trade"), item("Xiaomi 17 Ultra Trade"),
				item("OPPO Find N5 Trade"), item("Macbook Pro M5 Trade"), item("Macbook Air M5 Trade")
		));
	}

	private void seedUsed() {
		Category root = root("Hàng cũ", "used", 10);
		group(root, "Chọn loại sản phẩm cũ", 1, List.of(
				item("Điện thoại cũ"), item("Máy tính bảng cũ"), item("Mac cũ"), item("Laptop cũ"),
				item("Máy ảnh cũ"), item("Tai nghe cũ"), item("Loa cũ"), item("Đồng hồ thông minh cũ"),
				item("Đồ gia dụng cũ"), item("Màn hình cũ"), item("Phụ kiện cũ"), item("Tivi cũ"),
				item("Sức khỏe làm đẹp cũ"), item("Camera giám sát cũ")
		));
		group(root, "Chọn dòng iPhone cũ", 2, List.of(
				item("iPhone 16 cũ"), item("iPhone 15 cũ"), item("iPhone 14 cũ"), item("iPhone 13 cũ"),
				item("iPhone 12 cũ"), item("iPhone 11 cũ"), item("iPhone cũ")
		));
		group(root, "Điện thoại Android cũ", 3, List.of(
				item("Samsung cũ"), item("Xiaomi cũ"), item("OPPO cũ"), item("TECNO cũ"), item("HONOR cũ"),
				item("Nubia cũ"), item("Sony cũ"), item("Huawei cũ"), item("vivo cũ"), item("realme cũ"),
				item("Nokia cũ"), item("ASUS cũ")
		));
		group(root, "Chọn hãng laptop cũ", 4, List.of(
				item("Dell cũ"), item("ASUS cũ"), item("Acer cũ"), item("HP cũ"), item("Surface cũ")
		));
		group(root, "Sản phẩm Apple cũ", 5, List.of(
				item("iPhone 12 Pro Max cũ"), item("iPhone 11 Pro Max cũ"), item("MacBook cũ"),
				item("Apple Watch cũ"), item("iPad cũ"), item("Airpods cũ")
		));
	}

	private void seedPromos() {
		Category root = root("Khuyến mãi", "promo", 11);
		group(root, "Khuyến mãi", 1, List.of(
				item("Hotsale cuối tuần"), item("Trả góp 3 Không", "HOT"),
				item("Đặc quyền online ưu đãi đến 50%++"), item("Khách hàng doanh nghiệp B2B")
		));
		group(root, "Ưu đãi thành viên", 2, List.of(
				item("Chính sách Smember 2026", "MỚI")
		));
		group(root, "Ưu đãi sinh viên", 3, List.of(
				item("Nhập hội S-Student"), item("Đăng ký S-Student", "HOT"),
				item("Laptop giảm thêm đến 1 Triệu"), item("Điện thoại giảm thêm đến 500.000đ"),
				item("Màn hình giảm thêm đến 500.000đ"), item("Loa - tai nghe giảm thêm đến 10%"),
				item("Hàng cũ giảm thêm đến 7%")
		));
	}

	private void seedNews() {
		Category root = root("Tin công nghệ", "news", 12);
		group(root, "Chuyên mục", 1, List.of(
				item("Tin công nghệ mới"), item("S-Games"), item("Tư vấn"),
				item("Trên tay"), item("Thủ thuật - Hỏi đáp")
		));
	}

	private Category root(String name, String icon, int order) {
		return save(null, name, slugify(name), icon, null, CategoryNodeType.ROOT, order);
	}

	private void group(Category root, String name, int order, List<ItemSpec> items) {
		Category group = save(root, name, slugify(root.getSlug() + "-" + name), null, null, CategoryNodeType.GROUP, order);
		int itemOrder = 1;
		for (ItemSpec spec : items) {
			save(
					group,
					spec.name(),
					slugify(group.getSlug() + "-" + spec.name()),
					null,
					spec.badge(),
					CategoryNodeType.ITEM,
					itemOrder++
			);
		}
	}

	private Category save(
			Category parent,
			String name,
			String slug,
			String icon,
			String badge,
			CategoryNodeType type,
			int order
	) {
		Category category = new Category();
		category.setParent(parent);
		category.setName(name);
		category.setSlug(uniqueSlug(slug));
		category.setIconKey(icon);
		category.setBadge(badge);
		category.setNodeType(type);
		category.setSortOrder(order);
		category.setActive(true);
		return categoryRepository.save(category);
	}

	private String uniqueSlug(String base) {
		String candidate = base;
		int i = 2;
		while (usedSlugs.contains(candidate) || categoryRepository.existsBySlug(candidate)) {
			candidate = base + "-" + i++;
		}
		usedSlugs.add(candidate);
		return candidate;
	}

	private static ItemSpec item(String name) {
		return new ItemSpec(name, null);
	}

	private static ItemSpec item(String name, String badge) {
		return new ItemSpec(name, badge);
	}

	private static String slugify(String input) {
		String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
				.replaceAll("\\p{M}+", "")
				.toLowerCase(Locale.ROOT)
				.replace("đ", "d")
				.replaceAll("[^a-z0-9]+", "-")
				.replaceAll("(^-|-$)", "");
		return normalized.isBlank() ? "category" : normalized;
	}

	private record ItemSpec(String name, String badge) {
	}
}
