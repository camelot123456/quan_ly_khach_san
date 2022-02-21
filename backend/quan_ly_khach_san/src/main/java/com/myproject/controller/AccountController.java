package com.myproject.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.entity.AccountEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.service.IAccountServ;

@RestController
@RequestMapping("/api")
public class AccountController {

	@Autowired
	private IAccountServ accountServ;
	
	@GetMapping("/accounts/page/{currentPage}")
	public ResponseEntity<?> doPagedAccountList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		
		Page<AccountEntity> accounts = accountServ.paged(false, true, true, sizePage, currentPage, sortField, sortDir, keyword);
		
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, accounts.getTotalPages(), accounts.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("accounts", accounts.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
		
	}
	
	@GetMapping("/accounts")
	public ResponseEntity<?> doPagedAccountDefault() {
		return doPagedAccountList(0, 20, "id", "asc", "");
	}
	
	@GetMapping("/accounts/{idAccount}")
	public ResponseEntity<?> doFindAccountById(@PathVariable("idAccount") String idAccount) {
		accountServ.findById(idAccount);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@PostMapping("/accounts")
	public ResponseEntity<?> doSaveAccount(@RequestBody AccountEntity account) {
		accountServ.save(account);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}

	@PutMapping("/accounts")
	public ResponseEntity<?> doUpdateAccount(@RequestBody AccountEntity account) {
		accountServ.update(account);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/accounts/{idAccount}")
	public ResponseEntity<?> doDeleteOneAccount(@PathVariable("idAccount") String idAccount) {
		accountServ.deleteById(idAccount);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/accounts")
	public ResponseEntity<?> doDeleteManyAccount(@RequestBody AccountEntity account) {
		accountServ.deleteMany(account.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}

}
