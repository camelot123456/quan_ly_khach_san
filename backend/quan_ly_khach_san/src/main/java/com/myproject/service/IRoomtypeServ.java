package com.myproject.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.myproject.entity.RoomTypeEntity;
import com.myproject.payload.roomtype.RoomtypeCustom;
import com.myproject.payload.roomtype.RoomtypeFormCreate;

public interface IRoomtypeServ {

//	----------------------------- SELECT -----------------------------

	public Page<RoomTypeEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<RoomTypeEntity> findAll();
	
	public Optional<RoomTypeEntity> findById(String id);
	
	public List<RoomTypeEntity> findAllByAvatarState(Boolean avatarState);
	
	public Page<RoomtypeCustom> pagedRoomtype(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
//	----------------------------- INSERT -----------------------------
	
	public RoomTypeEntity save(RoomTypeEntity roomType);
	
	public void createWithAvatar(RoomtypeFormCreate roomType, MultipartFile multipartFile) throws FileNotFoundException, IOException ;
	
//	----------------------------- UPDATE -----------------------------
	
	public RoomTypeEntity update(RoomTypeEntity roomType);
	
	public void updateWithAvatar(RoomtypeFormCreate formCreate);
	
//	----------------------------- DELETE -----------------------------
	
	public void deleteById(String id) throws IOException;
	
	public void deleteMany(String[] ids);
	

}
