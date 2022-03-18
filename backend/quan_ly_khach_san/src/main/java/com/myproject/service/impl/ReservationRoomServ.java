package com.myproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.entity.ReservationEntity;
import com.myproject.entity.ReservationRoomEntity;
import com.myproject.entity.RoomEntity;
import com.myproject.repository.IReservationRepo;
import com.myproject.repository.IReservationRoomRepo;
import com.myproject.repository.IRoomRepo;
import com.myproject.service.IReservationRoomServ;

import net.bytebuddy.utility.RandomString;

@Service
public class ReservationRoomServ implements IReservationRoomServ{

	@Autowired
	private IReservationRoomRepo reservationRoomRepo;
	
	@Autowired
	private IRoomRepo roomRepo;
	
	@Autowired
	private IReservationRepo reservationRepo;

	@Override
	public void addRoomIntoReservation(String idReservation, String[] idRooms) {
		// TODO Auto-generated method stub
		ReservationEntity reservation = reservationRepo.findById(idReservation).get();
		for (String idRoom : idRooms) {
			RoomEntity room = roomRepo.findById(idRoom).get();
			ReservationRoomEntity reservationRoom = new ReservationRoomEntity(RandomString.make(6), reservation, room);
			reservationRoomRepo.save(reservationRoom);
		}
	}

	@Override
	public List<ReservationRoomEntity> findAllByIdAccount(String idAccount) {
		// TODO Auto-generated method stub
		return reservationRoomRepo.findAllByIdAccount(idAccount);
	}
	
	
	
}
