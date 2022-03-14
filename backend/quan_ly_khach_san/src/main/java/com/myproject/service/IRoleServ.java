package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.RoleEntity;

public interface IRoleServ {

//	----------------------------- SELECT -----------------------------
	
	public List<RoleEntity> findAll();
	
	public Optional<RoleEntity> findById(String id);
	
	public Page<RoleEntity> paged(int sizePage, int currentPage, String sortField, String sortDir, String keyword);
	
	public Optional<RoleEntity> findByCode(String code);
	
	public List<RoleEntity> findAllByCode(String code);
	
//	----------------------------- INSERT -----------------------------
	
	public RoleEntity save(RoleEntity role);
	
//	----------------------------- UPDATE -----------------------------
	
	public RoleEntity update(RoleEntity role);
	
//	----------------------------- DELETE -----------------------------
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
}
