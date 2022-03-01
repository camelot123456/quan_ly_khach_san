package com.myproject.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.ServiceEntity;

public interface IServiceRepo extends JpaRepository<ServiceEntity, String> {

	@Query(value = "select * from services s "
			+ "where s.id like %?1% "
			+ "or s.name like %?1% "
			+ "or concat(s.price,'') like %?1%",
			nativeQuery = true)
	public Page<ServiceEntity> pagedByKeyword(String keyword, Pageable pageable);
	
	@Query(value = "select s.* "
			+ "from reservations re inner join reservation_service res "
			+ "on re.id = res.id_reservation inner join [services] s "
			+ "on res.id_service = s.id inner join accounts a "
			+ "on re.id_account = a.id "
			+ "where re.id = ?1",
			nativeQuery = true)
	public List<ServiceEntity> findAllByIdReservation(String idReservation);
	
}
