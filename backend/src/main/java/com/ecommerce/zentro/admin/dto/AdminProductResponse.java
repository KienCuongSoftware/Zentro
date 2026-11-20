package com.ecommerce.zentro.admin.dto;

import com.ecommerce.zentro.catalog.Product;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;

public record AdminProductResponse(
		Long id,
		String name,
		String slug,
		String description,
		String brand,
		BigDecimal price,
		BigDecimal compareAtPrice,
		int stock,
		String imageUrl,
		boolean active,
		Long categoryId,
		String categoryName,
		List<ProvinceStockResponse> stocks,
		Instant createdAt,
		Instant updatedAt
) {

	public static AdminProductResponse from(Product product) {
		List<ProvinceStockResponse> stocks = product.getStocks().stream()
				.sorted(Comparator
						.comparingInt((com.ecommerce.zentro.catalog.ProductStock s) -> s.getProvince().getSortOrder())
						.thenComparing(s -> s.getProvince().getName()))
				.map(ProvinceStockResponse::from)
				.toList();

		return new AdminProductResponse(
				product.getId(),
				product.getName(),
				product.getSlug(),
				product.getDescription(),
				product.getBrand(),
				product.getPrice(),
				product.getCompareAtPrice(),
				product.getStock(),
				product.getImageUrl(),
				product.isActive(),
				product.getCategory() == null ? null : product.getCategory().getId(),
				product.getCategory() == null ? null : product.getCategory().getName(),
				stocks,
				product.getCreatedAt(),
				product.getUpdatedAt()
		);
	}
}
