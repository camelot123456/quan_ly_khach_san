package com.myproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.myproject.entity.enums.ETransactionStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[transactions]")
@EntityListeners(AuditingEntityListener.class)
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
	
	@Column(name = "[deleted]", columnDefinition = "bit default 0")
	private Boolean deleted;

	@Enumerated(EnumType.STRING)
	@Column(name = "[status]", columnDefinition = "varchar(9)")
	private ETransactionStatus status;
	
	@Column(name = "[amount]", columnDefinition = "float default 0")
	private Double amount;
	
	@Column(name = "[name_customer]", columnDefinition = "nvarchar(50)")
	private String nameCustomer;
	
	@Column(name = "[email]", columnDefinition = "varchar(320)")
	private String email;
	
	@Column(name = "[address]", columnDefinition = "nvarchar(255)")
	private String address;
	
	@Column(name = "[phone_num]", columnDefinition = "char(15)")
	private String phoneNum;
	
	@Column(name = "[customer_num]", columnDefinition = "int")
	private Integer customerNum;
	
	@Column(name = "[discount]", columnDefinition = "float")
	private Double discount;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "[start_date]", columnDefinition = "datetime")
	private Date startDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "[end_date]", columnDefinition = "datetime")
	private Date endDate;
	
	@Column(name = "[total]", columnDefinition = "float")
	private Double total;
	
	@Column(name = "[tax_invoice]", columnDefinition = "float")
	private Double taxInvoice;
	
	@Column(name = "[tax_service]", columnDefinition = "float")
	private Double taxService;
	
	@Column(name = "[content]", columnDefinition = "nvarchar(max)")
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
	
//	----------------------------Transient-----------------------------------
	
	@Transient
	private String idAccount;
	
	@Transient
	private String nameAccount;
	
	@Transient
	private String idReservation;
	
	@Transient
	private String avatarAccount;
	
}



