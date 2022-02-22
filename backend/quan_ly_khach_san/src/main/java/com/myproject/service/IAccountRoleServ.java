package com.myproject.service;

import java.util.List;

import com.myproject.entity.AccountRoleEntity;

public interface IAccountRoleServ {

//----------------------------- SELECT -----------------------------

	public List<AccountRoleEntity> findAll();
	
//----------------------------- INSERT -----------------------------

	public void addRoleIntoAccount(String idAccount, String[] idRoles);
	

//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
