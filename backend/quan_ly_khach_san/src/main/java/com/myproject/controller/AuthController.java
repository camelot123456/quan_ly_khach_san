package com.myproject.controller;

import java.io.FileNotFoundException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.config.AppProperties;
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
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/register")
	public ResponseEntity<?> doVerifyEmail(@Param("otpCode") String otpCode) {
		authServ.doVerifyEmail(otpCode);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> doLogin(@RequestBody LoginRequest loginRequest) {
		String accessToken = authServ.doLogin(loginRequest, tokenPovider, authenticationManager);
		return ResponseEntity.ok().body(new AuthResponse(accessToken, "Bearer "));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> doRegister(@RequestBody RegisterRequest registerRequest, HttpServletRequest request) throws FileNotFoundException, MessagingException {
		String domainNameServer = request.getRequestURL().toString();
		authServ.doRegister(appProperties, registerRequest, domainNameServer);
		return ResponseEntity.ok().body(new ApiResponse(true, "Register Successfully"));
	}
	
	
	
}
