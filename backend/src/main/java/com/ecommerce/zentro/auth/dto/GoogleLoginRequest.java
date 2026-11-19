package com.ecommerce.zentro.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record GoogleLoginRequest(
		@NotBlank String accessToken
) {
}
