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

import com.myproject.entity.RoomEntity;
import com.myproject.payload.room.RoomRoomtypeReservationReservationroomAccount;
import com.myproject.repository.IRoomRepo;
import com.myproject.service.IRoomServ;

@Service
public class RoomServ implements IRoomServ{

	@Autowired
	private IRoomRepo roomRepo;
	
	@Override
	public Page<RoomEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		keyword = keyword == null ? "" : keyword;
		return roomRepo.pagedByKeyword(keyword, pageRequest);
	}
	

	@Override
	public Page<RoomRoomtypeReservationReservationroomAccount> pagedRoomsForAdminPage(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> rooms = roomRepo.pagedRoomsForAdminPage(keyword);
		List<RoomRoomtypeReservationReservationroomAccount> roomsNew = null;
		if (rooms.size() > 0) {
			roomsNew = new ArrayList<RoomRoomtypeReservationReservationroomAccount>();
			for (Object[] record : rooms) {
				RoomRoomtypeReservationReservationroomAccount room = new RoomRoomtypeReservationReservationroomAccount();
				room.setIdRoom((String) record[0]);
				room.setRoomNum((String) record[1]);
				room.setRoomState((String) record[2]);
				room.setFloor((String) record[3]);
				room.setNameAccount((String) record[4]);
				room.setPhoneNum((String) record[5]);
				room.setIdRoomType((String) record[6]);
				room.setIdReservation((String) record[7]);
				room.setStartDate((Date) record[8]);
				room.setEndDate((Date) record[9]);
				
				roomsNew.add(room);
			}
		}
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		Page<RoomRoomtypeReservationReservationroomAccount> roomPaged = new PageImpl<RoomRoomtypeReservationReservationroomAccount>(roomsNew, pageRequest, roomsNew.size());
		return roomPaged;
	}

	@Override
	public List<RoomEntity> findAll() {
		// TODO Auto-generated method stub
		return roomRepo.findAll();
	}
	
	@Override
	public List<RoomEntity> findAllByIdReservation(String idReservation) {
		// TODO Auto-generated method stub
		return roomRepo.findAllByIdReservation(idReservation);
	}

	@Override
	public Optional<RoomEntity> findById(String id) {
		// TODO Auto-generated method stub
		return roomRepo.findById(id);
	}

	@Override
	public RoomEntity save(RoomEntity room) {
		// TODO Auto-generated method stub
		if (!roomRepo.existsById(room.getId())) {
			return roomRepo.save(room);
		}
		return null;
	}

	@Override
	public RoomEntity update(RoomEntity room) {
		// TODO Auto-generated method stub
		if (roomRepo.existsById(room.getId())) {
			return roomRepo.save(room);
		}
		return null;
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		roomRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			roomRepo.deleteById(id);
		}
	}


	

}
