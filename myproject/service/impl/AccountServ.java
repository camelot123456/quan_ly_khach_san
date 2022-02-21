package com.myproject.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.exception.BadRequestException;
import com.myproject.payload.RegisterRequest;
import com.myproject.repository.IAccountRepo;
import com.myproject.service.IAccountServ;

import net.bytebuddy.utility.RandomString;

@Service
public class AccountServ implements IAccountServ{

	@Autowired
	private IAccountRepo accountRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

//	----------------------------- SELECT -----------------------------
	
	@Override
	public Optional<AccountEntity> findById(String id) {
		// TODO Auto-generated method stub
		return accountRepo.findById(id);
	}

	@Override
	public Optional<AccountEntity> findByEmail(String email) {
		// TODO Auto-generated method stub
		return accountRepo.findByEmail(email);
	}

//	----------------------------- INSERT -----------------------------
	
	@Override
	public AccountEntity doRegister(RegisterRequest registerRequest) {
		// TODO Auto-generated method stub
		if (accountRepo.existsByEmail(registerRequest.getEmail())) {
			throw new BadRequestException("Email address already in use");
		}
		
		AccountEntity account = new AccountEntity();
		account.setId(RandomString.make(6));
		account.setEmail(registerRequest.getEmail());
		account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		account.setName(registerRequest.getName());
		account.setAuthProvider(EAuthProvider.LOCAL);
		account.setVerified(true);
		
		return accountRepo.save(account);
	}
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
}
