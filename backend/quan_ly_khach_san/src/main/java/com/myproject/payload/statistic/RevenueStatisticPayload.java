package com.myproject.payload.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueStatisticPayload {

	private int yearMax;
	private int quarterMax;
	private int monthMax;
	private int weekMax;
	private int dateMax;
	private Double totalMax;
	
	private int yearCurrent;
	private int quarterCurrent;
	private int monthCurrent;
	private int weekCurrent;
	private int dateCurrent;
	private Double totalCurrent;
	
}
