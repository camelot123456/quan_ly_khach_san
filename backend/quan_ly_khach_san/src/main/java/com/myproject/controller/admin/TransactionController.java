package com.myproject.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.entity.TransactionEntity;
import com.myproject.entity.enums.ETransactionMode;
import com.myproject.entity.enums.ETransactionStatus;
import com.myproject.payload.ApiResponse;
import com.myproject.service.ITransactionServ;

@RestController("admin-transaction")
@RequestMapping("/api/admin")
public class TransactionController {

	@Autowired
	private ITransactionServ transactionServ;
	
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
