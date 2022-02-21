package com.myproject.security.oauth2.user;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public abstract class OAuth2UserInfo {

	protected Map<String, Object> attributes;
	
	public abstract String getId();
	
	public abstract String getName();
	
	public abstract String getEmail();
	
	public abstract String getImageUrl();
	
}
