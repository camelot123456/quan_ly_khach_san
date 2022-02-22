package com.myproject.security.oauth2;

import java.util.Map;

public abstract class OAuth2UserInfo {

	protected Map<String, Object> attributes;
	
	public OAuth2UserInfo(Map<String, Object> attributes) {
		// TODO Auto-generated constructor stub
		this.attributes = attributes;
	}
	
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	
	public abstract String getId();
	
	public abstract String getName();
	
	public abstract String getAvatarUrl();
	
	public abstract String getEmail();
	
}
