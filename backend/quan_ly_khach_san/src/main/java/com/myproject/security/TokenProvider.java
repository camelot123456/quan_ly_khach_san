package com.myproject.security;

import java.util.Date;
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
		
		Algorithm algorithm = Algorithm.HMAC256(appProperties.getAuth().getTokenSecret().getBytes());

		return JWT.create()
				.withSubject(authentication.getName())
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + appProperties.getAuth().getTokenExpirationMsec()))
				.withClaim("roles", authentication.getAuthorities().stream()
						.map(GrantedAuthority::getAuthority)
						.collect(Collectors.toList()))
				.sign(algorithm);

	}

}
