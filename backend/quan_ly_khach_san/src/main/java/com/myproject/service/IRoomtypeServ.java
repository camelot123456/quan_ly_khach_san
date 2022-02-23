package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.RoomTypeEntity;

public interface IRoomtypeServ {

//	----------------------------- SELECT -----------------------------

	public Page<RoomTypeEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<RoomTypeEntity> findAll();
	
	public Optional<RoomTypeEntity> findById(String id);
	
//	----------------------------- INSERT -----------------------------
	
	public RoomTypeEntity save(RoomTypeEntity roomType);
	
//	----------------------------- UPDATE -----------------------------
	
	public RoomTypeEntity update(RoomTypeEntity roomType);
	
//	----------------------------- DELETE -----------------------------
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	

}
