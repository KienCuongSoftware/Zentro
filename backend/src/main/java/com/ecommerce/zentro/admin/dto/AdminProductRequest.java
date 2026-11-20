package com.ecommerce.zentro.admin.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public record AdminProductRequest(
		@NotBlank @Size(max = 255) String name,
		@Size(max = 280) String slug,
		String description,
		@Size(max = 120) String brand,
		@NotNull @DecimalMin("0.0") BigDecimal price,
		@DecimalMin("0.0") BigDecimal compareAtPrice,
		@Size(max = 500) String imageUrl,
		Boolean active,
		Long categoryId,
		@NotEmpty @Valid List<ProvinceStockRequest> stocks
) {
}
