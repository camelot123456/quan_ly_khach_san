package com.myproject.payload.service;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceOfInvoice {

	private String idService;
	private Date createdAt;
	private Date modifiedAt;
	private String name;
	private String avatarUrl;
	private Double price;
	private Integer quantity;
	private Double intoPrice;
	private String idReservationService;
	
}
