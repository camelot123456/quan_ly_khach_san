package com.myproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringMcvConfig implements WebMvcConfigurer{

	private final long MAX_LONG_SECS = 3600l;
	
	@Value(value = "${app.cors.allowedOrigins}")
	private String[] allowedOrigins;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		registry.addMapping("/**")
		.allowedOrigins(allowedOrigins)
		.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
		.allowCredentials(true)
		.allowedHeaders("*")
		.maxAge(MAX_LONG_SECS);
	}
	
}
