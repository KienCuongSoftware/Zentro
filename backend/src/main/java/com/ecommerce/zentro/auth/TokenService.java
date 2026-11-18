package com.ecommerce.zentro.auth;

import com.ecommerce.zentro.security.JwtProperties;
import com.ecommerce.zentro.security.UserPrincipal;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

	private final JwtEncoder jwtEncoder;
	private final JwtProperties jwtProperties;

	public String createAccessToken(Authentication authentication) {
		Instant now = Instant.now();
		Instant expiresAt = now.plus(jwtProperties.accessTokenTtl());

		List<String> roles = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.filter(authority -> authority.startsWith("ROLE_"))
				.map(authority -> authority.substring("ROLE_".length()))
				.toList();

		JwtClaimsSet.Builder claims = JwtClaimsSet.builder()
				.issuer(jwtProperties.issuer())
				.issuedAt(now)
				.expiresAt(expiresAt)
				.subject(authentication.getName())
				.claim("roles", roles);

		if (authentication.getPrincipal() instanceof UserPrincipal principal) {
			claims.claim("uid", principal.getId());
			claims.claim("name", principal.getFullName());
		}

		JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
		return jwtEncoder.encode(JwtEncoderParameters.from(header, claims.build())).getTokenValue();
	}

	public long expiresInSeconds() {
		return jwtProperties.accessTokenTtl().toSeconds();
	}
}
