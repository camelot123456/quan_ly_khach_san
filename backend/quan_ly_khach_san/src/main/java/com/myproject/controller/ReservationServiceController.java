package com.myproject.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.entity.ServiceEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.service.IReservationServiceServ;

@RestController
@RequestMapping("/api")
public class ReservationServiceController {

	@Autowired
	private IReservationServiceServ reservationServiceServ;
	
	@PostMapping("/reservation-service")
	public ResponseEntity<?> doAddServicesIntoReservation(
			@RequestPart("idReservation") String idReservation, 
			@RequestPart("services") Set<ServiceEntity> services) {
		reservationServiceServ.addRoomsIntoReservation(idReservation, services);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
