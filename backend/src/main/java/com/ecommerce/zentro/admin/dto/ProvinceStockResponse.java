package com.ecommerce.zentro.admin.dto;

import com.ecommerce.zentro.catalog.ProductStock;

public record ProvinceStockResponse(
		Long provinceId,
		String provinceName,
		String provinceSlug,
		int quantity
) {

	public static ProvinceStockResponse from(ProductStock stock) {
		return new ProvinceStockResponse(
				stock.getProvince().getId(),
				stock.getProvince().getName(),
				stock.getProvince().getSlug(),
				stock.getQuantity()
		);
	}
}
