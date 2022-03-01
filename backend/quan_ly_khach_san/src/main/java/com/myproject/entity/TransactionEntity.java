package com.myproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.myproject.entity.enums.ETransactionMode;
import com.myproject.entity.enums.ETransactionStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[transactions]")
public class TransactionEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	@Column(name = "[created_at]", columnDefinition = "datetime", updatable = false)
	protected Date createdAt;
	
	@CreatedBy
	@Column(name = "[created_by]", columnDefinition = "nvarchar(50)", updatable = false)
	protected String createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	@Column(name = "[modified_at]", columnDefinition = "datetime")
	protected Date modifiedAt;
	
	@LastModifiedBy
	@Column(name = "[modifiedBy]", columnDefinition = "nvarchar(50)")
	protected String modifiedBy;

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
	@JsonBackReference("transaction-account")
	@ManyToOne
	@JoinColumn(name = "[id_account]")
	private AccountEntity account;
	
//	1 transaction - 1 reservation
	@JsonBackReference("transaction-reservation")
	@ManyToOne
	@JoinColumn(name = "[id_reservation]")
	private ReservationEntity reservation;
}



