package com.ecommerce.zentro.admin;

import com.ecommerce.zentro.admin.dto.AdminUserResponse;
import com.ecommerce.zentro.common.ApiException;
import com.ecommerce.zentro.user.User;
import com.ecommerce.zentro.user.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class AdminUserService {

	private final UserRepository userRepository;

	@Transactional(readOnly = true)
	public List<AdminUserResponse> listUsers(String query) {
		List<User> users = StringUtils.hasText(query)
				? userRepository.searchByEmailOrFullName(query.trim())
				: userRepository.findAllByOrderByCreatedAtDesc();

		return users.stream().map(AdminUserResponse::from).toList();
	}

	@Transactional
	public AdminUserResponse updateEnabled(Long userId, boolean enabled, String currentAdminEmail) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

		if (user.getEmail().equalsIgnoreCase(currentAdminEmail) && !enabled) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Không thể tự khoá tài khoản admin đang đăng nhập");
		}

		boolean isAdmin = user.getRoles().stream().anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));
		if (isAdmin && !enabled) {
			long enabledAdmins = userRepository.findAll().stream()
					.filter(User::isEnabled)
					.filter(u -> u.getRoles().stream().anyMatch(role -> "ROLE_ADMIN".equals(role.getName())))
					.count();
			if (enabledAdmins <= 1) {
				throw new ApiException(HttpStatus.BAD_REQUEST, "Phải còn ít nhất một admin đang hoạt động");
			}
		}

		user.setEnabled(enabled);
		return AdminUserResponse.from(userRepository.save(user));
	}
}
