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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;
import com.myproject.entity.AccountRoleEntity;
import com.myproject.entity.ReservationEntity;
import com.myproject.entity.ReservationRoomEntity;
import com.myproject.entity.ReservationServiceEntity;
import com.myproject.entity.TransactionEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.payload.account.AccountRoleUpdatePayload;
import com.myproject.repository.IAccountRepo;
import com.myproject.repository.IAccountRoleRepo;
import com.myproject.repository.IReservationRepo;
import com.myproject.repository.IReservationRoomRepo;
import com.myproject.repository.IReservationServiceRepo;
import com.myproject.repository.IRoleRepo;
import com.myproject.repository.ITransactionRepo;
import com.myproject.service.IAccountServ;

import net.bytebuddy.utility.RandomString;

@Service
public class AccountServ implements IAccountServ{

	@Autowired
	private IAccountRepo accountRepo;
	
	@Autowired
	private IAccountRoleRepo accountRoleRepo;
	
	@Autowired
	private IRoleRepo roleRepo;
	
	@Autowired
	private AppProperties appProperties;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private IReservationRepo  reservationRepo;
	
	@Autowired
	private ITransactionRepo transactionRepo;
	
	@Autowired
	private IReservationRoomRepo reservationRoomRepo;
	
	@Autowired
	private IReservationServiceRepo reservationServiceRepo;
//----------------------------- SELECT -----------------------------	
	
	@Override
	public Page<AccountEntity> findAll(int sizePage, int currentPage, String sortField, String sortDir,
			String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> accounts = accountRepo.findAll(keyword);
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
				a.setRoles(roleRepo.findAllByIdAccount(a.getId()));
//				roleRepo.findAllByIdAccount(a.getId()).stream().forEach(s -> System.out.println(s.getName()));
				accountArrNew.add(a);
			}
		}
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		return new PageImpl<AccountEntity>(accountArrNew, pageRequest, accountArrNew.size());
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
				a.setRoles(roleRepo.findAllByIdAccount(a.getId()));
//				roleRepo.findAllByIdAccount(a.getId()).stream().forEach(s -> System.out.println(s.getName()));
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
				a.setRoles(roleRepo.findAllByIdAccount(a.getId()));
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
				a.setRoles(roleRepo.findAllByIdAccount(a.getId()));
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
		} else if (type.equals("internal_account")) {
			return pagedInternal(sizePage, currentPage, sortField, sortDir, keyword);
		}
		return findAll(sizePage, currentPage, sortField, sortDir, keyword);
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
	


	@Override
	public AccountEntity create(AccountEntity account) {
		// TODO Auto-generated method stub
		String id = "";
		do {
			id = RandomString.make(10);
		} while (accountRepo.existsById(id));
		AccountEntity acc = new AccountEntity();
		
		acc.setId(id);
		acc.setName(account.getName());
		acc.setAddress(account.getAddress());
		acc.setAuthProvider(EAuthProvider.LOCAL);
		acc.setAvatar(appProperties.getSystemConstant().getAvatarUrlDefault());
		acc.setEmail(account.getEmail());
		acc.setEnabled(true);
		acc.setPassword(passwordEncoder.encode(account.getPassword()));
		acc.setPhoneNum(account.getPhoneNum());
		acc.setVerified(true);
		
		AccountEntity accountNew = accountRepo.save(acc);
		
		
		AccountRoleEntity accountRole = new AccountRoleEntity();
		String idAr = "";
		do {
			idAr = RandomString.make(10);
		} while (accountRepo.existsById(idAr));
		
		accountRole.setId(idAr);
		accountRole.setAccount(accountNew);
		accountRole.setRole(roleRepo.findByCode("MEMBER").get());
		accountRoleRepo.save(accountRole);
		return accountNew;
	}

//----------------------------- UPDATE -----------------------------
	
	@Transactional
	@Override
	public AccountEntity update(AccountRoleUpdatePayload account) {
		// TODO Auto-generated method stub
		if (accountRepo.existsById(account.getId())) {
			AccountEntity accountOld = accountRepo.findById(account.getId()).get();
			accountOld.setName(account.getName());
			accountOld.setAddress(account.getAddress());
			accountOld.setEmail(account.getEmail());
			accountOld.setPhoneNum(account.getPhoneNum());
			
			AccountEntity accountNew = accountRepo.save(accountOld);
			
			for (AccountRoleEntity ar : accountNew.getAccountRoleArr()) {
				accountRoleRepo.deleteById(ar.getId());
			}
			for (String	idRole : account.getRoles()) {
				String id = "";
				do {
					id = RandomString.make(10);
				} while (accountRoleRepo.existsById(id));
				accountRoleRepo.save(new AccountRoleEntity(id, accountNew, roleRepo.findById(idRole).get()));
			}
			
			return accountNew;
		}
		return null;
	}

	@Override
	public AccountEntity updateWithRole(AccountEntity account, String[] idsRole) {
		// TODO Auto-generated method stub
		return null;
	}

//----------------------------- DELETE -----------------------------
	
	
//	1. xóa các role của account
//	2. tìm tất cả transaction và set idAccount = null, reservation = null
//	3. tìm tất cả các reservation và xóa reservation_service, reservation_room
//	4. tìm reservation và xóa đi
	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		AccountEntity account = accountRepo.findById(id).get();
		account.getAccountRoleArr().forEach(ar -> accountRoleRepo.deleteById(ar.getId()));
		
		for (TransactionEntity t : transactionRepo.findAllByIdAccount(id)) {
			t.setAccount(null);
			t.setReservation(null);
			transactionRepo.save(t);
		}
		
		if (reservationRoomRepo.findAllByIdAccount(id).size() > 0) {		
			for (ReservationRoomEntity rer : reservationRoomRepo.findAllByIdAccount(id)) {
				reservationRoomRepo.deleteById(rer.getId());
			}
		}
		
		if (reservationServiceRepo.findAllByIdAccount(id).size() > 0) {
			for (ReservationServiceEntity res : reservationServiceRepo.findAllByIdAccount(id)) {
				reservationServiceRepo.deleteById(res.getId());
			}
		}
		
		if (reservationRepo.findByIdAccount(id).size() > 0) {
			for (ReservationEntity re : reservationRepo.findByIdAccount(id)) {
				reservationRepo.deleteById(re.getId());
			}
		}
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
