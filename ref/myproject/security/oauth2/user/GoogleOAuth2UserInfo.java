package com.myproject.security.oauth2.user;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo{

	public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
		// TODO Auto-generated constructor stub
		super(attributes);
	}
	
	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return (String) attributes.get("sub");
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return (String) attributes.get("name");
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return (String) attributes.get("email");
	}

	@Override
	public String getImageUrl() {
		// TODO Auto-generated method stub
		return (String) attributes.get("picture");
	}

}
