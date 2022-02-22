package com.myproject.service;

import java.io.FileNotFoundException;

import javax.mail.MessagingException;

import org.springframework.security.authentication.AuthenticationManager;

import com.myproject.config.AppProperties;
import com.myproject.payload.LoginRequest;
import com.myproject.payload.RegisterRequest;
import com.myproject.security.TokenProvider;

public interface IAuthServ {

	public void doRegister(AppProperties appProperties, RegisterRequest registerRequest, String verifyURL) throws FileNotFoundException, MessagingException;
	
	public void doVerifyEmail(String verifyCode);
	
	public String doLogin(LoginRequest loginRequest, TokenProvider tokenPovider, AuthenticationManager authenticationManager);
	
}
