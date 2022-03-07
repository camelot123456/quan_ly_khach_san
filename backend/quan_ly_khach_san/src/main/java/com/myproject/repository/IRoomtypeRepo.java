package com.myproject.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.RoomTypeEntity;

public interface IRoomtypeRepo extends JpaRepository<RoomTypeEntity, String>{

//----------------------------- SELECT -----------------------------

	
	@Query(value = "select * from roomtypes r "
			+ "where r.id like %?1% "
			+ "or r.name like %?1% "
			+ "or r.description like %?1% "
			+ "or concat(r.price, '') like %?1%",
			nativeQuery = true)
	public Page<RoomTypeEntity> pagedRoomTypeByKeyword(String keyword, Pageable pageable);
	
	@Query(value = "select rt.*, rtp.url "
			+ "from roomtypes rt inner join roomtype_photo rtp "
			+ "on rt.id = rtp.id_roomtype "
			+ "where rtp.avatar_state = ?1 "
			+ "and ( rt.id like %?2% "
			+ "or rt.name like %?2% "
			+ "or rt.[description] like %?2% "
			+ "or concat(rt.[created_at], '') like %?2% "
			+ "or concat(rt.modified_at, '') like %?2% "
			+ "or concat(rt.price, '') like %?2% )",
			nativeQuery = true)
	public List<Object[]> pagedRoomtype(Boolean avatarState, String keyword);
	
	@Query(value = "select rt.*, rtp.url as avatarUrl "
			+ "from roomtype_photo rtp inner join roomtypes rt "
			+ "on rtp.id_roomtype = rt.id "
			+ "where rtp.avatar_state = ?1", 
			nativeQuery = true)
	public List<Object[]> findAllByAvatarState(Boolean avatarState);
	
	@Query(value = "select rt.*, rtp.url as avatarUrl "
			+ "from roomtype_photo rtp inner join roomtypes rt "
			+ "on rtp.id_roomtype = rt.id "
			+ "where rt.id = ?1 and rtp.avatar_state = 1", 
			nativeQuery = true)
	public List<Object[]> findOneById(String id);
	
//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
