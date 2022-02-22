package com.myproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.payload.ApiResponse;
import com.myproject.service.IAccountRoleServ;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api")
public class AccountRoleController {
	
	@Autowired
	private IAccountRoleServ accountRoleServ;
	
	@GetMapping("/account-role")
	public ResponseEntity<?> doShowAccountRoleList() {
		return ResponseEntity.ok().body(accountRoleServ.findAll());
	}

	@PostMapping(value = "/account-role", consumes = {"multipart/form-data"})
	public ResponseEntity<?> doAddRoleIntoAccount(@RequestPart("account-role") DataRequest dataRequest){
		accountRoleServ.addRoleIntoAccount(dataRequest.getIdAccount(), dataRequest.getIdRoles());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class DataRequest {
	private String idAccount;
	private String[] idRoles;
}


