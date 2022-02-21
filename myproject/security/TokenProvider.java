package com.myproject.security;

import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.myproject.config.AppProperties;

@Component
public class TokenProvider {
	
	@Autowired
	private AppProperties appProperties;

	public String createToken(Authentication authentication) {
		AccountPrincipal accountPrincipal = (AccountPrincipal) authentication.getPrincipal();

		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
		
		Algorithm algorithm = Algorithm.HMAC256(appProperties.getAuth().getTokenSecret().getBytes());

		String accessToken = JWT.create()
				.withSubject(accountPrincipal.getId())
				.withIssuedAt(new Date())
				.withExpiresAt(expiryDate)
				.withClaim("roles", accountPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
				
		return accessToken;
	}

	public String getUserIdFromToken(String accessToken) {
		DecodedJWT jwt = JWT.decode(accessToken);
		return jwt.getSubject();
	}

}
