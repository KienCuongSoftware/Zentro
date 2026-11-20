package com.ecommerce.zentro.catalog;

import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@Order(20)
@RequiredArgsConstructor
public class ProductDemoSeeder implements ApplicationRunner {

	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final ProvinceRepository provinceRepository;

	@Override
	@Transactional
	public void run(ApplicationArguments args) {
		if (productRepository.count() > 0) {
			return;
		}

		List<Province> provinces = provinceRepository.findAllByOrderBySortOrderAscNameAsc();
		if (provinces.isEmpty()) {
			log.warn("Skip product seed: no provinces found");
			return;
		}

		Category phone = categoryRepository.findByNodeTypeAndActiveTrueOrderBySortOrderAscIdAsc(CategoryNodeType.ROOT)
				.stream()
				.filter(c -> "dien-thoai-tablet".equals(c.getSlug()) || c.getName().toLowerCase().contains("điện thoại"))
				.findFirst()
				.orElse(null);

		Category laptop = categoryRepository.findByNodeTypeAndActiveTrueOrderBySortOrderAscIdAsc(CategoryNodeType.ROOT)
				.stream()
				.filter(c -> "laptop".equals(c.getSlug()))
				.findFirst()
				.orElse(null);

		save("iPhone 16 Pro 128GB", "iphone-16-pro-128gb", "Apple", "25990000", "27990000", phone,
				"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
				provinces, 25);
		save("Samsung Galaxy S25 Ultra", "samsung-galaxy-s25-ultra", "Samsung", "28990000", "30990000", phone,
				"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
				provinces, 18);
		save("MacBook Air M3 13 inch", "macbook-air-m3-13", "Apple", "27990000", null, laptop,
				"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
				provinces, 12);
		save("ASUS Vivobook 15", "asus-vivobook-15", "ASUS", "14990000", "16990000", laptop,
				"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
				provinces, 30);

		log.info("Seeded demo products with province stocks");
	}

	private void save(
			String name,
			String slug,
			String brand,
			String price,
			String compareAt,
			Category category,
			String imageUrl,
			List<Province> provinces,
			int baseStock
	) {
		Product product = new Product();
		product.setName(name);
		product.setSlug(slug);
		product.setBrand(brand);
		product.setPrice(new BigDecimal(price));
		product.setCompareAtPrice(compareAt == null ? null : new BigDecimal(compareAt));
		product.setCategory(category);
		product.setImageUrl(imageUrl);
		product.setDescription(name + " chính hãng, bảo hành toàn quốc.");
		product.setActive(true);

		int total = 0;
		for (int i = 0; i < provinces.size(); i++) {
			Province province = provinces.get(i);
			int quantity;
			if (i < 2) {
				quantity = baseStock;
			} else if (i < 8) {
				quantity = Math.max(1, baseStock / 2);
			} else {
				quantity = i % 3 == 0 ? Math.max(1, baseStock / 5) : 0;
			}

			ProductStock stock = new ProductStock();
			stock.setProduct(product);
			stock.setProvince(province);
			stock.setQuantity(quantity);
			product.getStocks().add(stock);
			total += quantity;
		}

		product.setStock(total);
		productRepository.save(product);
	}
}
