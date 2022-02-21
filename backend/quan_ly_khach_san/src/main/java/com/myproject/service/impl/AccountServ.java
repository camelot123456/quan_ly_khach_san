package com.myproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.repository.IAccountRepo;
import com.myproject.service.IAccountServ;

@Service
public class AccountServ implements IAccountServ{

	@Autowired
	private IAccountRepo accountRepo;

//----------------------------- SELECT -----------------------------	
	
	@Override
	public List<AccountEntity> findAll() {
		// TODO Auto-generated method stub
		return accountRepo.findAll();
	}

	@Override
	public Optional<AccountEntity> findById(String id) {
		// TODO Auto-generated method stub
		return accountRepo.findById(id);
	}

	@Override
	public Page<AccountEntity> paged(Boolean deleted, Boolean veryfied, Boolean enabled, int sizePage, int currentPage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		if (keyword == "" || keyword == null) {
			return accountRepo.pagedNoKeyword(deleted, veryfied, enabled, pageRequest);
		}
		return accountRepo.pagedByKeyword(deleted, veryfied, enabled, keyword, pageRequest);
	}

//----------------------------- INSERT -----------------------------
	
	@Override
	public AccountEntity save(AccountEntity account) {
		// TODO Auto-generated method stub
		if (!accountRepo.existsById(account.getId())) {
			account.setDeleted(false);
			account.setEnabled(true);
			account.setVerified(true);
			return accountRepo.save(account);
		}
		return null;
	}

//----------------------------- UPDATE -----------------------------
	
	@Override
	public AccountEntity update(AccountEntity account) {
		// TODO Auto-generated method stub
		if (accountRepo.existsById(account.getId())) {
			account.setDeleted(false);
			account.setEnabled(true);
			account.setVerified(true);
			return accountRepo.save(account);
		}
		return null;
	}

//----------------------------- DELETE -----------------------------
	
	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		accountRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			accountRepo.deleteById(id);
		}
	}
	
	



	
}
