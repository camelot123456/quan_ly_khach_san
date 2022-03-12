package com.myproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.entity.RoomTypePhotoEntity;

public interface IRoomTypePhotoRepo extends JpaRepository<RoomTypePhotoEntity, String>{
	
	@Query(value = "select * from roomtype_photo rtp where rtp.id=?1",
			nativeQuery = true)
	public List<RoomTypePhotoEntity> findAllById(String id);
	
	@Query(value = "select rtp.* "
			+ "from roomtype_photo rtp inner join roomtypes rt "
			+ "on rtp.id_roomtype = rt.id "
			+ "where rt.id=?1",
			nativeQuery = true)
	public List<RoomTypePhotoEntity> findAllByIdRoomtype(String idRoomtype);
	
	@Modifying
	@Transactional
	@Query(value = "update roomtype_photo rtp set rtp.avatar_state=?2 where rtp.id=?1",
			nativeQuery = true)
	public RoomTypePhotoEntity updateAvatarState(String id, Boolean stateAvatar);
	
}
