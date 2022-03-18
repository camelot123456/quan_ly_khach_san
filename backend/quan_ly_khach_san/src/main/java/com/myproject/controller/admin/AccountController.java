package com.myproject.controller.admin;

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

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.payload.account.AccountRoleUpdatePayload;
import com.myproject.service.IAccountServ;

/* khách hàng (auth_provider = NO_ACCOUNT, LOCAL{role = MEMBER}, GOOGLE, FACEBOOK)
 * nhân viên (auth_provider = LOCAL {role = DIRECTOR, RECEPTIONIST, ACCOUNTANT, BUSINESS})
 * 
 * */

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

	@GetMapping("/accounts/{type}/page/{currentPage}")
	public ResponseEntity<?> doPagedByType(@PathVariable("type") String type, 
			@PathVariable("currentPage") int currentPage, 
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<AccountEntity> accounts = accountServ.pagedByType(type, sizePage, currentPage, sortField, sortDir, keyword);
		PagedResponse paged = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, accounts.getTotalPages(), accounts.getTotalElements());
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("paged", paged);
		response.put("accounts", accounts.getContent());
		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping("/accounts/{type}")
	public ResponseEntity<?> doPagedByTypeDefault(@PathVariable("type") String type) {
		return doPagedByType(type, 
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(),
				appProperties.getSystemConstant().getPagedDefault().getSizePage(),
				appProperties.getSystemConstant().getPagedDefault().getSortField(),
				appProperties.getSystemConstant().getPagedDefault().getSortDir(),
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@PostMapping("/accounts/createInternalAccount")
	public ResponseEntity<?> doCreateInternalAccount(@RequestBody AccountEntity account) {
		return ResponseEntity.ok().body(accountServ.create(account));
	}
	
	@PutMapping("/accounts/updateCustomer")
	public ResponseEntity<?> doUpdateAccount(@RequestBody AccountRoleUpdatePayload account) {
		return ResponseEntity.ok().body(accountServ.update(account));
	}
	
	@DeleteMapping("/accounts/deleteCustomer")
	public ResponseEntity<?> doDeleteAccount(@RequestBody EntityResponse entityResponse) {
		accountServ.deleteById(entityResponse.getId());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
}
