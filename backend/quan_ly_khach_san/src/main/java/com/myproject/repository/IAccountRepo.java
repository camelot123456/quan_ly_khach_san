package com.myproject.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.AccountEntity;

public interface IAccountRepo extends JpaRepository<AccountEntity, String>{

//	----------------------------- SELECT -----------------------------
	@Query(countQuery = "select count(*) "
		+ "from accounts a "
		+ "where a.verified = ?1 and a.[enabled] = ?2",
		value = "select * "
		+ "from accounts a "
		+ "where a.verified = ?1 and a.[enabled] = ?2",
		nativeQuery = true)
	public Page<AccountEntity> pagedNoKeyword(Boolean veryfied, Boolean enabled, Pageable pageable);
	
	@Query(value = "select * "
			+ "from accounts a "
			+ "where a.verified = ?1 and a.[enabled] = ?2 "
			+ "and a.id like %?3% "
			+ "or a.[address] like %?3% "
			+ "or a.auth_provider like %?3% "
			+ "or a.email like %?3% "
			+ "or a.name like %?3% "
			+ "or a.phone_num like %?3%",
			nativeQuery = true)
	public Page<AccountEntity> pagedByKeyword(Boolean veryfied, Boolean enabled, String keyword, Pageable pageable);
	
	public Optional<AccountEntity> findByEmail(String email);
	
	public Optional<AccountEntity> findByOtpCode(String otpCode);
	
	public Boolean existsByEmail(String email);
	
//	----------------------------- INSERT -----------------------------
	
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
	
}
