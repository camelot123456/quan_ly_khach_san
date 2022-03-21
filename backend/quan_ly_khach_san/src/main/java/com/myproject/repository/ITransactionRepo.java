package com.myproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.TransactionEntity;

public interface ITransactionRepo extends JpaRepository<TransactionEntity, String>{
	
	@Query(value = "select t.* "
			+ "from transactions t "
			+ "where t.id like %?1% "
			+ "or t.created_at like %?1% "
			+ "or t.modified_at like %?1% "
			+ "or concat(t.amount, '') like %?1% "
			+ "or t.status like %?1% "
			+ "or t.name_customer like '%%' "
			+ "or concat(t.total, '') like '%%' "
			+ "or t.phone_num like '%%' "
			+ "or t.email like '%%' "
			+ "or t.[address] like '%%' "
			+ "order by t.modified_at desc",
			nativeQuery = true)
	public List<Object[]> pagedByKeyword(String keyword);
	
	@Query(value = "select distinct t.* "
			+ "from transactions t inner join reservations re "
			+ "on t.id_reservation = re.id "
			+ "where re.id = ?1 ",
			nativeQuery = true)
	public Optional<TransactionEntity> findByIdReservation(String idReservation);
	
	@Query(value = "select t.* "
			+ "from transactions t inner join accounts a "
			+ "on t.id_account = a.id "
			+ "where a.id = ?1 ",
			nativeQuery = true)
	public List<TransactionEntity> findAllByIdAccount(String idAccount);
	
//	--------------------------------------statistic------------------------------------------
	
	@Query(value = "select top 1 DATEPART(yyyy, t.created_at) as years,  sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at) "
			+ "order by sum(t.amount) desc",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByYear();
	
	@Query(value = "select top 10 DATEPART(yyyy, t.created_at) as years,  sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByAllYear();
	
	@Query(value = "select top 1 DATEPART(yyyy, t.created_at) as years,  sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate()) "
			+ "group by DATEPART(yyyy, t.created_at) "
			+ "order by sum(t.amount) desc",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByThisYear();
	
	
	
	
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc) "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByQuarter();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc) "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByAllQuarter();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByAllQuarter();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate())  and DATEPART(qq, t.created_at) = DATEPART(qq, getdate())"
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByThisQuarter();
	
	
	
	
	
	
	@Query(value = "select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at) "
			+ "order by sum(t.amount) desc",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByMonth();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc) "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByAllMonth();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByAllMonth();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate()) and DATEPART(mm, t.created_at) = DATEPART(mm, getdate())"
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByThisMonth();
	
	
	
	
	
	
	@Query(value = "select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at) "
			+ "order by sum(t.amount) desc",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByWeek();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc) "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByAllWeek();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByAllWeek();
	
	@Query(value = "select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate()) and DATEPART(ww, t.created_at) = DATEPART(ww, getdate()) "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at) "
			+ "order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByThisWeek();
	
	
	
	
	
	
	@Query(value = "select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, DATEPART(dd, t.created_at) as days, sum(t.amount) as total "
			+ "from transactions t "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at), DATEPART(dd, t.created_at) "
			+ "order by sum(t.amount) desc ",
			nativeQuery = true)
	public List<Object[]> revenueStatisticMaxByDay();
	
	@Query(value = "select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, DATEPART(dd, t.created_at) as days, sum(t.amount) as total "
			+ "from transactions t "
			+ "where DATEPART(dd, t.created_at) = DATEPART(dd, getdate()) and DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate()) "
			+ "group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at), DATEPART(dd, t.created_at) "
			+ "order by sum(t.amount) desc ",
			nativeQuery = true)
	public List<Object[]> revenueStatisticByThisDay();
	
	
	
	
	
	@Query(value = "select "
			+ "(select sum(t.amount) from transactions t) as total_revenue, "
			+ "(select count(t.id) from transactions t) as total_transaction, "
			+ "(select count(distinct a.id) "
			+ "from accounts a inner join account_role ar on a.id = ar.id_account inner join roles r on ar.id_role = r.id "
			+ "where a.auth_provider = 'LOCAL' and r.code in ('DIRECTOR', 'ACCOUNTANT', 'BUSINESS', 'RECEPTIONISTS')) as total_internal, "
			+ "(select count(distinct a.id) from accounts a inner join account_role ar "
			+ "on a.id = ar.id_account inner join roles r on ar.id_role = r.id "
			+ "where a.auth_provider in ('NO_ACCOUNT') and r.code = 'MEMBER')  as total_customer_no_account, "
			+ "(select count(distinct a.id) from accounts a inner join account_role ar "
			+ "on a.id = ar.id_account inner join roles r on ar.id_role = r.id "
			+ "where a.auth_provider in ('LOCAL', 'GOOGLE', 'FACEBOOK') and r.code = 'MEMBER')  as total_customer_account",
		nativeQuery = true)
	public List<Object[]> getDataStatistic();
	
}
