package com.myproject.payload.reservation;

import java.util.Date;
import java.util.Set;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.ServiceEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCustom {
	
	private Date startDate;
	private Date endDate;
	private Integer customerNum;
	private AccountEntity customer;
	private String idRoomtype;
	private String[] rooms;
	private Set<ServiceEntity> services;
	
}
