package com.myproject.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.service.IServiceServ;

@RestController("admin-service")
@RequestMapping("/api/admin")
public class ServiceController {

	@Autowired
	private IServiceServ serviceServ;
	
	@GetMapping("/services/room-reservation")
	public ResponseEntity<?> doFindAll() {
		return ResponseEntity.ok().body(serviceServ.findAll());
	}
	
}
