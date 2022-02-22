package com.myproject.security.oauth2;

import java.util.Map;

public class FacebookOAuth2UserInfo extends OAuth2UserInfo{

	public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return (String) attributes.get("id");
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return (String) attributes.get("name");
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getAvatarUrl() {
		// TODO Auto-generated method stub
		if (attributes.containsKey("picture")) {
			Map<String, Object> pictures = (Map<String, Object>) attributes.get("picture");
			if (pictures.containsKey("data")) {
				Map<String, Object> datas = (Map<String, Object>) attributes.get("data");
				if (datas.containsKey("url")) {
					return (String) attributes.get("url");
				}
			}
		}
		return null;
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return (String) attributes.get("email");
	}

}
