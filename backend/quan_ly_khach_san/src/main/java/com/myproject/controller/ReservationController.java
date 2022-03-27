package com.myproject.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReservationController {

	@GetMapping("/reservations/customer")
	public ResponseEntity<?> doShowReservation(@Param("idUser") String idUser) {
		return ResponseEntity.ok("");
	}
	
}
