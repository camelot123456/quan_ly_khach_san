package com.myproject.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.service.IStatisticServ;

@RestController
@RequestMapping("/api/admin")
public class StatisticController {

	@Autowired
	private IStatisticServ statisticServ;
	
	@GetMapping("/statistic")
	public ResponseEntity<?> showStatisticList() {
		Map<String, Object> res = new HashMap<String, Object>();
		
		res.put("revenueStatisticMaxByYear", statisticServ.revenueStatisticMaxByYear());
		res.put("revenueStatisticByAllYear", statisticServ.revenueStatisticByAllYear());
		res.put("revenueStatisticByThisYear", statisticServ.revenueStatisticByThisYear());
		
		res.put("revenueStatisticMaxByQuarter", statisticServ.revenueStatisticMaxByQuarter());
		res.put("revenueStatisticByAllQuarter", statisticServ.revenueStatisticByAllQuarter());
		res.put("revenueStatisticByThisQuarter", statisticServ.revenueStatisticByThisQuarter());
		
		res.put("revenueStatisticMaxByMonth", statisticServ.revenueStatisticMaxByMonth());
		res.put("revenueStatisticByAllMonth", statisticServ.revenueStatisticByAllMonth());
		res.put("revenueStatisticByThisMonth", statisticServ.revenueStatisticByThisMonth());
		
		res.put("revenueStatisticMaxByWeek", statisticServ.revenueStatisticMaxByWeek());
		res.put("revenueStatisticByAllWeek", statisticServ.revenueStatisticByAllWeek());
		res.put("revenueStatisticByThisWeek", statisticServ.revenueStatisticMaxByYear());
		
		res.put("revenueStatisticMaxByDay", statisticServ.revenueStatisticMaxByDay());
		res.put("revenueStatisticByThisDay", statisticServ.revenueStatisticByThisDay());
		
		res.put("statisticPayload", statisticServ.getDataStatistic());
		return ResponseEntity.ok().body(res);
	}
	
}
