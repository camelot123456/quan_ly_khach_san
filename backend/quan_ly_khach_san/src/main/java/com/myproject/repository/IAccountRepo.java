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
			+ "or a.phone_num like %?3% "
			+ "order by a.modified_at desc" ,
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
	
	@Query(value = "select distinct a.* "
			+ "from accounts a left join account_role ar "
			+ "on a.id = ar.id_account left join roles r "
			+ "on ar.id_role = r.id "
			+ "where a.auth_provider = 'NO_ACCOUNT' "
			+ "and (a.id like %?1% "
			+ "or a.[address] like %?1% "
			+ "or a.auth_provider like %?1% "
			+ "or a.email like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1%) "
			+ "order by a.modified_at desc",
			nativeQuery = true)
	public List<Object[]> findAllCustomerNoAccount(String keyword);
	
	@Query(value = "select distinct a.* "
			+ "from accounts a inner join account_role ar "
			+ "on a.id = ar.id_account inner join roles r "
			+ "on ar.id_role = r.id "
			+ "where a.auth_provider in ('LOCAL', 'GOOGLE', 'FACEBOOK') and r.code = 'MEMBER' "
			+ "and (a.id like %?1% "
			+ "or a.[address] like %?1% "
			+ "or a.auth_provider like %?1% "
			+ "or a.email like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1%) "
			+ "order by a.modified_at desc",
			nativeQuery = true)
	public List<Object[]> findAllCustomerAccount(String keyword);
	
	@Query(value = "select distinct a.* "
			+ "from accounts a left join account_role ar "
			+ "on a.id = ar.id_account left join roles r "
			+ "on ar.id_role = r.id "
			+ "where a.auth_provider = 'LOCAL' and r.code in ('DIRECTOR', 'RECEPTIONIST', 'ACCOUNTANT', 'BUSINESS') "
			+ "and (a.id like %?1% "
			+ "or a.[address] like %?1% "
			+ "or a.auth_provider like %?1% "
			+ "or a.email like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1%) "
			+ "order by a.modified_at desc",
			nativeQuery = true)
	public List<Object[]> findAllInternal(String keyword);
	
	@Query(value = "select distinct a.* "
			+ "from accounts a left join account_role ar "
			+ "on a.id = ar.id_account left join roles r "
			+ "on ar.id_role = r.id "
			+ "where a.id like %?1% "
			+ "or a.[address] like %?1% "
			+ "or a.auth_provider like %?1% "
			+ "or a.email like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1% "
			+ "order by a.modified_at desc",
			nativeQuery = true)
	public List<Object[]> findAll(String keyword);
	
//	----------------------------- INSERT -----------------------------
	
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
	
}
