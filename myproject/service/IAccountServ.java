package com.myproject.service;

import java.util.Optional;

import com.myproject.entity.AccountEntity;
import com.myproject.payload.RegisterRequest;

public interface IAccountServ {

//	----------------------------- SELECT -----------------------------
	
	public Optional<AccountEntity> findByEmail(String email);
	
	public Optional<AccountEntity> findById(String id);
	
	
	
//	----------------------------- INSERT -----------------------------
	
	public AccountEntity doRegister(RegisterRequest registerRequest);
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
}
