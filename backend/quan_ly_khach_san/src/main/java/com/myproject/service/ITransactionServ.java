package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.TransactionEntity;

public interface ITransactionServ {

	public Page<TransactionEntity> paged(int currentPage, int sizePAge, String sortField, String sortDir, String keyword);
	
	public Optional<TransactionEntity> findById(String id);
	
	public Optional<TransactionEntity> findByIdReservation(String idReservation);
	
	public List<TransactionEntity> findAllByIdAccount(String idAccount);
	
	public void doPayment(TransactionEntity transaction);
	
	public void addAccountAndReservationIntoTransactions(TransactionEntity transaction, String idAccount, String idReservation);
	
	public void update(String id, String idReservation);
	
	public void doSoftDelete(String idTransaction);
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	
}
