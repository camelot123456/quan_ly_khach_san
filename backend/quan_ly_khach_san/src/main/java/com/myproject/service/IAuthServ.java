package com.myproject.service;

import java.util.Optional;

import com.myproject.entity.AccountEntity;
import com.myproject.payload.RegisterRequest;

public interface IAuthServ {

	public Optional<AccountEntity> doRegister(RegisterRequest registerRequest);
	
}
