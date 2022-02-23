package com.myproject.security.oauth2;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.myproject.config.AppProperties;
import com.myproject.exception.BadRequestException;
import com.myproject.security.TokenProvider;
import com.myproject.util.CookieUtil;

import lombok.extern.slf4j.Slf4j;

import static com.myproject.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.*;

@Slf4j
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private AppProperties appProperties;
	
	@Autowired
	private HttpCookieOAuth2AuthorizationRequestRepository auth2AuthorizationRequestRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO Auto-generated method stub
		String targetUrl = determineTargetUrl(request, response, authentication);

		if (response.isCommitted()) {
			log.debug("Response has already been committed. Unable to redirect to {}", targetUrl);
			return;
		}

		clearAuthenticationAttributes(request, response);
		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

	private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		super.clearAuthenticationAttributes(request);
		auth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
	}

	@Override
	protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) {
		// TODO Auto-generated method stub
		Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
				.map(Cookie::getValue);
		
		if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
			throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
		}
		
		String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
		
		String accessToken = tokenProvider.createToken(authentication);
		
		return UriComponentsBuilder.fromUriString(targetUrl)
				.queryParam("token", accessToken)
				.build().toUriString();
	}

	private boolean isAuthorizedRedirectUri(String uri) {
		// TODO Auto-generated method stub
		URI clientRedirectUri = URI.create(uri);
		
		return appProperties.getOAuth2().getAuthorizedRedirectUris()
				.stream()
				.anyMatch(authorizaedRedirectUri -> {
					URI authorizeURI = URI.create(authorizaedRedirectUri);
					if (authorizeURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
							&& authorizeURI.getPort() == clientRedirectUri.getPort()) {
						return true;
					}
					return false;
				});
	}

}
