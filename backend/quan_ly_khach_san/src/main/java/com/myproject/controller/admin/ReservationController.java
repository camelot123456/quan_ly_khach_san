package com.myproject.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.payload.ApiResponse;
import com.myproject.payload.reservation.ReservationCustom;
import com.myproject.payload.reservation.ReservationDeleteRoom;
import com.myproject.service.IReservationServ;

@RestController("admin-reservation")
@RequestMapping("/api/admin")
public class ReservationController {
	
	@Autowired
	private IReservationServ reservationServ;
	
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
