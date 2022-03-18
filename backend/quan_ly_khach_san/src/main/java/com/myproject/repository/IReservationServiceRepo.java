package com.myproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.ReservationServiceEntity;

public interface IReservationServiceRepo extends JpaRepository<ReservationServiceEntity, String>{

	@Query(value = "select res.* "
			+ "from accounts a inner join reservations re "
			+ "on a.id = re.id_account inner join reservation_service res "
			+ "on re.id = res.id_reservation inner join [services] s "
			+ "on res.id_service = s.id "
			+ "where a.id = ?1",
			nativeQuery = true)
	public List<ReservationServiceEntity> findAllByIdAccount(String idAccount);
	
}
