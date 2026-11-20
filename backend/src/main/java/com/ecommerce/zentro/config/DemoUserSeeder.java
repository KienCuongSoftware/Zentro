package com.ecommerce.zentro.config;

import com.ecommerce.zentro.user.AuthProvider;
import com.ecommerce.zentro.user.Role;
import com.ecommerce.zentro.user.RoleRepository;
import com.ecommerce.zentro.user.User;
import com.ecommerce.zentro.user.UserRepository;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DemoUserSeeder implements ApplicationRunner {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public void run(ApplicationArguments args) {
		Role userRole = roleRepository.findByName("ROLE_USER")
				.orElseThrow(() -> new IllegalStateException("ROLE_USER missing"));
		Role adminRole = roleRepository.findByName("ROLE_ADMIN")
				.orElseThrow(() -> new IllegalStateException("ROLE_ADMIN missing"));

		ensureUser(
				"admin@zentro.local",
				"Admin Zentro",
				"0901000001",
				"Admin@123",
				adminRole
		);

		ensureUser(
				"customer@zentro.local",
				"Khách Hàng Demo",
				"0901000002",
				"Customer@123",
				userRole
		);

		normalizeSingleRolePerUser(userRole, adminRole);
	}

	private void ensureUser(String email, String fullName, String phone, String rawPassword, Role role) {
		if (userRepository.existsByEmailIgnoreCase(email)) {
			return;
		}

		User user = new User();
		user.setEmail(email);
		user.setFullName(fullName);
		user.setPhone(phone);
		user.setPasswordHash(passwordEncoder.encode(rawPassword));
		user.setEnabled(true);
		user.setAuthProvider(AuthProvider.LOCAL);
		user.setRoles(mutableRoles(role));
		userRepository.save(user);

		log.info("Seeded demo account: {}", email);
	}

	/**
	 * One account = one role. Admin must not also keep ROLE_USER.
	 */
	private void normalizeSingleRolePerUser(Role userRole, Role adminRole) {
		for (User user : userRepository.findAll()) {
			boolean hasAdmin = user.getRoles().stream()
					.anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));
			Role expectedRole = hasAdmin ? adminRole : userRole;

			boolean alreadySingleExpected = user.getRoles().size() == 1
					&& user.getRoles().contains(expectedRole);

			if (!alreadySingleExpected) {
				user.getRoles().clear();
				user.getRoles().add(expectedRole);
				userRepository.save(user);
				log.info("Normalized roles for {}: {}", user.getEmail(), hasAdmin ? "ADMIN" : "USER");
			}
		}
	}

	private static Set<Role> mutableRoles(Role role) {
		Set<Role> roles = new HashSet<>();
		roles.add(role);
		return roles;
	}
}
