package com.myproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproject.entity.ReservationServiceEntity;

public interface IReservationServiceRepo extends JpaRepository<ReservationServiceEntity, String>{

	
	
}
