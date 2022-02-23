package com.myproject.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.RoomEntity;

public interface IRoomRepo extends JpaRepository<RoomEntity, String>{

//----------------------------- SELECT -----------------------------
	
	@Query(value = "select * from rooms r "
			+ "where r.id like %?1% "
			+ "or concat(r.customer_num,'') like %?1% "
			+ "or r.floor like %?1% "
			+ "or r.room_state like %?1% "
			+ "or r.room_num like %?1% "
			+ "or concat(r.incurred_price,'') like %?1%",
			nativeQuery = true)
	public Page<RoomEntity> pagedByKeyword(String keyword, Pageable pageable);
	
//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
