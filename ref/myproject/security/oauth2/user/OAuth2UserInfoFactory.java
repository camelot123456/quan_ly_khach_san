package com.myproject.security.oauth2.user;

import java.util.Map;

import com.myproject.entity.enums.EAuthProvider;
import com.myproject.exception.OAuth2AuthenticationProcessingException;

public class OAuth2UserInfoFactory {

	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
		if (registrationId.equalsIgnoreCase(EAuthProvider.GOOGLE.toString())) {
			return new GoogleOAuth2UserInfo(attributes);
		}
		if (registrationId.contentEquals(EAuthProvider.FACEBOOK.toString())) {
			return new FacebookOAuth2UserInfo(attributes);
		}else {
			throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + "is not supported yet.");
		}
	}
	
}
