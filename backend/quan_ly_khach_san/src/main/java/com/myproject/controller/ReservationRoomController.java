package com.myproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.service.IReservationRoomServ;

@RestController
@RequestMapping("/api")
public class ReservationRoomController {

	@Autowired
	private IReservationRoomServ reservationRoomServ;
	
	@PostMapping("/reservation-room")
	public ResponseEntity<?> doAddRoomsIntoReservation(@RequestBody EntityResponse entityResponse) {
		reservationRoomServ.addRoomIntoReservation(entityResponse.getId(), entityResponse.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
