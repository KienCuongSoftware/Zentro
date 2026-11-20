package com.ecommerce.zentro.catalog;

import com.ecommerce.zentro.catalog.dto.CategoryMenuResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping("/menu")
	public CategoryMenuResponse menu() {
		return categoryService.getMenu();
	}
}
