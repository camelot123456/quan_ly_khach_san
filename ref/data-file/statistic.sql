-- Năm có doanh thu cao nhất
select top 1 DATEPART(yyyy, t.created_at) as years,  sum(t.amount) as total
from transactions t 
group by DATEPART(yyyy, t.created_at)
order by sum(t.amount) desc

-- Thống kê doanh thu theo năm
select top 10 DATEPART(yyyy, t.created_at) as years,  sum(t.amount) as total
from transactions t 
group by DATEPART(yyyy, t.created_at)
order by DATEPART(yyyy, t.created_at) desc

-- Doanh thu của năm nay
select top 1 DATEPART(yyyy, t.created_at) as years,  sum(t.amount) as total
from transactions t 
where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate())
group by DATEPART(yyyy, t.created_at)
order by sum(t.amount) desc



-- thống kê doanh thu theo quý của mỗi năm
select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total
from transactions t 
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)

-- thống kê doanh thu theo quý của năm hiện tại
select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total
from transactions t 
where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc)
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)

-- quý của năm có doanh thu cao nhất
select top 1 DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total
from transactions t 
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)
order by sum(t.amount) desc

-- thống kê doanh thu theo quý của năm hiện tại
select DATEPART(yyyy, t.created_at) as years , DATEPART(qq, t.created_at) as quarters, sum(t.amount) as total
from transactions t 
where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate())
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at)




-- thống kê doanh thu theo tháng
select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total
from transactions t
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)

-- thống kê doanh thu theo thang của năm có doanh thu cao nhất
select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total
from transactions t
where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc)
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)

-- tháng của năm có doanh thu cao nhất
select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total
from transactions t
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)
order by sum(t.amount) desc

-- thống kê doanh thu theo tháng của năm hiện tại
select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months, sum(t.amount) as total
from transactions t
where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate())
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at)



-- thống kê doanh thu theo tuần
select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total
from transactions t
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)

-- thống kê doanh thu theo tuan của năm có doanh thu cao nhất
select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total
from transactions t
where DATEPART(yyyy, t.created_at) = (select top 1 DATEPART(yyyy, t.created_at) from transactions t group by DATEPART(yyyy, t.created_at) order by sum(t.amount) desc)
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)

-- tuần của năm có doanh thu cao nhất
select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total
from transactions t 
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)
order by sum(t.amount) desc

-- doanh thu theo tuần của năm hiện tại
select DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, sum(t.amount) as total
from transactions t
where DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate()) and DATEPART(ww, t.created_at) = DATEPART(ww, getdate())
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)
order by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at)




-- ngày có doanh thu cao nhất
select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, DATEPART(dd, t.created_at) as days, sum(t.amount) as total
from transactions t 
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at), DATEPART(dd, t.created_at)
order by sum(t.amount) desc

-- doanh thu của ngày hôm nay
select top 1 DATEPART(yyyy, t.created_at) as years, DATEPART(qq, t.created_at) as quarters , DATEPART(mm, t.created_at) as months , DATEPART(ww, t.created_at) as weeks, DATEPART(dd, t.created_at) as days, sum(t.amount) as total
from transactions t 
where DATEPART(dd, t.created_at) = DATEPART(dd, getdate()) and DATEPART(yyyy, t.created_at) = DATEPART(yyyy, getdate())
group by DATEPART(yyyy, t.created_at), DATEPART(qq, t.created_at), DATEPART(mm, t.created_at), DATEPART(ww, t.created_at), DATEPART(dd, t.created_at)
order by sum(t.amount) desc





--thống kê số lượng khách hàng có account
select count(distinct a.id) as total_customer_account
from accounts a inner join account_role ar 
on a.id = ar.id_account inner join roles r 
on ar.id_role = r.id 
where a.auth_provider in ('LOCAL', 'GOOGLE', 'FACEBOOK') and r.code = 'MEMBER'

--thống kê số lượng khách hàng không account
select count(distinct a.id) as total_customer_no_account
from accounts a inner join account_role ar 
on a.id = ar.id_account inner join roles r 
on ar.id_role = r.id 
where a.auth_provider in ('NO_ACCOUNT') and r.code = 'MEMBER'

--thống kê số lượng nhân viên
select count(distinct a.id) as total_internal
from accounts a inner join account_role ar 
on a.id = ar.id_account inner join roles r 
on ar.id_role = r.id 
where a.auth_provider = 'LOCAL' and r.code in ('DIRECTOR', 'ACCOUNTANT', 'BUSINESS', 'RECEPTIONISTS')


-- thống kê tổng số lần giao dịch
select count(t.id) as total_transaction
from transactions t

-- thống kê tổng doanh thu doanh thu
select sum(t.amount) as total_revenue
from transactions t 



 


select 
(select sum(t.amount) from transactions t) as total_revenue,
(select count(t.id) from transactions t) as total_transaction,
(select count(distinct a.id)
from accounts a inner join account_role ar on a.id = ar.id_account inner join roles r on ar.id_role = r.id 
where a.auth_provider = 'LOCAL' and r.code in ('DIRECTOR', 'ACCOUNTANT', 'BUSINESS', 'RECEPTIONISTS')) as total_internal,
(select count(distinct a.id) from accounts a inner join account_role ar 
on a.id = ar.id_account inner join roles r on ar.id_role = r.id 
where a.auth_provider in ('NO_ACCOUNT') and r.code = 'MEMBER')  as total_customer_no_account,
(select count(distinct a.id) from accounts a inner join account_role ar 
on a.id = ar.id_account inner join roles r on ar.id_role = r.id 
where a.auth_provider in ('LOCAL', 'GOOGLE', 'FACEBOOK') and r.code = 'MEMBER')  as total_customer_account