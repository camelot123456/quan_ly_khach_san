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
import com.myproject.entity.ReservationEntity;
import com.myproject.entity.ReservationRoomEntity;
import com.myproject.entity.ReservationServiceEntity;
import com.myproject.entity.TransactionEntity;
import com.myproject.entity.enums.ETransactionStatus;
import com.myproject.repository.IAccountRepo;
import com.myproject.repository.IReservationRepo;
import com.myproject.repository.IReservationRoomRepo;
import com.myproject.repository.IReservationServiceRepo;
import com.myproject.repository.ITransactionRepo;
import com.myproject.service.ITransactionServ;

import net.bytebuddy.utility.RandomString;

@Service
public class TransactionServ implements ITransactionServ {

	@Autowired
	private ITransactionRepo transactionRepo;
	
	@Autowired
	private IAccountRepo accountRepo;
	
	@Autowired
	private IReservationRepo reservationRepo;
	
	@Autowired
	private IReservationRoomRepo reservationRoomRepo;
	
	@Autowired
	private IReservationServiceRepo reservationServiceRepo;

	@Override
	public Page<TransactionEntity> paged(int currentPage, int sizePAge, String sortField, String sortDir,
			String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> transactions = transactionRepo.pagedByKeyword(keyword);
		List<TransactionEntity> transactionsNew = null;
		
		if (transactions.size() > 0) {
			transactionsNew = new ArrayList<TransactionEntity>();
			for (Object[] record : transactions) {
				TransactionEntity transaction = new TransactionEntity();
				transaction.setId((String) record[0]);
				transaction.setAddress((String) record[1]);
				transaction.setAmount((Double) record[2]);
				transaction.setContent((String) record[3]);
				transaction.setCreatedAt((Date) record[4]);
				transaction.setCreatedBy((String) record[5]);
				transaction.setCustomerNum((Integer) record[6]);
				transaction.setDeleted((Boolean) record[7]);
				transaction.setDiscount((Double) record[8]);
				transaction.setEmail((String) record[9]);
				transaction.setEndDate((Date) record[10]);
				transaction.setModifiedAt((Date) record[11]);
				transaction.setModifiedBy((String) record[12]);
				transaction.setNameCustomer((String) record[13]);
				transaction.setPhoneNum((String) record[14]);
				transaction.setStartDate((Date) record[15]);
				transaction.setTaxInvoice((Double) record[17]);
				transaction.setTaxService((Double) record[18]);
				transaction.setTotal((Double) record[19]);
				transaction.setIdAccount((String) record[20]);
				transaction.setIdReservation((String) record[21]);
//				transaction.setStatus((ETransactionStatus) record[6]);
				
				transactionsNew.add(transaction);
			}
		}
		
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePAge, sort);
		
		PageImpl<TransactionEntity> page = new PageImpl<TransactionEntity>(transactionsNew, pageRequest, transactionsNew.size());
		
		return page;
	}

	@Override
	public Optional<TransactionEntity> findById(String id) {
		// TODO Auto-generated method stub
		return transactionRepo.findById(id);
	}

	@Override
	public Optional<TransactionEntity> findByIdReservation(String idReservation) {
		// TODO Auto-generated method stub
		return transactionRepo.findByIdReservation(idReservation);
	}

	@Override
	public List<TransactionEntity> findAllByIdAccount(String idAccount) {
		// TODO Auto-generated method stub
		return transactionRepo.findAllByIdAccount(idAccount);
	}
	
	@Override
	public void doPayment(TransactionEntity transaction) {
		ReservationEntity reservation = reservationRepo.findById(transaction.getReservation().getId()).get();
		AccountEntity account = accountRepo.findById(reservation.getAccount().getId()).get();
		String id = "";
		do {
			id = RandomString.make(10);
		} while (transactionRepo.existsById(id));
		
		transaction.setId(id);
		transaction.setAccount(account);
		transaction.setReservation(reservation);
		transaction.setAmount(reservation.getGrandTotal());
		transaction.setDeleted(false);
		
		transaction.setNameCustomer(account.getName());
		transaction.setEmail(account.getEmail());
		transaction.setAddress(account.getAddress());
		transaction.setPhoneNum(account.getPhoneNum());
		transaction.setCustomerNum(reservation.getCustomerNum());
		transaction.setDiscount(reservation.getDiscount());
		transaction.setStartDate(reservation.getStartDate());
		transaction.setEndDate(reservation.getEndDate());
		transaction.setTotal(reservation.getTotal());
		transaction.setTaxInvoice(reservation.getTaxInvoice());
		transaction.setTaxService(reservation.getTaxService());
		transaction.setContent("");
		transactionRepo.save(transaction);
		
	}

	@Override
	public void addAccountAndReservationIntoTransactions(TransactionEntity transaction, String idAccount, String idReservation) {
		// TODO Auto-generated method stub
		String id = RandomString.make(6);
		try {
			if (!transactionRepo.existsById(id)) {
				transaction.setId(id);
				transaction.setAccount(accountRepo.findById(idAccount).get());
				transaction.setReservation(reservationRepo.findById(idReservation).get());
				transaction.setStatus(ETransactionStatus.SUCCESS);
				transactionRepo.save(transaction);
			}
		} catch (Exception e) {
			// TODO: handle exception
			if (!transactionRepo.existsById(id)) {
				transaction.setId(id);
				transaction.setAccount(accountRepo.findById(idAccount).get());
				transaction.setReservation(reservationRepo.findById(idReservation).get());
				transaction.setStatus(ETransactionStatus.FAILED);
				transactionRepo.save(transaction);
			}
		}
	}

	@Override
	public void update(String id, String idReservation) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		Optional<TransactionEntity> transactionOptional = transactionRepo.findById(id);
		if (transactionOptional.isPresent()) {
			TransactionEntity transaction = transactionOptional.get();
			transaction.setAccount(null);
			ReservationEntity reservation = reservationRepo.findById(transaction.getReservation().getId()).get();
			reservation.setAccount(null);
			for (ReservationRoomEntity reservationRoomIterable : reservation.getReservationRoomArr()) {
				reservationRoomRepo.deleteById(reservationRoomIterable.getId());
			}
			for (ReservationServiceEntity reservationServiceIterable : reservation.getReservationServiceArr()) {
				reservationServiceRepo.deleteById(reservationServiceIterable.getId());
			}
			
			reservationRepo.deleteById(reservation.getId());
			
			transactionRepo.deleteById(transaction.getId());
		}
		return;
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			this.deleteById(id);
		}
	}



}
