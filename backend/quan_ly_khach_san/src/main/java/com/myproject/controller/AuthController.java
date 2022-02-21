package com.myproject.controller;

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

import com.myproject.payload.ApiResponse;
import com.myproject.payload.AuthResponse;
import com.myproject.payload.LoginRequest;
import com.myproject.payload.RegisterRequest;
import com.myproject.security.TokenProvider;
import com.myproject.service.IAuthServ;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private TokenProvider tokenPovider;
	
	@Autowired
	private IAuthServ authServ;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> doLogin(@RequestBody LoginRequest loginRequest) {
		
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				loginRequest.getEmail(), loginRequest.getPassword());
		
		Authentication authentication = authenticationManager.authenticate(authenticationToken);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String accessToken = tokenPovider.createToken(authentication);
		
		return ResponseEntity.ok().body(new AuthResponse(accessToken, "Bearer "));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> doRegister(@RequestBody RegisterRequest registerRequest) {
		authServ.doRegister(registerRequest);
		return ResponseEntity.ok().body(new ApiResponse(true, "Register Successfully"));
	}
	
}
