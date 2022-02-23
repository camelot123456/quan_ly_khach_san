package com.myproject.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.myproject.config.AppProperties;

public class CustomJwtAuthorizationFilter extends OncePerRequestFilter{
	
	@Autowired
	private AppProperties appProperties;
	
	@Autowired
	private CustomUserDetailService customUserDetailService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		if (request.getRequestURI().equals("/auth/login")) {
			filterChain.doFilter(request, response);
		} else {
			String authorizationHeader = request.getHeader("Authorization");
			if (authorizationHeader.startsWith("Bearer ")) {
				
				String accessToken = authorizationHeader.substring("Bearer ".length());
				
				Algorithm algorithm = Algorithm.HMAC256(appProperties.getAuth().getTokenSecret().getBytes());
				JWTVerifier verifier = JWT.require(algorithm).build();
				DecodedJWT jwt = verifier.verify(accessToken);
				
				UserDetails userDetails = customUserDetailService.loadUserById(jwt.getSubject());
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				authenticationToken.setDetails(userDetails);
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				
				filterChain.doFilter(request, response);
			} else {
				filterChain.doFilter(request, response);
			}
		}
	}

}
