package com.myproject.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.payload.statistic.RevenueStatisticPayload;
import com.myproject.payload.statistic.StatisticPayload;
import com.myproject.repository.ITransactionRepo;
import com.myproject.service.IStatisticServ;

@Service
public class StatisticServ implements IStatisticServ{

	@Autowired
	private ITransactionRepo transactionRepo;
	
	@Override
	public RevenueStatisticPayload revenueStatisticMaxByYear() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticMaxByYear().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setTotal((Double) records[1]);
		return payload;
	}

	@Override
	public List<RevenueStatisticPayload> revenueStatisticByAllYear() {
		// TODO Auto-generated method stub
		List<Object[]> statistics = transactionRepo.revenueStatisticByAllYear();
		List<RevenueStatisticPayload> payloads = null;
		if (statistics.size() > 0) {
			payloads = new ArrayList<RevenueStatisticPayload>();
			for (Object[] records : statistics) {
				RevenueStatisticPayload payload = new RevenueStatisticPayload();
				
				payload.setYear((int) records[0]);
				payload.setTotal((Double) records[1]);
				
				payloads.add(payload);
			}
		}
		return payloads;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticByThisYear() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticByThisYear().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setTotal((Double) records[1]);
		return payload;
	}

	@Override
	public List<RevenueStatisticPayload> revenueStatisticMaxByQuarter() {
		// TODO Auto-generated method stub
		List<Object[]> statistics = transactionRepo.revenueStatisticMaxByQuarter();
		List<RevenueStatisticPayload> payloads = null;
		if (statistics.size() > 0) {
			payloads = new ArrayList<RevenueStatisticPayload>();
			for (Object[] records : statistics) {
				RevenueStatisticPayload payload = new RevenueStatisticPayload();
				
				payload.setYear((int) records[0]);
				payload.setQuarter((int) records[1]);
				payload.setTotal((Double) records[2]);
				
				payloads.add(payload);
			}
		}
		return payloads;
	}

	@Override
	public List<RevenueStatisticPayload> revenueStatisticByAllQuarter() {
		// TODO Auto-generated method stub
		List<Object[]> statistics = transactionRepo.revenueStatisticByAllQuarter();
		List<RevenueStatisticPayload> payloads = null;
		if (statistics.size() > 0) {
			payloads = new ArrayList<RevenueStatisticPayload>();
			for (Object[] records : statistics) {
				RevenueStatisticPayload payload = new RevenueStatisticPayload();
				
				payload.setYear((int) records[0]);
				payload.setQuarter((int) records[1]);
				payload.setTotal((Double) records[2]);
				
				payloads.add(payload);
			}
		}
		return payloads;
	}

	@Override
	public List<RevenueStatisticPayload> revenueStatisticByThisQuarter() {
		// TODO Auto-generated method stub
		List<Object[]> statistics = transactionRepo.revenueStatisticByThisQuarter();
		List<RevenueStatisticPayload> payloads = null;
		if (statistics.size() > 0) {
			payloads = new ArrayList<RevenueStatisticPayload>();
			for (Object[] records : statistics) {
				RevenueStatisticPayload payload = new RevenueStatisticPayload();
				
				payload.setYear((int) records[0]);
				payload.setQuarter((int) records[1]);
				payload.setTotal((Double) records[2]);
				
				payloads.add(payload);
			}
		}
		return payloads;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticMaxByMonth() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticMaxByMonth().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setQuarter((int) records[1]);
		payload.setMonth((int) records[2]);
		payload.setTotal((Double) records[3]);
		return payload;
	}

	@Override
	public List<RevenueStatisticPayload> revenueStatisticByAllMonth() {
		// TODO Auto-generated method stub
		List<Object[]> statistics = transactionRepo.revenueStatisticByAllMonth();
		List<RevenueStatisticPayload> payloads = null;
		if (statistics.size() > 0) {
			payloads = new ArrayList<RevenueStatisticPayload>();
			for (Object[] records : statistics) {
				RevenueStatisticPayload payload = new RevenueStatisticPayload();
				
				payload.setYear((int) records[0]);
				payload.setQuarter((int) records[1]);
				payload.setMonth((int) records[2]);
				payload.setTotal((Double) records[3]);
				
				payloads.add(payload);
			}
		}
		return payloads;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticByThisMonth() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticByThisMonth().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setQuarter((int) records[1]);
		payload.setMonth((int) records[2]);
		payload.setTotal((Double) records[3]);
		return payload;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticMaxByWeek() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticMaxByWeek().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setQuarter((int) records[1]);
		payload.setMonth((int) records[2]);
		payload.setWeek((int) records[3]);
		payload.setTotal((Double) records[4]);
		return payload;
	}

	@Override
	public List<RevenueStatisticPayload> revenueStatisticByAllWeek() {
		// TODO Auto-generated method stub
		List<Object[]> statistics = transactionRepo.revenueStatisticByAllWeek();
		List<RevenueStatisticPayload> payloads = null;
		if (statistics.size() > 0) {
			payloads = new ArrayList<RevenueStatisticPayload>();
			for (Object[] records : statistics) {
				RevenueStatisticPayload payload = new RevenueStatisticPayload();
				
				payload.setYear((int) records[0]);
				payload.setQuarter((int) records[1]);
				payload.setMonth((int) records[2]);
				payload.setWeek((int) records[3]);
				payload.setTotal((Double) records[4]);
				
				payloads.add(payload);
			}
		}
		return payloads;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticByThisWeek() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticByThisWeek().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setQuarter((int) records[1]);
		payload.setMonth((int) records[2]);
		payload.setWeek((int) records[3]);
		payload.setTotal((Double) records[4]);
		return payload;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticMaxByDay() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticMaxByDay().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setQuarter((int) records[1]);
		payload.setMonth((int) records[2]);
		payload.setWeek((int) records[3]);
		payload.setDate((int) records[4]);
		payload.setTotal((Double) records[5]);
		return payload;
	}

	@Override
	public RevenueStatisticPayload revenueStatisticByThisDay() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.revenueStatisticByThisDay().get(0);
		RevenueStatisticPayload payload = new RevenueStatisticPayload();
		
		payload.setYear((int) records[0]);
		payload.setQuarter((int) records[1]);
		payload.setMonth((int) records[2]);
		payload.setWeek((int) records[3]);
		payload.setDate((int) records[4]);
		payload.setTotal((Double) records[5]);
		return payload;
	}

	@Override
	public StatisticPayload getDataStatistic() {
		// TODO Auto-generated method stub
		Object[] records = transactionRepo.getDataStatistic().get(0);
		StatisticPayload payload = new StatisticPayload();
		
		payload.setTotalRevenue((double) records[0]);
		payload.setTotalTransaction((int) records[1]);
		payload.setTotalStaff((int) records[2]);
		payload.setTotalCustomerGuest((int) records[3]);
		payload.setTotalCustomerMember((int) records[4]);
		payload.setTotalCustomer(payload.getTotalCustomerMember() + payload.getTotalCustomerGuest());
		return payload;
	}

}
