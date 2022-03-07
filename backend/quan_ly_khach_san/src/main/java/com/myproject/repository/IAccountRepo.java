package com.myproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.AccountEntity;

public interface IAccountRepo extends JpaRepository<AccountEntity, String>{

//	----------------------------- SELECT -----------------------------
	
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
	
	@Query(value = "select a.id as id_a, a.name as name_a, a.phone_num, a.[address], a.avatar, a.email, t.id as id_transaction "
			+ "from accounts a inner join transactions t "
			+ "on t.id_account = a.id "
			+ "where t.id=?1",
			nativeQuery = true)
	public List<Object[]> findByIdTransaction(String idTransaction);
	
	@Query(value = "select a.id, a.name, a.avatar, a.email, a.[address], a.phone_num "
			+ "from accounts a "
			+ "where (a.id = ?1 or a.email = ?1 or a.phone_num = ?1)  "
			+ "and a.[enabled] = 1 and a.verified = 1 ",
			nativeQuery = true)
	public List<Object[]> findByIdEmailPhoneNum(String keyword);
	
	public Optional<AccountEntity> findByEmail(String email);
	
	public Optional<AccountEntity> findByOtpCode(String otpCode);
	
	public Boolean existsByEmail(String email);
	
//	----------------------------- INSERT -----------------------------
	
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
	
}
