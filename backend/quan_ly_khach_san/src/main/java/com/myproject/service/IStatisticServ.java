package com.myproject.service;

import java.util.List;

import com.myproject.payload.statistic.RevenueStatisticPayload;
import com.myproject.payload.statistic.StatisticPayload;

public interface IStatisticServ {

	public RevenueStatisticPayload revenueStatisticMaxByYear();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllYear();
	
	public RevenueStatisticPayload revenueStatisticByThisYear();


	public RevenueStatisticPayload revenueStatisticMaxByQuarter();
	
	public List<RevenueStatisticPayload> revenueStatisticMaxByAllQuarter();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllQuarter();
	
	public List<RevenueStatisticPayload> revenueStatisticByThisQuarter();


	public RevenueStatisticPayload revenueStatisticMaxByMonth();
	
	public List<RevenueStatisticPayload> revenueStatisticMaxByAllMonth();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllMonth();
	
	public List<RevenueStatisticPayload> revenueStatisticByThisMonth();


	public RevenueStatisticPayload revenueStatisticMaxByWeek();
	
	public List<RevenueStatisticPayload> revenueStatisticMaxByAllWeek();
	
	public List<RevenueStatisticPayload> revenueStatisticByAllWeek();
	
	public List<RevenueStatisticPayload> revenueStatisticByThisWeek();


	public RevenueStatisticPayload revenueStatisticMaxByDay();
	
	public RevenueStatisticPayload revenueStatisticByThisDay();


	public StatisticPayload getDataStatistic();
	
	
}
