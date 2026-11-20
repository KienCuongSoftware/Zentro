package com.ecommerce.zentro.admin;

import com.ecommerce.zentro.admin.dto.AdminProductRequest;
import com.ecommerce.zentro.admin.dto.AdminProductResponse;
import com.ecommerce.zentro.admin.dto.CategoryOptionResponse;
import com.ecommerce.zentro.admin.dto.ProvinceResponse;
import com.ecommerce.zentro.admin.dto.UpdateProductActiveRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

	private final AdminProductService adminProductService;

	@GetMapping("/products")
	public List<AdminProductResponse> listProducts(@RequestParam(required = false) String q) {
		return adminProductService.listProducts(q);
	}

	@GetMapping("/categories/options")
	public List<CategoryOptionResponse> categoryOptions() {
		return adminProductService.listRootCategories();
	}

	@GetMapping("/provinces")
	public List<ProvinceResponse> listProvinces() {
		return adminProductService.listProvinces();
	}

	@PostMapping("/products")
	@ResponseStatus(HttpStatus.CREATED)
	public AdminProductResponse create(@Valid @RequestBody AdminProductRequest request) {
		return adminProductService.create(request);
	}

	@PutMapping("/products/{id}")
	public AdminProductResponse update(
			@PathVariable Long id,
			@Valid @RequestBody AdminProductRequest request
	) {
		return adminProductService.update(id, request);
	}

	@PatchMapping("/products/{id}/active")
	public AdminProductResponse updateActive(
			@PathVariable Long id,
			@Valid @RequestBody UpdateProductActiveRequest request
	) {
		return adminProductService.updateActive(id, request.active());
	}

	@DeleteMapping("/products/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		adminProductService.delete(id);
	}
}
