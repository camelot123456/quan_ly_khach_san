package com.myproject.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.ReservationEntity;

public interface IReservationRepo extends JpaRepository<ReservationEntity, String>{

	@Query(value = "select * from reservations r where r.id like %?1% ",
			nativeQuery = true)
	public Page<ReservationEntity> pagedByKeyword(String keyword, Pageable pageable);
	
	@Query(value = "select re.* "
			+ "from reservations re inner join accounts a "
			+ "on re.id_account = a.id left join transactions t "
			+ "on re.id = t.id_reservation "
			+ "where a.id=?1 and t.id is null "
			+ "order by re.modified_at desc",
			nativeQuery = true)
	public List<ReservationEntity> findByIdAccount(String idAccount);
	
	@Query(value = "select rt.id as idRoomtype, rt.name as nameRoomtype, rt.price, re.id as idReservation, re.[start_date], re.end_date , "
			+ "re.created_at, re.customer_num, re.tax_service, re.tax_invoice, "
			+ "re.total, re.grand_total, re.discount, a.id as idAccount, a.name as nameAccount "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype inner join reservation_room rer "
			+ "on r.id = rer.id_room inner join reservations re "
			+ "on re.id = rer.id_reservation inner join accounts a "
			+ "on re.id_account = a.id "
			+ "where re.id = ?1",
			nativeQuery = true)
	public List<Object[]> findReservationForTransaction(String idReservation);

}
