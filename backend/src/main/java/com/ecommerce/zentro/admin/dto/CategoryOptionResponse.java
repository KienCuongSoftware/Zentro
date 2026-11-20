package com.ecommerce.zentro.admin.dto;

import com.ecommerce.zentro.catalog.Category;

public record CategoryOptionResponse(
		Long id,
		String name,
		String slug
) {

	public static CategoryOptionResponse from(Category category) {
		return new CategoryOptionResponse(category.getId(), category.getName(), category.getSlug());
	}
}
