package com.ecommerce.zentro.auth;

import com.ecommerce.zentro.auth.dto.AuthResponse;
import com.ecommerce.zentro.auth.dto.UserResponse;
import com.ecommerce.zentro.common.ApiException;
import com.ecommerce.zentro.config.GoogleOAuthProperties;
import com.ecommerce.zentro.security.UserPrincipal;
import com.ecommerce.zentro.user.AuthProvider;
import com.ecommerce.zentro.user.Role;
import com.ecommerce.zentro.user.RoleRepository;
import com.ecommerce.zentro.user.User;
import com.ecommerce.zentro.user.UserRepository;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

	private static final String ROLE_USER = "ROLE_USER";
	private static final String TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
	private static final String USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final TokenService tokenService;
	private final GoogleOAuthProperties googleOAuthProperties;
	private final RestClient.Builder restClientBuilder;

	@Transactional
	public AuthResponse loginWithGoogle(String accessToken) {
		if (!StringUtils.hasText(googleOAuthProperties.clientId())) {
			throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "Google OAuth is not configured");
		}

		validateAccessToken(accessToken);
		GoogleProfile profile = fetchProfile(accessToken);

		if (!StringUtils.hasText(profile.email()) || !profile.emailVerified()) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, "Google account email is not verified");
		}

		User user = userRepository.findByGoogleSub(profile.sub())
				.or(() -> userRepository.findByEmailIgnoreCase(profile.email()))
				.orElseGet(User::new);

		boolean isNew = user.getId() == null;
		if (isNew) {
			Role userRole = roleRepository.findByName(ROLE_USER)
					.orElseThrow(() -> new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Default role is missing"));
			user.setRoles(Set.of(userRole));
			user.setEnabled(true);
			user.setAuthProvider(AuthProvider.GOOGLE);
		}

		user.setEmail(profile.email().trim().toLowerCase());
		user.setFullName(resolveName(profile));
		user.setAvatarUrl(profile.picture());
		user.setGoogleSub(profile.sub());
		if (user.getAuthProvider() == null) {
			user.setAuthProvider(AuthProvider.GOOGLE);
		}

		User saved = userRepository.save(user);
		UserPrincipal principal = new UserPrincipal(saved);
		Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(
				principal,
				null,
				principal.getAuthorities()
		);

		String token = tokenService.createAccessToken(authentication);
		return new AuthResponse(token, "Bearer", tokenService.expiresInSeconds(), UserResponse.from(saved));
	}

	private void validateAccessToken(String accessToken) {
		try {
			Map<String, Object> tokenInfo = restClientBuilder.build()
					.get()
					.uri(TOKEN_INFO_URL + "?access_token={token}", accessToken)
					.retrieve()
					.body(new ParameterizedTypeReference<>() {
					});

			if (tokenInfo == null) {
				throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid Google access token");
			}

			String audience = stringValue(tokenInfo.get("aud"));
			String azp = stringValue(tokenInfo.get("azp"));
			String clientId = googleOAuthProperties.clientId();

			if (!clientId.equals(audience) && !clientId.equals(azp)) {
				throw new ApiException(HttpStatus.UNAUTHORIZED, "Google token audience mismatch");
			}
		}
		catch (RestClientException ex) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid Google access token");
		}
	}

	private GoogleProfile fetchProfile(String accessToken) {
		try {
			Map<String, Object> body = restClientBuilder.build()
					.get()
					.uri(USER_INFO_URL)
					.header("Authorization", "Bearer " + accessToken)
					.retrieve()
					.body(new ParameterizedTypeReference<>() {
					});

			if (body == null) {
				throw new ApiException(HttpStatus.UNAUTHORIZED, "Unable to load Google profile");
			}

			return new GoogleProfile(
					stringValue(body.get("sub")),
					stringValue(body.get("email")),
					Boolean.parseBoolean(String.valueOf(body.getOrDefault("email_verified", false))),
					stringValue(body.get("name")),
					stringValue(body.get("picture"))
			);
		}
		catch (RestClientException ex) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, "Unable to load Google profile");
		}
	}

	private static String resolveName(GoogleProfile profile) {
		if (StringUtils.hasText(profile.name())) {
			return profile.name().trim();
		}
		if (StringUtils.hasText(profile.email())) {
			return profile.email().split("@")[0];
		}
		return "Google User";
	}

	private static String stringValue(Object value) {
		return value == null ? null : String.valueOf(value);
	}

	private record GoogleProfile(
			String sub,
			String email,
			boolean emailVerified,
			String name,
			String picture
	) {
	}
}
