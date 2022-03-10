package com.myproject.payload.reservation;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationForTransaction {

	private String idRoomtype;
	private String nameRoomtype;
	private Double priceRoomtype;
	private String idReservation;
	private Date startDate;
	private Date endDate;
	private Date createdAt;
	private Integer customerNum;
	private Double taxService;
	private Double taxInvoice;
	private Double total;
	private Double grandTotal;
	private Double discount;
	private String idAccount;
	private String nameAccount;
	 
}
