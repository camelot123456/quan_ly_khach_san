package com.myproject.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

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

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.payload.account.AccountRoleUpdatePayload;
import com.myproject.service.IAccountServ;

@RestController
@RequestMapping("/api")
public class AccountController {

	@Autowired
	private IAccountServ accountServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/accounts/page/{currentPage}")
	public ResponseEntity<?> doPagedAccountList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		
		Page<AccountEntity> accounts = accountServ.paged(true, true, sizePage, currentPage, sortField, sortDir, keyword);
		
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, accounts.getTotalPages(), accounts.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("accounts", accounts.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
		
	}
	
	@GetMapping("/accounts")
	public ResponseEntity<?> doPagedAccountDefault() {
		return doPagedAccountList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@GetMapping("/accounts/{idAccount}")
	public ResponseEntity<?> doFindAccountById(@PathVariable("idAccount") String idAccount) {
		accountServ.findById(idAccount);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@GetMapping("/accounts/myAccount/{idUser}")
	public ResponseEntity<?> showMyUser(@PathVariable("idUser") String idUser, HttpServletResponse response) {
		return ResponseEntity.ok().body(accountServ.myAccounts(idUser, response));
	}
	
	@PostMapping("/accounts")
	public ResponseEntity<?> doSaveAccount(@RequestBody AccountEntity account) {
		accountServ.save(account);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}

	@PutMapping("/accounts")
	public ResponseEntity<?> doUpdateAccount(@RequestBody AccountRoleUpdatePayload account) {
		accountServ.update(account);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/account")
	public ResponseEntity<?> doDeleteOneAccount(@RequestBody EntityResponse entityResponse) {
		accountServ.deleteById(entityResponse.getId());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/accounts")
	public ResponseEntity<?> doDeleteManyAccount(@RequestBody EntityResponse entityResponse) {
		accountServ.deleteMany(entityResponse.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}

}
