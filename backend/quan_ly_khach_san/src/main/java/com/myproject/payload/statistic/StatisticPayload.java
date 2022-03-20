package com.myproject.payload.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticPayload {

	private Integer totalCustomer;
	private Double totalRevenue;
	private Integer totalStaff;
	private Integer totalTransaction;
	
	private Integer totalCustomerMember;
	private Integer totalCustomerGuest;
	
	
	
}
