package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.RoomEntity;

public interface IRoomServ {

	public Page<RoomEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<RoomEntity> findAll();
	
	public Optional<RoomEntity> findById(String id);
	
	public RoomEntity save(RoomEntity room);
	
	public RoomEntity update(RoomEntity room);
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	
}
