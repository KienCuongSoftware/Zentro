package com.ecommerce.zentro.security;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "zentro.jwt")
public record JwtProperties(
		String secret,
		String issuer,
		Duration accessTokenTtl
) {
}
