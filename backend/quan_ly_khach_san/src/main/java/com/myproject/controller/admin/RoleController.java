package com.myproject.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.service.IRoleServ;

@RestController("admin-role")
@RequestMapping("/api/admin")
public class RoleController {
	
	@Autowired
	private IRoleServ roleServ;
	
	@GetMapping("/roles")
	public ResponseEntity<?> showRoleListByCode(@Param("code") String code) {
		return ResponseEntity.ok().body(roleServ.findAllByCode(code));
	}
	
}
