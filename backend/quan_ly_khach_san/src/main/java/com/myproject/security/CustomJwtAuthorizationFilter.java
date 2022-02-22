package com.myproject.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.myproject.config.AppProperties;

public class CustomJwtAuthorizationFilter extends OncePerRequestFilter{
	
	@Autowired
	private AppProperties appProperties;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		if (request.getRequestURI().equals("/auth/login") || request.getRequestURI().equals("/auth/logout") || request.getRequestURI().equals("/auth/register")) {
			filterChain.doFilter(request, response);
		} else {
			if (request.getHeader("Authorization").startsWith("Bearer ") || request.getHeader("Authorization") != null) {
				String accessToken = request.getHeader("Authorization").substring("Bearer ".length());
				
				Algorithm algorithm = Algorithm.HMAC256(appProperties.getAuth().getTokenSecret().getBytes());
				
				JWTVerifier verifier = JWT.require(algorithm).build();
				DecodedJWT jwt = verifier.verify(accessToken);
				
				String email = jwt.getSubject();
				String[] roles = jwt.getClaim("roles").asArray(String.class);
				List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
				for (String role : roles) {
					authorities.add(new SimpleGrantedAuthority(role));
				}
				
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
				filterChain.doFilter(request, response);
			} else {
				filterChain.doFilter(request, response);
			}
		}
	}

}
