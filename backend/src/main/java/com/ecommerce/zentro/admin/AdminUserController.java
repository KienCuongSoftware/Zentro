package com.ecommerce.zentro.admin;

import com.ecommerce.zentro.admin.dto.AdminUserResponse;
import com.ecommerce.zentro.admin.dto.UpdateUserEnabledRequest;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

	private final AdminUserService adminUserService;

	@GetMapping
	public List<AdminUserResponse> listUsers(@RequestParam(required = false) String q) {
		return adminUserService.listUsers(q);
	}

	@PatchMapping("/{id}/enabled")
	public AdminUserResponse updateEnabled(
			@PathVariable Long id,
			@Valid @RequestBody UpdateUserEnabledRequest request,
			@AuthenticationPrincipal Jwt jwt
	) {
		return adminUserService.updateEnabled(id, request.enabled(), jwt.getSubject());
	}
}
