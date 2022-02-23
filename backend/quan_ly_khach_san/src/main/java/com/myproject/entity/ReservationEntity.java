package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[reservations]")
public class ReservationEntity {
	
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
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "[deleted_at]", columnDefinition = "datetime")
	protected Date deletedAt;
	
	@Column(name = "[deleted_by]", columnDefinition = "nvarchar(50)")
	protected String deletedBy;
	
	@Column(name = "[deleted]", columnDefinition = "bit")
	protected Boolean deleted;

	@Temporal(TemporalType.DATE)
	@Column(name = "[start_date]", columnDefinition = "datetime")
	private Date startDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "[end_date]", columnDefinition = "datetime")
	private Date endDate;
	
	@Column(name = "[customer_num]", columnDefinition = "int default 1")
	private Integer customerNum;
	
	@Column(name = "[discount]", columnDefinition = "float default 0")
	private Double discount;
	
	@Column(name = "[total]", columnDefinition = "float default 0")
	private Double total;
	
	@Column(name = "[tax_invoice]", columnDefinition = "int default 0")
	private Integer taxInvoice;
	
	@Column(name = "[tax_service]", columnDefinition = "int default 0")
	private Integer taxService;
	
	@Column(name = "[grand_total]", columnDefinition = "float default 0")
	private Double grandTotal;
	
//	1 reservation - 1 account
	@JsonBackReference("reservation-account")
	@ManyToOne
	@JoinColumn(name = "[id_account]")
	private AccountEntity account;
	
//	1 reservation - n transaction
	@JsonManagedReference("transaction-reservation")
	@OneToMany(mappedBy = "reservation")
	private List<TransactionEntity> transactions;
	
//	1 reservation - n reservation_room
	@JsonManagedReference("reservation-reservation_room")
	@OneToMany(mappedBy = "reservation")
	private List<ReservationRoomEntity> reservationRoomArr;
	
//	1 reservation - n reservation_service
	@JsonManagedReference("reservation-reservation_service")
	@OneToMany(mappedBy = "reservation")
	private List<ReservationServiceEntity> reservationServiceArr;
}
