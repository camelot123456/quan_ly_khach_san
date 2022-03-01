package com.myproject.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.ReservationEntity;

public interface IReservationRepo extends JpaRepository<ReservationEntity, String>{
	
	@Query(countQuery = "select count(*) from reservations",
			value = "select * from reservations",
			nativeQuery = true)
	public Page<ReservationEntity> pagedNoKeyword(Pageable pageable);

	@Query(value = "select * from reservations r where r.id like %?1% ",
			nativeQuery = true)
	public Page<ReservationEntity> pagedByKeyword(String keyword, Pageable pageable);
	
	@Query(value = "select * "
			+ "from reservations re inner join accounts a "
			+ "where a.id=?1",
			nativeQuery = true)
	public List<ReservationEntity> findByIdAccount(String idAccount);
	
//	reservation trash
	
	
	
}
