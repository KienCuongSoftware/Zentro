package com.ecommerce.zentro.admin.dto;

import com.ecommerce.zentro.catalog.Province;

public record ProvinceResponse(
		Long id,
		String name,
		String slug,
		int sortOrder
) {

	public static ProvinceResponse from(Province province) {
		return new ProvinceResponse(
				province.getId(),
				province.getName(),
				province.getSlug(),
				province.getSortOrder()
		);
	}
}
