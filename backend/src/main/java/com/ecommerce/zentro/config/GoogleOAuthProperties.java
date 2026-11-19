package com.ecommerce.zentro.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "zentro.oauth.google")
public record GoogleOAuthProperties(
		String clientId,
		String clientSecret,
		String redirectUri
) {
}
