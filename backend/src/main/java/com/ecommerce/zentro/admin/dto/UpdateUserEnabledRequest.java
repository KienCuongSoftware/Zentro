package com.ecommerce.zentro.admin.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateUserEnabledRequest(
		@NotNull Boolean enabled
) {
}
