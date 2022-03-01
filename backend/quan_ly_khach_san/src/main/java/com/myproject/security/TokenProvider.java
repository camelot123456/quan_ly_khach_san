package com.myproject.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.myproject.config.AppProperties;

@Component
public class TokenProvider {

	@Autowired
	private AppProperties appProperties;

	public String createToken(Authentication authentication) {
		
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		
		Algorithm algorithm = Algorithm.HMAC256(appProperties.getAuth().getTokenSecret().getBytes());

		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put("roles", userPrincipal.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList()));
		claims.put("id", userPrincipal.getId());
		claims.put("name", userPrincipal.getName());
		claims.put("email", userPrincipal.getEmail());
		claims.put("avatarUrl", userPrincipal.getAvatarUrl());
		
		return JWT.create()
				.withSubject(userPrincipal.getId())
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + appProperties.getAuth().getTokenExpirationMsec()))
				.withClaim("claims", claims)
				.sign(algorithm);

	}

}
