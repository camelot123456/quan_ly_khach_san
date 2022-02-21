package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[reservation_service]")
public class ReservationServiceEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;

	@Column(name = "[quantity]", columnDefinition = "int default 0")
	private Integer quantity;
	
	@Column(name = "[into_price]", columnDefinition = "float default 0")
	private Double intoPrice;
	
//	1 reservation_service - 1 reservation
	@ManyToOne
	@JoinColumn(name = "[id_reservation]")
	private ReservationEntity reservation;
	
//	1 reservation_service - 1 service
	@ManyToOne
	@JoinColumn(name = "[id_service]")
	private ServiceEntity service;
	
}
