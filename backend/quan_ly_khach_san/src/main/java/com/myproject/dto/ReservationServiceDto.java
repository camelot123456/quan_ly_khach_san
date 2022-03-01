package com.myproject.dto;

import com.myproject.entity.ReservationEntity;
import com.myproject.entity.ServiceEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationServiceDto {

	private String id;
	private Integer quantity;
	private Double intoPrice;
	private ReservationEntity reservation;
	private ServiceEntity service;
	
}
