package com.myproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.service.ITransactionServ;

@RestController
@RequestMapping("/api")
public class TransactionController {

	@Autowired
	private ITransactionServ transactionServ;
	
	@GetMapping("/transactions/customer")
	public ResponseEntity<?> showTransaction(@Param("idCustomer") String idCustomer) {
		return ResponseEntity.ok().body(transactionServ.findAllByIdAccount(idCustomer));
	}
	
}
