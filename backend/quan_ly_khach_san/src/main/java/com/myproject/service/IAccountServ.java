package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.AccountEntity;
import com.myproject.payload.account.AccountRoleUpdatePayload;

public interface IAccountServ {

//	----------------------------- SELECT -----------------------------

	public List<AccountEntity> findAll();
	
	public Optional<AccountEntity> findByOtpCode(String otpCode);

	public Optional<AccountEntity> findById(String id);
	
	public Optional<AccountEntity> findByIdEmailPhoneNum(String keyword);

	public Page<AccountEntity> paged(Boolean veryfied, Boolean enabled, int sizePage, int currentPage, String sortField, String sortDir, String keyword);

	public Page<AccountEntity> pagedCustomerNoAccount(int sizePage, int currentPage, String sortField, String sortDir, String keyword);
	
	public Page<AccountEntity> pagedCustomerAccount(int sizePage, int currentPage, String sortField, String sortDir, String keyword);
	
	public Page<AccountEntity> pagedInternal(int sizePage, int currentPage, String sortField, String sortDir, String keyword);
	
	public Page<AccountEntity> pagedByType(String type, int sizePage, int currentPage, String sortField, String sortDir,
			String keyword);
	
//	----------------------------- INSERT -----------------------------

	public AccountEntity save(AccountEntity account);
	
	public AccountEntity create(AccountEntity account);

//	----------------------------- UPDATE -----------------------------

	public AccountEntity update(AccountRoleUpdatePayload account);
	
	public AccountEntity updateWithRole(AccountEntity account, String[] idsRole);

//	----------------------------- DELETE -----------------------------

	public void deleteById(String id);

	public void deleteMany(String[] ids);

}
