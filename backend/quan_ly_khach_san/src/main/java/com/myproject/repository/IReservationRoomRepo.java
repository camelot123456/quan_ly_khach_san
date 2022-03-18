package com.myproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.ReservationRoomEntity;

public interface IReservationRoomRepo extends JpaRepository<ReservationRoomEntity, String>{

	@Query(value = "select rer.*  "
			+ "from accounts a inner join reservations re "
			+ "on a.id = re.id_account inner join reservation_room rer "
			+ "on re.id = rer.id_reservation inner join rooms r "
			+ "on rer.id_room = r.id "
			+ "where a.id = ?1",
			nativeQuery = true)
	public List<ReservationRoomEntity> findAllByIdAccount(String idAccount);
	
}
