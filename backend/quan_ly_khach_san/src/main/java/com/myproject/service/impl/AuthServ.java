package com.myproject.service.impl;

import java.io.FileNotFoundException;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;
import com.myproject.entity.RoleEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.payload.LoginRequest;
import com.myproject.payload.RegisterRequest;
import com.myproject.repository.IAccountRepo;
import com.myproject.repository.IRoleRepo;
import com.myproject.security.TokenProvider;
import com.myproject.service.IAccountRoleServ;
import com.myproject.service.IAuthServ;
import com.myproject.service.IMailSenderServ;

import net.bytebuddy.utility.RandomString;

@Service
public class AuthServ implements IAuthServ {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private IAccountRepo accountRepo;
	
	@Autowired
	private IRoleRepo roleRepo;
	
	@Autowired
	private IAccountRoleServ accountRoleServ;
	
	@Autowired
	private IMailSenderServ mailSenderServ;

	@Transactional
	@Override
	public void doRegister(AppProperties appProperties, RegisterRequest registerRequest, String verifyURL) throws FileNotFoundException, MessagingException {
		// TODO Auto-generated method stub
		AccountEntity account = new AccountEntity();
		account.setId(RandomString.make(6));
		account.setName(registerRequest.getName());
		account.setEmail(registerRequest.getEmail());
		account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		account.setEnabled(false);
		account.setVerified(false);
		account.setAuthProvider(EAuthProvider.LOCAL);
		account.setAvatar(appProperties.getSystemConstant().getAvatarUrlDefault());
		account.setOtpCode(RandomString.make(64));
		
		AccountEntity accountNew = accountRepo.save(account);
		
		RoleEntity role = roleRepo.findByCode("MEMBER").get();
		
		String[] roles = {role.getId()};
		
		accountRoleServ.addRoleIntoAccount(accountNew.getId(), roles);
		
		mailSenderServ.sendFormVerifyAccount(appProperties, accountNew, verifyURL);
	}

	@Override
	public void doVerifyEmail(String verifyCode) {
		// TODO Auto-generated method stub
		AccountEntity account = accountRepo.findByOtpCode(verifyCode).get();
		account.setOtpCode(null);
		account.setEnabled(true);
		account.setVerified(true);
		
		accountRepo.save(account);
	}

	@Override
	public String doLogin(LoginRequest loginRequest, TokenProvider tokenPovider,
			AuthenticationManager authenticationManager) {
		// TODO Auto-generated method stub
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				loginRequest.getEmail(), loginRequest.getPassword());
		Authentication authentication = authenticationManager.authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	
		return tokenPovider.createToken(authentication);
	}
	
	
	
}
