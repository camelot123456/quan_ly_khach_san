package com.myproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproject.entity.ReservationRoomEntity;

public interface IReservationRoomRepo extends JpaRepository<ReservationRoomEntity, String>{

}
