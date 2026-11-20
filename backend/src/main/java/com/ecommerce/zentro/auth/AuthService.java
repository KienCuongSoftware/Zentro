package com.ecommerce.zentro.auth;

import com.ecommerce.zentro.auth.dto.AuthResponse;
import com.ecommerce.zentro.auth.dto.LoginRequest;
import com.ecommerce.zentro.auth.dto.RegisterRequest;
import com.ecommerce.zentro.auth.dto.UserResponse;
import com.ecommerce.zentro.common.ApiException;
import com.ecommerce.zentro.security.UserPrincipal;
import com.ecommerce.zentro.user.AuthProvider;
import com.ecommerce.zentro.user.Role;
import com.ecommerce.zentro.user.RoleRepository;
import com.ecommerce.zentro.user.User;
import com.ecommerce.zentro.user.UserRepository;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

	private static final String ROLE_USER = "ROLE_USER";

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final TokenService tokenService;

	@Transactional
	public AuthResponse register(RegisterRequest request) {
		if (userRepository.existsByEmailIgnoreCase(request.email())) {
			throw new ApiException(HttpStatus.CONFLICT, "Email already registered");
		}

		Role userRole = roleRepository.findByName(ROLE_USER)
				.orElseThrow(() -> new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Default role is missing"));

		User user = new User();
		user.setEmail(request.email().trim().toLowerCase());
		user.setPasswordHash(passwordEncoder.encode(request.password()));
		user.setFullName(request.fullName().trim());
		user.setPhone(blankToNull(request.phone()));
		user.setEnabled(true);
		user.setAuthProvider(AuthProvider.LOCAL);
		Set<Role> roles = new HashSet<>();
		roles.add(userRole);
		user.setRoles(roles);

		User saved = userRepository.save(user);

		Authentication authentication = authenticationManager.authenticate(
				UsernamePasswordAuthenticationToken.unauthenticated(saved.getEmail(), request.password())
		);

		return toAuthResponse(authentication, saved);
	}

	@Transactional(readOnly = true)
	public AuthResponse login(LoginRequest request) {
		Authentication authentication = authenticationManager.authenticate(
				UsernamePasswordAuthenticationToken.unauthenticated(
						request.email().trim().toLowerCase(),
						request.password()
				)
		);

		UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
		return toAuthResponse(authentication, principal.getUser());
	}

	@Transactional(readOnly = true)
	public UserResponse me(String email) {
		User user = userRepository.findByEmailIgnoreCase(email)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
		return UserResponse.from(user);
	}

	private AuthResponse toAuthResponse(Authentication authentication, User user) {
		String token = tokenService.createAccessToken(authentication);
		return new AuthResponse(token, "Bearer", tokenService.expiresInSeconds(), UserResponse.from(user));
	}

	private static String blankToNull(String value) {
		if (value == null || value.isBlank()) {
			return null;
		}
		return value.trim();
	}
}
