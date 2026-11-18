package com.ecommerce.zentro.security;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "zentro.cors")
public record CorsProperties(List<String> allowedOrigins) {
}
