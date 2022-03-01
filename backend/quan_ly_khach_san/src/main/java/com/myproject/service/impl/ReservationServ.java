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
import com.myproject.repository.IReservationRepo;
import com.myproject.repository.IReservationRoomRepo;
import com.myproject.repository.IReservationServiceRepo;
import com.myproject.repository.ITransactionRepo;
import com.myproject.service.IAccountServ;
import com.myproject.service.IReservationServ;
import com.myproject.service.ITransactionServ;

import net.bytebuddy.utility.RandomString;

@Service
public class ReservationServ implements IReservationServ{

	@Autowired 
	private IReservationRepo reservationRepo;
	
	@Autowired
	private ITransactionRepo transactionRepo;
	
	@Autowired 
	private ITransactionServ transactionServ;
	
	@Autowired
	private IReservationRoomRepo reservationRoomRepo;
	
	@Autowired
	private IReservationServiceRepo reservationServiceRepo;
	
	@Autowired
	private IAccountServ accountServ;
	
	@Override
	public Page<ReservationEntity> paged(int currentPage, int sizePage, String sortField,
			String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		if (keyword == "" || keyword == null) {
			return reservationRepo.pagedNoKeyword(pageRequest);
		}
		return reservationRepo.pagedByKeyword(keyword, pageRequest);
	}

	@Override
	public List<ReservationEntity> findByIdAccount(String idAccount) {
		// TODO Auto-generated method stub
		return reservationRepo.findByIdAccount(idAccount);
	}

	@Override
	public Optional<ReservationEntity> findById(String id) {
		// TODO Auto-generated method stub
		return reservationRepo.findById(id);
	}

	@Override
	public ReservationEntity save(ReservationEntity reservation, String idAccount) {
		// TODO Auto-generated method stub
		String id = RandomString.make(6);
		if (!reservationRepo.existsById(id)) {
			reservation.setId(id);
			AccountEntity account = accountServ.findById(idAccount).get();
			reservation.setAccount(account);
			return reservationRepo.save(reservation);
		}
		return null;
	}

	@Override
	public ReservationEntity update(ReservationEntity reservation, String idAccount) {
		// TODO Auto-generated method stub
		if (reservationRepo.existsById(reservation.getId())) {
			AccountEntity account = accountServ.findById(idAccount).get();
			reservation.setAccount(account);
			return reservationRepo.save(reservation);
		}
		return null;
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		ReservationEntity reservation = reservationRepo.findById(id).get();
		reservation.setAccount(null);
		
		Optional<TransactionEntity> transaction = transactionServ.findByIdReservation(reservation.getId());
		if (transaction.isPresent()) {
			transaction.get().setReservation(null);
			transactionRepo.save(transaction.get());
		}
		
		for (ReservationRoomEntity reservationRoomIterable : reservation.getReservationRoomArr()) {
			reservationRoomRepo.deleteById(reservationRoomIterable.getId());
		}
		
		for (ReservationServiceEntity reservationServiceIterable : reservation.getReservationServiceArr()) {
			reservationServiceRepo.deleteById(reservationServiceIterable.getId());
		}
		
		reservationRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			this.deleteById(id);
		}
	}

}
