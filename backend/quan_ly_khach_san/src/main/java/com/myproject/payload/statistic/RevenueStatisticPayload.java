package com.myproject.payload.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueStatisticPayload {

	private int year;
	private int quarter;
	private int month;
	private int week;
	private int date;
	private Double total;
	
}
