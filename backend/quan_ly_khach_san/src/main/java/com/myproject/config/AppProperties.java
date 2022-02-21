package com.myproject.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "app")
@Getter
public class AppProperties {
	
	private final Auth Auth = new Auth();
	private final OAuth2 OAuth2 = new OAuth2();

	@Getter
	@Setter
	public static final class Auth {
		private String tokenSecret;
		private long tokenExpirationMsec;
	}
	
	@Getter
	public static final class OAuth2 {
		private List<String> authorizedRedirectUris = new ArrayList<String>();
		
		public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
			this.authorizedRedirectUris = authorizedRedirectUris;
			return this;
		}
	}
	
}
