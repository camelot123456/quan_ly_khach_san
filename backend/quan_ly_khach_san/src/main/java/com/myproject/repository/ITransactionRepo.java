package com.myproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.myproject.entity.TransactionEntity;

public interface ITransactionRepo extends JpaRepository<TransactionEntity, String>{
	
	@Query(countName = "select count(*) from transactions t",
			value = "select * from transactions t",
			nativeQuery = true)
	public Page<TransactionEntity> pagedNoKeyword(Pageable pageable);
	
	@Query(value = "select * from transactions t "
			+ "where t.id like %?2% "
			+ "or t.code like %?2%",
			nativeQuery = true)
	public Page<TransactionEntity> pagedByKeyword(String keyword, Pageable pageable);
	
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
