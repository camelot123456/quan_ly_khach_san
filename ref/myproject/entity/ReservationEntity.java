package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[reservations]")
public class ReservationEntity extends AbstractEntity{

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
	@ManyToOne
	@JoinColumn(name = "[id_account]")
	private AccountEntity account;
	
//	1 reservation - n transaction
	@OneToMany(mappedBy = "reservation")
	private List<TransactionEntity> transactions;
	
//	1 reservation - n reservation_room
	@OneToMany(mappedBy = "reservation")
	private List<ReservationRoomEntity> reservationRoomArr;
	
//	1 reservation - n reservation_service
	@OneToMany(mappedBy = "reservation")
	private List<ReservationServiceEntity> reservationServiceArr;
}
