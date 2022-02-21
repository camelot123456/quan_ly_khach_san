package com.myproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproject.entity.AccountEntity;
import com.myproject.payload.RegisterRequest;

public interface IAccountRepo extends JpaRepository<AccountEntity, String>{

//	----------------------------- SELECT -----------------------------
	
	public Optional<AccountEntity> findByEmail(String email);
	
	public Optional<AccountEntity> findById(String id);
	
	public Boolean existsByEmail(String email);
	
//	----------------------------- INSERT -----------------------------
	
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
	
}
