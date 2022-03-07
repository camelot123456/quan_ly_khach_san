package com.myproject.repository;

import java.util.List;

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
	
	@Query(value = "select r.* "
			+ "from reservations re inner join reservation_room rer "
			+ "on re.id = rer.id_reservation inner join rooms r "
			+ "on rer.id_room = r.id inner join accounts a "
			+ "on re.id_account = a.id "
			+ "where re.id = ?1",
			nativeQuery = true)
	public List<RoomEntity> findAllByIdReservation(String idReservation);
	
	@Query(value = "select r.id as id_room, r.room_num, r.room_state, r.[floor], "
			+ "a.name as name_account, a.phone_num, rt.id as id_roomtype, "
			+ "re.id as id_reservation, re.[start_date], re.end_date, t.id as id_transaction "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype inner join reservation_room rer "
			+ "on r.id = rer.id_room inner join reservations re "
			+ "on re.id = rer.id_reservation inner join accounts a "
			+ "on re.id_account = a.id inner join transactions t "
			+ "on re.id = t.id_reservation inner join transactions t1 "
			+ "on t1.id_account = a.id "
			+ "where (re.[start_date] <= getdate() and re.end_date >= getdate()) and t.id is not null and "
			+ "(r.id like %?1% "
			+ "or r.room_num like %?1% "
			+ "or r.room_state like %?1% "
			+ "or r.[floor] like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1% "
			+ "or rt.id like %?1% "
			+ "or re.id like %?1% "
			+ "or concat(re.[start_date], '') like %?1% "
			+ "or concat(re.end_date, '') like %?1%) "
			+ "union "
			+ "select r.id as id_room, r.room_num, r.room_state, r.[floor], "
			+ "a.name as name_account, a.phone_num, rt.id as id_roomtype, "
			+ "re.id as id_reservation, re.[start_date], re.end_date, t.id as id_transaction "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype left join reservation_room rer "
			+ "on r.id = rer.id_room left join reservations re "
			+ "on re.id = rer.id_reservation left join accounts a "
			+ "on re.id_account = a.id left join transactions t "
			+ "on re.id = t.id_reservation left join transactions t1 "
			+ "on t1.id_account = a.id "
			+ "where rer.id is null or "
			+ "r.id not in ( "
			+ "select r.id "
			+ "from roomtypes rt inner join rooms r "
			+ "on rt.id = r.id_roomtype inner join reservation_room rer "
			+ "on r.id = rer.id_room inner join reservations re "
			+ "on re.id = rer.id_reservation inner join accounts a "
			+ "on re.id_account = a.id inner join transactions t "
			+ "on re.id = t.id_reservation inner join transactions t1 "
			+ "on t1.id_account = a.id "
			+ "where (re.[start_date] <= getdate() and re.end_date >= getdate()) and t.id is not null "
			+ ") and re.[start_date] in ( "
			+ "select min(re.[start_date] ) "
			+ "from rooms r left join reservation_room rer "
			+ "on r.id = rer.id_room left join reservations re "
			+ "on re.id = rer.id_reservation "
			+ "group by r.id "
			+ ")and "
			+ "(r.id like %?1% "
			+ "or r.room_num like %?1% "
			+ "or r.room_state like %?1% "
			+ "or r.[floor] like %?1% "
			+ "or a.name like %?1% "
			+ "or a.phone_num like %?1% "
			+ "or rt.id like %?1% "
			+ "or re.id like %?1% "
			+ "or concat(re.[start_date], '') like %?1% "
			+ "or concat(re.end_date, '') like %?1%) "
			+ "order by r.id asc",
			nativeQuery = true)
	public List<Object[]> pagedRoomsAllForAdminPage(String keyword);
	
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
	
//----------------------------- INSERT -----------------------------


//----------------------------- UPDATE -----------------------------

//----------------------------- DELETE -----------------------------
	
}
