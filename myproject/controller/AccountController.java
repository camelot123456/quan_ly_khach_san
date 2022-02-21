package com.myproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.entity.AccountEntity;
import com.myproject.exception.ResourceNotFoundException;
import com.myproject.security.AccountPrincipal;
import com.myproject.security.oauth2.CurrentUser;
import com.myproject.service.IAccountServ;

@RestController
public class AccountController {

	@Autowired
	private IAccountServ accountServ;
	
	@GetMapping(value = "/user/me")
	@PreAuthorize("hasAnyRole('ROLE_MEMBER')")
	public AccountEntity getCurrentAccount(@CurrentUser AccountPrincipal principal) {
		return accountServ.findById(principal.getId()).orElseThrow(() -> new ResourceNotFoundException("User", "id", principal.getId()));
	}
	
}
