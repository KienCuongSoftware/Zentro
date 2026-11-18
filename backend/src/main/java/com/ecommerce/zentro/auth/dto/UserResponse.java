package com.ecommerce.zentro.auth.dto;

import com.ecommerce.zentro.user.User;
import java.util.List;

public record UserResponse(
		Long id,
		String email,
		String fullName,
		String phone,
		List<String> roles
) {

	public static UserResponse from(User user) {
		List<String> roles = user.getRoles().stream()
				.map(role -> role.getName())
				.sorted()
				.toList();

		return new UserResponse(
				user.getId(),
				user.getEmail(),
				user.getFullName(),
				user.getPhone(),
				roles
		);
	}
}
