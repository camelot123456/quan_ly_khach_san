package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.myproject.entity.enums.ETransactionMode;
import com.myproject.entity.enums.ETransactionStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[transactions]")
public class TransactionEntity extends AbstractEntity{

	@Enumerated(EnumType.STRING)
	@Column(name = "[status]", columnDefinition = "varchar(9)")
	private ETransactionStatus status;
	
	@Column(name = "[code]", columnDefinition = "varchar(64)")
	private String code;
	
	@Enumerated(EnumType.STRING)
	@Column(name =  "[mode]", columnDefinition = "varchar(7)")
	private ETransactionMode mode;
	
	@Column(name = "[amount]", columnDefinition = "float default 0")
	private Double amount;
	
	@Column(name = "[content]", columnDefinition = "nvarchar(255)")
	private String content;
	
//	1 transaction - 1 account
	
	@ManyToOne
	@JoinColumn(name = "[id_account]")
	private AccountEntity account;
	
//	1 transaction - 1 reservation
	
	@ManyToOne
	@JoinColumn(name = "[id_reservation]")
	private ReservationEntity reservation;
}



