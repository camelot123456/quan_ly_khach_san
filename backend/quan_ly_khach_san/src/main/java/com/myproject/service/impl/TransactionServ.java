package com.myproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePAge, sort);
		keyword = keyword == null ? "" : keyword;
		return transactionRepo.pagedByKeyword(keyword, pageRequest);
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
