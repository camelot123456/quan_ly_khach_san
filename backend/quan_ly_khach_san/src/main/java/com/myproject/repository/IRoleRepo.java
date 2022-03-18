package com.myproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.RoleEntity;

public interface IRoleRepo extends JpaRepository<RoleEntity, String>{

//	----------------------------- SELECT -----------------------------
	
	@Query(value = "select * from roles r "
			+ "where r.id like %?1% "
			+ "or r.name like %?1% "
			+ "or r.code like %?1%",
			nativeQuery = true)
	public Page<RoleEntity> pagedByKeyword(String keyword, Pageable pageable);
	
	public Optional<RoleEntity> findByCode(String code);
	
	@Query(value = "select * from roles r "
			+ "where r.id like %?1% "
			+ "or r.name like %?1% "
			+ "or r.code like %?1% "
			+ "order by r.modified_at desc",
			nativeQuery = true)
	public List<RoleEntity> findAllByCode(String code);

	@Query(value = "select r.* "
			+ "from roles r inner join account_role ar "
			+ "on r.id = ar.id_role inner join accounts a "
			+ "on a.id = ar.id_account "
			+ "where a.id = ?1",
			nativeQuery = true)
	public List<RoleEntity> findAllByIdAccount(String idAccount);
	
//	----------------------------- INSERT -----------------------------
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
}

//----------------------------- SELECT -----------------------------

//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
