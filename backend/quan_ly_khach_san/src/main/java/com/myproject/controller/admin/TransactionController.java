package com.myproject.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.config.AppProperties;
import com.myproject.entity.TransactionEntity;
import com.myproject.entity.enums.ETransactionMode;
import com.myproject.entity.enums.ETransactionStatus;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.service.ITransactionServ;

@RestController("admin-transaction")
@RequestMapping("/api/admin")
public class TransactionController {

	@Autowired
	private ITransactionServ transactionServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/transactions/page/{currentPage}")
	public ResponseEntity<?> doPagedTransactionList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		
		Page<TransactionEntity> transactions = transactionServ.paged(currentPage, sizePage, sortField, sortDir, keyword);
		
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, transactions.getTotalPages(), transactions.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("transactions", transactions.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
		
	}
	
	@GetMapping("/transactions")
	public ResponseEntity<?> doPagedTransactionDefault() {
		return doPagedTransactionList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@GetMapping("/transactions/constant")
	public ResponseEntity<?> doShowConstantTransaction() {
		Map<String, Object> responses = new HashMap<String, Object>();
		responses.put("transactionMode", ETransactionMode.class.getEnumConstants());
		responses.put("transactionStatus", ETransactionStatus.class.getEnumConstants());
		return ResponseEntity.ok().body(responses);
	}
	
	@PostMapping("/transactions/payment")
	public ResponseEntity<?> doPayment(@RequestBody TransactionEntity transaction) {
		transactionServ.doPayment(transaction);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
}
