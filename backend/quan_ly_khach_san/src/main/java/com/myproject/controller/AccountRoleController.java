package com.myproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.service.IAccountRoleServ;

@RestController
@RequestMapping("/api")
public class AccountRoleController {
	
	@Autowired
	private IAccountRoleServ accountRoleServ;

	@PostMapping(value = "/account-role", consumes = {"multipart/form-data"})
	public ResponseEntity<?> doAddRoleIntoAccount(@RequestPart("account-role") EntityResponse entityResponset){
		accountRoleServ.addRoleIntoAccount(entityResponset.getId(), entityResponset.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}






