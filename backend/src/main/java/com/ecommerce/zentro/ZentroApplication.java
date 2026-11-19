package com.ecommerce.zentro;

import com.ecommerce.zentro.config.GoogleOAuthProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(GoogleOAuthProperties.class)
public class ZentroApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZentroApplication.class, args);
	}

}
