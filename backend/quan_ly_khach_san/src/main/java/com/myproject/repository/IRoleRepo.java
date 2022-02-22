package com.myproject.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.RoleEntity;

public interface IRoleRepo extends JpaRepository<RoleEntity, String>{

//	----------------------------- SELECT -----------------------------
	
	@Query(countName = "select count(*) from roles",
			value = "select * from roles",
			nativeQuery = true)
	public Page<RoleEntity> pagedNoKeyword(Pageable pageable);
	
	@Query(value = "select * from roles r "
			+ "where r.id like %?1% "
			+ "or r.name like %?1% "
			+ "or r.code like %?1%",
			nativeQuery = true)
	public Page<RoleEntity> pagedByKeyword(String keyword, Pageable pageable);
	
	public Optional<RoleEntity> findByCode(String code);
	
//	----------------------------- INSERT -----------------------------
	
//	----------------------------- UPDATE -----------------------------
	
//	----------------------------- DELETE -----------------------------
	
}

//----------------------------- SELECT -----------------------------

//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
