package com.myproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.RoomEntity;
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
		if (keyword == "" || keyword == null) {
			return roomRepo.findAll(pageRequest);
		}
		return roomRepo.pagedByKeyword(keyword, pageRequest);
	}

	@Override
	public List<RoomEntity> findAll() {
		// TODO Auto-generated method stub
		return roomRepo.findAll();
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
