package com.myproject.service;

import java.util.List;

import com.myproject.entity.ReservationRoomEntity;

public interface IReservationRoomServ {
	
	public void addRoomIntoReservation(String idReservation, String[] idRooms);
	
	public List<ReservationRoomEntity> findAllByIdAccount(String idAccount);
}
