package com.ecommerce.zentro.admin.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ProvinceStockRequest(
		@NotNull Long provinceId,
		@NotNull @Min(0) Integer quantity
) {
}
