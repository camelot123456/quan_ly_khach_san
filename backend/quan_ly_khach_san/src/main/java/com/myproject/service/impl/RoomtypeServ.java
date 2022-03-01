package com.myproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.RoomTypeEntity;
import com.myproject.repository.IRoomtypeRepo;
import com.myproject.service.IRoomtypeServ;

@Service
public class RoomtypeServ implements IRoomtypeServ{

	@Autowired
	private IRoomtypeRepo roomtypeRepo;
	
//	----------------------------- SELECT -----------------------------	

	@Override
	public Page<RoomTypeEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		keyword = keyword == null ? "" : keyword;
		return roomtypeRepo.pagedRoomTypeByKeyword(keyword, pageRequest);
	}

	@Override
	public List<RoomTypeEntity> findAll() {
		// TODO Auto-generated method stub
		return roomtypeRepo.findAll();
	}

	@Override
	public Optional<RoomTypeEntity> findById(String id) {
		// TODO Auto-generated method stub
		return roomtypeRepo.findById(id);
	}

//	----------------------------- INSERT -----------------------------	
	
	@Override
	public RoomTypeEntity save(RoomTypeEntity roomType) {
		// TODO Auto-generated method stub
		if (!roomtypeRepo.existsById(roomType.getId())) {
			return roomtypeRepo.save(roomType);
		}
		return null;
	}

//	----------------------------- UPDATE -----------------------------
	
	@Override
	public RoomTypeEntity update(RoomTypeEntity roomType) {
		// TODO Auto-generated method stub
		if (roomtypeRepo.existsById(roomType.getId())) {
			return roomtypeRepo.save(roomType);
		}
		return null;
	}

//	----------------------------- DELETE -----------------------------
	
	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		roomtypeRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			roomtypeRepo.deleteById(id);
		}
	}

}
