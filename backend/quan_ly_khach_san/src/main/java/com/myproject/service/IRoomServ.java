package com.myproject.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.RoomEntity;
import com.myproject.payload.room.RoomDetailForAdmin;
import com.myproject.payload.room.RoomRoomtypeReservationReservationroomAccount;

public interface IRoomServ {

	public Page<RoomEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<RoomEntity> findAll();
	
	public Page<RoomRoomtypeReservationReservationroomAccount> findAllByRoomstate(String roomState, int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<RoomEntity> findAllByIdReservation(String idReservation);
	
	public List<RoomEntity> findAllRoomsInReservationByCustomerNumAndIdRoomtype(String idRoomtype,Integer customerNum, Date startDate, Date endDate);
	
	public Page<RoomRoomtypeReservationReservationroomAccount> findAllRoomsTransactionIsNull(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public Page<RoomRoomtypeReservationReservationroomAccount> findAllRoomsTransactionIsNotNull(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public Optional<RoomDetailForAdmin> findRoomDetailForAdmin(String idRoom, String idTransaction);
	
	public Optional<RoomEntity> findById(String id);
	
	public RoomEntity save(RoomEntity room);
	
	public RoomEntity update(RoomEntity room);
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	
}
