package com.myproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.AccountRoleEntity;
import com.myproject.entity.RoleEntity;
import com.myproject.repository.IAccountRepo;
import com.myproject.repository.IAccountRoleRepo;
import com.myproject.repository.IRoleRepo;
import com.myproject.service.IAccountRoleServ;

import net.bytebuddy.utility.RandomString;

@Service
public class AccountRoleServ implements IAccountRoleServ{

	@Autowired
	private IAccountRoleRepo accountRoleRepo;
	
	@Autowired
	private IAccountRepo accountRepo;
	
	@Autowired
	private IRoleRepo roleRepo;
	
//----------------------------- SELECT -----------------------------
	
	@Override
	public List<AccountRoleEntity> findAll() {
		// TODO Auto-generated method stub
		return accountRoleRepo.findAll();
	}

//----------------------------- INSERT -----------------------------

	@Override
	public void addRoleIntoAccount(String idAccount, String[] idRoles) {
		// TODO Auto-generated method stub
		AccountEntity account = accountRepo.findById(idAccount).get();
		for (String idRole : idRoles) {
			RoleEntity role = roleRepo.findById(idRole).get();
			AccountRoleEntity accountRole = new AccountRoleEntity(RandomString.make(6), account, role);
			accountRoleRepo.save(accountRole);
		}
	}
	
//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
