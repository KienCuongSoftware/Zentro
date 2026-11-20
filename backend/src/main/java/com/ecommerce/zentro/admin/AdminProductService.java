package com.ecommerce.zentro.admin;

import com.ecommerce.zentro.admin.dto.AdminProductRequest;
import com.ecommerce.zentro.admin.dto.AdminProductResponse;
import com.ecommerce.zentro.admin.dto.CategoryOptionResponse;
import com.ecommerce.zentro.admin.dto.ProvinceResponse;
import com.ecommerce.zentro.admin.dto.ProvinceStockRequest;
import com.ecommerce.zentro.catalog.Category;
import com.ecommerce.zentro.catalog.CategoryNodeType;
import com.ecommerce.zentro.catalog.CategoryRepository;
import com.ecommerce.zentro.catalog.Product;
import com.ecommerce.zentro.catalog.ProductRepository;
import com.ecommerce.zentro.catalog.ProductStock;
import com.ecommerce.zentro.catalog.Province;
import com.ecommerce.zentro.catalog.ProvinceRepository;
import com.ecommerce.zentro.common.ApiException;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class AdminProductService {

	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final ProvinceRepository provinceRepository;

	@Transactional(readOnly = true)
	public List<AdminProductResponse> listProducts(String query) {
		List<Product> products = StringUtils.hasText(query)
				? productRepository.search(query.trim())
				: productRepository.findAllWithCategory();
		products.forEach(product -> Hibernate.initialize(product.getStocks()));
		products.forEach(product -> product.getStocks().forEach(stock -> Hibernate.initialize(stock.getProvince())));
		return products.stream().map(AdminProductResponse::from).toList();
	}

	@Transactional(readOnly = true)
	public List<CategoryOptionResponse> listRootCategories() {
		return categoryRepository
				.findByNodeTypeAndActiveTrueOrderBySortOrderAscIdAsc(CategoryNodeType.ROOT)
				.stream()
				.map(CategoryOptionResponse::from)
				.toList();
	}

	@Transactional(readOnly = true)
	public List<ProvinceResponse> listProvinces() {
		return provinceRepository.findAllByOrderBySortOrderAscNameAsc().stream()
				.map(ProvinceResponse::from)
				.toList();
	}

	@Transactional
	public AdminProductResponse create(AdminProductRequest request) {
		Product product = new Product();
		applyRequest(product, request, true);
		Product saved = productRepository.save(product);
		Hibernate.initialize(saved.getStocks());
		saved.getStocks().forEach(stock -> Hibernate.initialize(stock.getProvince()));
		return AdminProductResponse.from(saved);
	}

	@Transactional
	public AdminProductResponse update(Long id, AdminProductRequest request) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));
		Hibernate.initialize(product.getStocks());
		applyRequest(product, request, false);
		Product saved = productRepository.save(product);
		Hibernate.initialize(saved.getStocks());
		saved.getStocks().forEach(stock -> Hibernate.initialize(stock.getProvince()));
		return AdminProductResponse.from(saved);
	}

	@Transactional
	public AdminProductResponse updateActive(Long id, boolean active) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));
		product.setActive(active);
		Hibernate.initialize(product.getStocks());
		product.getStocks().forEach(stock -> Hibernate.initialize(stock.getProvince()));
		return AdminProductResponse.from(productRepository.save(product));
	}

	@Transactional
	public void delete(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm");
		}
		productRepository.deleteById(id);
	}

	private void applyRequest(Product product, AdminProductRequest request, boolean creating) {
		String name = request.name().trim();
		product.setName(name);
		product.setDescription(blankToNull(request.description()));
		product.setBrand(blankToNull(request.brand()));
		product.setPrice(request.price());
		product.setCompareAtPrice(request.compareAtPrice());
		product.setImageUrl(blankToNull(request.imageUrl()));
		product.setActive(request.active() == null || request.active());

		String slugBase = StringUtils.hasText(request.slug())
				? slugify(request.slug())
				: slugify(name);
		String slug = uniqueSlug(slugBase, creating ? null : product.getId());
		product.setSlug(slug);

		if (request.categoryId() == null) {
			product.setCategory(null);
		} else {
			Category category = categoryRepository.findById(request.categoryId())
					.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Danh mục không hợp lệ"));
			product.setCategory(category);
		}

		applyStocks(product, request.stocks());
	}

	private void applyStocks(Product product, List<ProvinceStockRequest> stockRequests) {
		List<Province> provinces = provinceRepository.findAllByOrderBySortOrderAscNameAsc();
		if (provinces.isEmpty()) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Chưa có dữ liệu tỉnh thành");
		}

		Map<Long, Integer> quantityByProvince = new HashMap<>();
		Set<Long> seen = new HashSet<>();
		for (ProvinceStockRequest item : stockRequests) {
			if (!seen.add(item.provinceId())) {
				throw new ApiException(HttpStatus.BAD_REQUEST, "Trùng tỉnh thành trong tồn kho");
			}
			quantityByProvince.put(item.provinceId(), item.quantity());
		}

		if (quantityByProvince.size() != provinces.size()) {
			throw new ApiException(
					HttpStatus.BAD_REQUEST,
					"Phải nhập số lượng cho đủ " + provinces.size() + " tỉnh/thành"
			);
		}

		for (Province province : provinces) {
			if (!quantityByProvince.containsKey(province.getId())) {
				throw new ApiException(
						HttpStatus.BAD_REQUEST,
						"Thiếu số lượng cho tỉnh/thành: " + province.getName()
				);
			}
		}

		Map<Long, ProductStock> existingByProvince = new HashMap<>();
		for (ProductStock stock : product.getStocks()) {
			existingByProvince.put(stock.getProvince().getId(), stock);
		}

		int total = 0;
		for (Province province : provinces) {
			int quantity = quantityByProvince.get(province.getId());
			total += quantity;

			ProductStock stock = existingByProvince.remove(province.getId());
			if (stock == null) {
				stock = new ProductStock();
				stock.setProduct(product);
				stock.setProvince(province);
				product.getStocks().add(stock);
			}
			stock.setQuantity(quantity);
		}

		product.getStocks().removeIf(stock -> existingByProvince.containsKey(stock.getProvince().getId()));
		product.setStock(total);
	}

	private String uniqueSlug(String base, Long currentId) {
		String candidate = base;
		int i = 2;
		while (true) {
			var existing = productRepository.findBySlug(candidate);
			if (existing.isEmpty() || (currentId != null && existing.get().getId().equals(currentId))) {
				return candidate;
			}
			candidate = base + "-" + i++;
		}
	}

	private static String blankToNull(String value) {
		if (!StringUtils.hasText(value)) {
			return null;
		}
		return value.trim();
	}

	private static String slugify(String input) {
		String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
				.replaceAll("\\p{M}+", "")
				.toLowerCase(Locale.ROOT)
				.replace("đ", "d")
				.replaceAll("[^a-z0-9]+", "-")
				.replaceAll("(^-|-$)", "");
		return normalized.isBlank() ? "san-pham" : normalized;
	}
}
