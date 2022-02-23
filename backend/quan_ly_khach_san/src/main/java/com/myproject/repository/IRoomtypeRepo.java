package com.myproject.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.RoomTypeEntity;

public interface IRoomtypeRepo extends JpaRepository<RoomTypeEntity, String>{

//----------------------------- SELECT -----------------------------

	@Query(countQuery = "select count(*) from roomtypes",
			value = "select * from roomtypes",
			nativeQuery = true)
	public Page<RoomTypeEntity> pagedRoomTypeNoKeyword(Pageable pageable);
	
	@Query(value = "select * from roomtypes r "
			+ "where r.id like %?1% "
			+ "or r.name like %?1% "
			+ "or r.description like %?1% "
			+ "or concat(r.price, '') like %?1%",
			nativeQuery = true)
	public Page<RoomTypeEntity> pagedRoomTypeByKeyword(String keyword, Pageable pageable);
	
//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
