package com.myproject.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.enums.EAuthProvider;
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
	public Page<AccountEntity> paged(Boolean veryfied, Boolean enabled, int sizePage, int currentPage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		keyword = keyword == null ? "" : keyword;
		return accountRepo.pagedByKeyword(veryfied, enabled, keyword, pageRequest);
	}
	
	@Override
	public Optional<AccountEntity> findByOtpCode(String otpCode) {
		return accountRepo.findByOtpCode(otpCode);
	}
	
	@Override
	public Optional<AccountEntity> findByIdEmailPhoneNum(String keyword) {
		Object[] records = accountRepo.findByIdEmailPhoneNum(keyword).get(0);
		AccountEntity accountEntity = new AccountEntity();
		accountEntity.setId((String) records[0]);
		accountEntity.setName((String) records[1]);
		accountEntity.setAvatar((String) records[2]);
		accountEntity.setEmail((String) records[3]);
		accountEntity.setAddress((String) records[4]);
		accountEntity.setPhoneNum((String) records[5]);
		return Optional.of(accountEntity);
	}
	
	@Override
	public Page<AccountEntity> pagedCustomerNoAccount(int sizePage, int currentPage, String sortField, String sortDir,
			String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> accounts = accountRepo.findAllCustomerNoAccount(keyword);
		List<AccountEntity> accountArrNew = null;
		if (accounts.size() > 0) {
			accountArrNew = new ArrayList<AccountEntity>();
			for (Object[] record : accounts) {
				AccountEntity a = new AccountEntity();
				a.setId((String) record[0]);
				a.setAddress((String) record[1]);
				a.setAuthProvider(EAuthProvider.valueOf((String) record[2]));
				a.setAvatar((String) record[3]);
				a.setCreatedAt((Date) record[4]);
				a.setCreatedBy((String) record[5]);
				a.setEmail((String) record[6]);
				a.setEnabled((Boolean) record[7]);
				a.setModifiedAt((Date) record[8]);
				a.setModifiedBy((String) record[9]);
				a.setName((String) record[10]);
				a.setPhoneNum((String) record[13]);
				a.setVerified((Boolean) record[14]);
				accountArrNew.add(a);
			}
		}
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		return new PageImpl<AccountEntity>(accountArrNew, pageRequest, accountArrNew.size());
	}

	@Override
	public Page<AccountEntity> pagedCustomerAccount(int sizePage, int currentPage, String sortField, String sortDir,
			String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> accounts = accountRepo.findAllCustomerAccount(keyword);
		List<AccountEntity> accountArrNew = null;
		if (accounts.size() > 0) {
			accountArrNew = new ArrayList<AccountEntity>();
			for (Object[] record : accounts) {
				AccountEntity a = new AccountEntity();
				a.setId((String) record[0]);
				a.setAddress((String) record[1]);
				a.setAuthProvider(EAuthProvider.valueOf((String) record[2]));
				a.setAvatar((String) record[3]);
				a.setCreatedAt((Date) record[4]);
				a.setCreatedBy((String) record[5]);
				a.setEmail((String) record[6]);
				a.setEnabled((Boolean) record[7]);
				a.setModifiedAt((Date) record[8]);
				a.setModifiedBy((String) record[9]);
				a.setName((String) record[10]);
				a.setPhoneNum((String) record[13]);
				a.setVerified((Boolean) record[14]);
				accountArrNew.add(a);
			}
		}
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		return new PageImpl<AccountEntity>(accountArrNew, pageRequest, accountArrNew.size());
	}

	@Override
	public Page<AccountEntity> pagedInternal(int sizePage, int currentPage, String sortField, String sortDir,
			String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> accounts = accountRepo.findAllInternal(keyword);
		List<AccountEntity> accountArrNew = null;
		if (accounts.size() > 0) {
			accountArrNew = new ArrayList<AccountEntity>();
			for (Object[] record : accounts) {
				AccountEntity a = new AccountEntity();
				a.setId((String) record[0]);
				a.setAddress((String) record[1]);
				a.setAuthProvider(EAuthProvider.valueOf((String) record[2]));
				a.setAvatar((String) record[3]);
				a.setCreatedAt((Date) record[4]);
				a.setCreatedBy((String) record[5]);
				a.setEmail((String) record[6]);
				a.setEnabled((Boolean) record[7]);
				a.setModifiedAt((Date) record[8]);
				a.setModifiedBy((String) record[9]);
				a.setName((String) record[10]);
				a.setPhoneNum((String) record[13]);
				a.setVerified((Boolean) record[14]);
				accountArrNew.add(a);
			}
		}
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		return new PageImpl<AccountEntity>(accountArrNew, pageRequest, accountArrNew.size());
	}
	
	@Override
	public Page<AccountEntity> pagedByType(String type, int sizePage, int currentPage, String sortField, String sortDir,
			String keyword) {
		if (type.equals("customer_no_account")) {
			return pagedCustomerNoAccount(sizePage, currentPage, sortField, sortDir, keyword);
		} else if (type.equals("customer_account")) {
			return pagedCustomerAccount(sizePage, currentPage, sortField, sortDir, keyword);
		} else if (type.equals("customer_account")) {
			return pagedInternal(sizePage, currentPage, sortField, sortDir, keyword);
		}
		return null;
	}	

//----------------------------- INSERT -----------------------------
	
	@Override
	public AccountEntity save(AccountEntity account) {
		// TODO Auto-generated method stub
		if (!accountRepo.existsById(account.getId())) {
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
