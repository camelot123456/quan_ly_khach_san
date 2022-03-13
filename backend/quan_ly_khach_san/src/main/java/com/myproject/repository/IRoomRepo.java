package com.myproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.RoomEntity;

public interface IRoomRepo extends JpaRepository<RoomEntity, String>{

//----------------------------- SELECT -----------------------------
	
	@Query(value = "select r.* "
			+ "from rooms r inner join roomtypes rt "
			+ "on r.id_roomtype = rt.id "
			+ "where r.id like %?1% "
			+ "or concat(r.customer_num,'') like %?1% "
			+ "or concat(r.[floor],'') like %?1% "
			+ "or r.room_state like %?1% "
			+ "or r.room_num like %?1% "
			+ "or concat(r.incurred_price,'') like %?1% "
			+ "or r.id_roomtype like %?1% "
			+ "order by r.modified_at desc",
			nativeQuery = true)
	public List<Object[]> pagedByKeyword(String keyword);
	
	@Query(value = "select r.* "
			+ "from reservations re inner join reservation_room rer "
			+ "on re.id = rer.id_reservation inner join rooms r "
			+ "on rer.id_room = r.id inner join accounts a "
			+ "on re.id_account = a.id "
			+ "where re.id = ?1 ",
			nativeQuery = true)
	public List<RoomEntity> findAllByIdReservation(String idReservation);
	
	
	@Query(value = "select r.id, re.[start_date], re.end_date "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype left join reservation_room rer "
			+ "on r.id = rer.id_room left join reservations re "
			+ "on rer.id_reservation = re.id left join transactions t  "
			+ "on re.id = t. id_reservation "
			+ "where r.customer_num >= ?2 and rt.id = ?1",
			nativeQuery = true)
	public List<Object[]> findAllRoomsInReservationByCustomerNumAndIdRoomtype(String idRoomtype, Integer customerNum);
	
	
	@Query(value = "select r.id as id_r, r.created_at as cda_r, r.modified_at as mda_r, r.customer_num as crn_r, "
			+ "r.[description] as des_r, r.[floor], r.incurred_price, r.room_num, r.room_state, "
			+ "rt.id as id_rt, rt.name as name_rt, rt.price, rt.[description] as des_rt, rtp.url as avatar_rt "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype inner join roomtype_photo rtp "
			+ "on rt.id = rtp.id_roomtype "
			+ "where r.id = ?1 and rtp.avatar_state = 1",
			nativeQuery = true)
	public List<Object[]> findRoomDetailForAdmin(String idRoom);
	
	@Query(value = "select r.id as id_room, r.room_num, r.room_state, r.[floor], "
			+ "a.name as name_account, a.phone_num, rt.id as id_roomtype, "
			+ "re.id as id_reservation, re.[start_date], re.end_date "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype left join reservation_room rer "
			+ "on r.id = rer.id_room left join reservations re "
			+ "on rer.id_reservation = re.id left join transactions t "
			+ "on re.id = t.id_reservation inner join accounts a "
			+ "on re.id_account = a.id "
			+ "where t.id is null and ("
			+ "r.room_num like %?1% "
			+ "or r.room_state like %?1% "
			+ "or concat(r.[floor], '') like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1% "
			+ "or rt.id like %?1% "
			+ "or re.id like %?1% "
			+ "or concat(re.[start_date], '') like %?1% "
			+ "or concat(re.end_date, '') like %?1%) "
			+ "order by re.modified_at, r.id, r.room_num asc",
			nativeQuery = true)
	public List<Object[]> findAllRoomsTransactionIsNull(String keyword);
	
	@Query(value = "select r.id as id_room, r.room_num, r.room_state, r.[floor], "
			+ "a.name as name_account, a.phone_num, rt.id as id_roomtype, "
			+ "re.id as id_reservation, re.[start_date], re.end_date, t.id as id_transaction "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype left join reservation_room rer "
			+ "on r.id = rer.id_room left join reservations re "
			+ "on rer.id_reservation = re.id left join transactions t "
			+ "on re.id = t.id_reservation inner join accounts a "
			+ "on re.id_account = a.id "
			+ "where t.id is not null and ( "
			+ "re.[start_date] <= getdate() and re.end_date >= getdate())"
			+ "and (r.room_num like %?1% "
			+ "or r.room_state like %?1% "
			+ "or concat(r.[floor], '') like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1% "
			+ "or rt.id like %?1% "
			+ "or re.id like %?1% "
			+ "or concat(re.[start_date], '') like %?1% "
			+ "or concat(re.end_date, '') like %?1%) "
			+ "order by re.modified_at, r.id, r.room_num asc",
			nativeQuery = true)
	public List<Object[]> findAllRoomsTransactionIsNotNull(String keyword);
	
//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
