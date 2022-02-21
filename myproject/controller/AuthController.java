package com.myproject.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.myproject.entity.AccountEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.AuthResponse;
import com.myproject.payload.LoginRequest;
import com.myproject.payload.RegisterRequest;
import com.myproject.security.TokenProvider;
import com.myproject.service.IAccountServ;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private IAccountServ accountServ;

	@PostMapping("/login")
	public ResponseEntity<?> doLogin(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getEmail(), 
						loginRequest.getPassword()
					));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String accessToken = tokenProvider.createToken(authentication);
		return ResponseEntity.ok(new AuthResponse(accessToken, "Bearer "));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> doRegister(@RequestBody RegisterRequest registerRequest) {
		AccountEntity account = accountServ.doRegister(registerRequest);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/user/me")
				.buildAndExpand(account.getId())
				.toUri();
		
		return ResponseEntity.created(location)
				.body(new ApiResponse(true, "User registered successfully@"));
	}
	
}
