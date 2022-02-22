package com.myproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.RoleEntity;
import com.myproject.repository.IRoleRepo;
import com.myproject.service.IRoleServ;

@Service
public class RoleServ implements IRoleServ{

	@Autowired
	private IRoleRepo roleRepo;
	
//----------------------------- SELECT -----------------------------
	
	@Override
	public List<RoleEntity> findAll() {
		// TODO Auto-generated method stub
		return roleRepo.findAll();
	}
	
	@Override
	public Optional<RoleEntity> findById(String id) {
		// TODO Auto-generated method stub
		return roleRepo.findById(id);
	}

	@Override
	public Page<RoleEntity> paged(int sizePage, int currentPage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		if (keyword == "" || keyword == null) {
			return roleRepo.pagedNoKeyword(pageRequest);
		}
		return roleRepo.pagedByKeyword(keyword, pageRequest);
	}
	

	@Override
	public Optional<RoleEntity> findByCode(String code) {
		// TODO Auto-generated method stub
		return roleRepo.findByCode(code);
	}

//----------------------------- INSERT -----------------------------
	
	@Override
	public RoleEntity save(RoleEntity role) {
		// TODO Auto-generated method stub
		if (!roleRepo.existsById(role.getId())) {
			return roleRepo.save(role);
		}
		return null;
	}

//----------------------------- UPDATE -----------------------------
	
	@Override
	public RoleEntity update(RoleEntity role) {
		// TODO Auto-generated method stub
		if (roleRepo.existsById(role.getId())) {
			return roleRepo.save(role);
		}
		return null;
	}
	
//----------------------------- DELETE -----------------------------

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		roleRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			roleRepo.deleteById(id);
		}
	}

}
