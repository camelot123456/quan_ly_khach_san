package com.myproject.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.payload.RegisterRequest;
import com.myproject.repository.IAccountRepo;
import com.myproject.service.IAuthServ;

import net.bytebuddy.utility.RandomString;

@Service
public class AuthServ implements IAuthServ {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private IAccountRepo accountRepo;

	@Override
	public Optional<AccountEntity> doRegister(RegisterRequest registerRequest) {
		// TODO Auto-generated method stub
		AccountEntity account = new AccountEntity();
		account.setId(RandomString.make(6));
		account.setName(registerRequest.getName());
		account.setEmail(registerRequest.getEmail());
		account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		account.setDeleted(false);
		account.setEnabled(true);
		account.setVerified(true);
		account.setAuthProvider(EAuthProvider.LOCAL);
		return Optional.of(accountRepo.save(account));
	}
	
	
	
}
