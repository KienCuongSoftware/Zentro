package com.ecommerce.zentro.admin.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateProductActiveRequest(
		@NotNull Boolean active
) {
}
