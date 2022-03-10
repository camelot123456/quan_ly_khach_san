package com.myproject.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.payload.ApiResponse;
import com.myproject.payload.reservation.ReservationCustom;
import com.myproject.payload.reservation.ReservationDeleteRoom;
import com.myproject.service.IReservationServ;
import com.myproject.service.IRoomServ;
import com.myproject.service.IServiceServ;

@RestController("admin-reservation")
@RequestMapping("/api/admin")
public class ReservationController {
	
	@Autowired
	private IReservationServ reservationServ;
	
	@Autowired
	private IRoomServ roomServ;
	
	@Autowired 
	private IServiceServ serviceServ;
	
	@GetMapping("/reservations/findForTransaction")
	public ResponseEntity<?> doFindReservationForTransaction(@Param("idReservation") String idReservation) {
		Map<String, Object> responses = new HashMap<String, Object>();
		responses.put("reservation", reservationServ.findReservationForTransaction(idReservation).get());
		responses.put("rooms", roomServ.findAllByIdReservation(idReservation));
		responses.put("services", serviceServ.findAllByIdReservation(idReservation));
		return ResponseEntity.ok().body(responses);
	}
	
	@PostMapping("/reservations/create")
	public ResponseEntity<?> doCreateReservation(@RequestBody ReservationCustom reservationCustom){ 
		reservationServ.createReservation(reservationCustom);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
	@DeleteMapping("/reservations/delete")
	public ResponseEntity<?> doCancelById(@RequestBody ReservationDeleteRoom reservationDeleteRoom) {
		reservationServ.deleteRoomInReservation(reservationDeleteRoom);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
}
