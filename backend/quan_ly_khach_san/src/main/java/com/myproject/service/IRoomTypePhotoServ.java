package com.myproject.service;

import java.util.List;

import com.myproject.entity.RoomTypePhotoEntity;

public interface IRoomTypePhotoServ {

	public List<RoomTypePhotoEntity> findAllById(String id);
	
	public List<RoomTypePhotoEntity> findAll();
	
	public List<RoomTypePhotoEntity> findAllByIdRoomtype(String idRoomtype);
	
	public RoomTypePhotoEntity save(RoomTypePhotoEntity roomtypePhoto);
	
	public RoomTypePhotoEntity updateAvatarState(RoomTypePhotoEntity roomtypePhoto);
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	
}
