package com.ecommerce.zentro.admin.dto;

import com.ecommerce.zentro.user.User;
import java.time.Instant;
import java.util.List;

public record AdminUserResponse(
		Long id,
		String email,
		String fullName,
		String phone,
		String avatarUrl,
		String authProvider,
		boolean enabled,
		List<String> roles,
		Instant createdAt,
		Instant updatedAt
) {

	public static AdminUserResponse from(User user) {
		List<String> roles = user.getRoles().stream()
				.map(role -> role.getName())
				.sorted()
				.toList();

		return new AdminUserResponse(
				user.getId(),
				user.getEmail(),
				user.getFullName(),
				user.getPhone(),
				user.getAvatarUrl(),
				user.getAuthProvider() == null ? null : user.getAuthProvider().name(),
				user.isEnabled(),
				roles,
				user.getCreatedAt(),
				user.getUpdatedAt()
		);
	}
}
