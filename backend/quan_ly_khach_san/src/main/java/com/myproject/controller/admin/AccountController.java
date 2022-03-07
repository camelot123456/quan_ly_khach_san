package com.myproject.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.config.AppProperties;
import com.myproject.service.IAccountServ;

@RestController("admin-account")
@RequestMapping("/api/admin")
public class AccountController {

	@Autowired
	private AppProperties appProperties;
	
	@Autowired
	private IAccountServ accountServ;
	
	@GetMapping("/accounts")
	public ResponseEntity<?> doFindByIdEmailPhoneNum(@Param("keyword") String keyword) {
		return ResponseEntity.ok().body(accountServ.findByIdEmailPhoneNum(keyword)); 
	}
	
}
