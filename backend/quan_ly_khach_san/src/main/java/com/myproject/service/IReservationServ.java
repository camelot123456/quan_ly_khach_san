package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.ReservationEntity;
import com.myproject.payload.reservation.ReservationCustom;
import com.myproject.payload.reservation.ReservationDeleteRoom;
import com.myproject.payload.reservation.ReservationForTransaction;

public interface IReservationServ {

	public Page<ReservationEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<ReservationEntity> findByIdAccount(String idAccount);
	
	public Optional<ReservationEntity> findById(String id);
	
	public void createReservation(ReservationCustom reservationCustom);
	
	public ReservationEntity save(ReservationEntity reservation, String idAccount);
	
	public ReservationEntity update(ReservationEntity reservation, String idAccount);
	
	public void checkoutRoomInTransaction(ReservationDeleteRoom request);
	
	public Optional<ReservationForTransaction> findReservationForTransaction(String idReservation);
	
	public void deleteById(String id);
	
	public void deleteRoomInReservation(ReservationDeleteRoom request);
	
	public void deleteMany(String[] ids);
	
}
