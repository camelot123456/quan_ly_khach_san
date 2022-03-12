package com.myproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.entity.RoomTypePhotoEntity;
import com.myproject.repository.IRoomTypePhotoRepo;
import com.myproject.service.IRoomTypePhotoServ;

import net.bytebuddy.utility.RandomString;

@Service
public class RoomTypePhotoServ implements IRoomTypePhotoServ {

	@Autowired
	private IRoomTypePhotoRepo roomTypePhotoRepo;

	@Override
	public List<RoomTypePhotoEntity> findAllById(String id) {
		// TODO Auto-generated method stub
		return roomTypePhotoRepo.findAllById(id);
	}

	@Override
	public List<RoomTypePhotoEntity> findAll() {
		// TODO Auto-generated method stub
		return roomTypePhotoRepo.findAll();
	}
	

	@Override
	public List<RoomTypePhotoEntity> findAllByIdRoomtype(String idRoomtype) {
		// TODO Auto-generated method stub
		return roomTypePhotoRepo.findAllByIdRoomtype(idRoomtype);
	}

//	trong tất cả ảnh của loại phòng đó, chỉ có duy nhất một ảnh được set làm avatar
//	khi thêm mới cần để mặc định no avatar
//	khi không có avatar, hệ thống sẽ chọn ảnh mặc định của hệ thống

	@Override
	public RoomTypePhotoEntity save(RoomTypePhotoEntity roomtypePhoto) {
		// TODO Auto-generated method stub
		if (!roomTypePhotoRepo.existsById(roomtypePhoto.getId())) {
			roomtypePhoto.setId(RandomString.make(6));
			roomtypePhoto.setAvatarState(false);
			return roomTypePhotoRepo.save(roomtypePhoto);
		}
		return null;
	}

	@Override
	public RoomTypePhotoEntity updateAvatarState(RoomTypePhotoEntity roomtypePhoto) {
		// TODO Auto-generated method stub
		if (roomTypePhotoRepo.existsById(roomtypePhoto.getId())) {
			for (RoomTypePhotoEntity rtp : roomTypePhotoRepo.findAllById(roomtypePhoto.getRoomType().getId())) {
				if (rtp.getAvatarState()) {
					rtp.setAvatarState(false);
					roomTypePhotoRepo.updateAvatarState(rtp.getId(), false);
					break;
				}
			}
			return roomTypePhotoRepo.updateAvatarState(roomtypePhoto.getId(), true);
		}
		return null;
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		roomTypePhotoRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			roomTypePhotoRepo.deleteById(id);
		}
	}


}
