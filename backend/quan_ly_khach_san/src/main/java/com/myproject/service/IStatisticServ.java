package com.myproject.service;

import java.util.List;

import com.myproject.payload.statistic.RevenueStatisticPayload;
import com.myproject.payload.statistic.StatisticPayload;

public interface IStatisticServ {

	public RevenueStatisticPayload revenueStatisticMaxByYear();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllYear();
	
	public RevenueStatisticPayload revenueStatisticByThisYear();


	public List<RevenueStatisticPayload> revenueStatisticMaxByQuarter();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllQuarter();
	
	public List<RevenueStatisticPayload> revenueStatisticByThisQuarter();


	public RevenueStatisticPayload revenueStatisticMaxByMonth();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllMonth();
	
	public RevenueStatisticPayload revenueStatisticByThisMonth();


	public RevenueStatisticPayload revenueStatisticMaxByWeek();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllWeek();
	
	public RevenueStatisticPayload revenueStatisticByThisWeek();


	public RevenueStatisticPayload revenueStatisticMaxByDay();
	
	public RevenueStatisticPayload revenueStatisticByThisDay();


	public StatisticPayload getDataStatistic();
	
	
}
