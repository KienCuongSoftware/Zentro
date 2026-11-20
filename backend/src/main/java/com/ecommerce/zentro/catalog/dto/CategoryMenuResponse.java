package com.ecommerce.zentro.catalog.dto;

import java.util.List;

public record CategoryMenuResponse(
		List<CategoryMenuRoot> categories
) {
	public record CategoryMenuRoot(
			Long id,
			String name,
			String slug,
			String icon,
			List<CategoryMenuGroup> groups
	) {
	}

	public record CategoryMenuGroup(
			Long id,
			String name,
			String slug,
			List<CategoryMenuItem> items
	) {
	}

	public record CategoryMenuItem(
			Long id,
			String name,
			String slug,
			String badge
	) {
	}
}
