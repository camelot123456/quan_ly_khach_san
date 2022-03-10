package com.myproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.TransactionEntity;

public interface ITransactionRepo extends JpaRepository<TransactionEntity, String>{
	
	@Query(value = "select t.*, a.avatar , a.name as nameAccount "
			+ "from transactions t inner join accounts a "
			+ "on t.id_account = a.id inner join reservations re "
			+ "on re.id = t.id_reservation "
			+ "where t.id like %?1% "
			+ "or t.created_at like %?1% "
			+ "or t.modified_at like %?1% "
			+ "or concat(t.amount, '') like %?1% "
			+ "or t.status like %?1% "
			+ "or a.id like %?1% "
			+ "or a.name like %?1% "
			+ "or t.id_reservation like %?1% "
			+ "order by t.modified_at asc",
			nativeQuery = true)
	public List<Object[]> pagedByKeyword(String keyword);
	
	@Query(value = "select distinct t.* "
			+ "from transactions t inner join reservations re "
			+ "on t.id_reservation = re.id"
			+ "where re.id = ?1 ",
			nativeQuery = true)
	public Optional<TransactionEntity> findByIdReservation(String idReservation);
	
	@Query(value = "select t.* "
			+ "from transactions t inner join accounts a "
			+ "on t.id_account = a.id"
			+ "where a.id = ?1 ",
			nativeQuery = true)
	public List<TransactionEntity> findAllByIdAccount(String idAccount);
	
}
