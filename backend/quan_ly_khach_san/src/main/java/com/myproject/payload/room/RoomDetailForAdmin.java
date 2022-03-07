package com.myproject.payload.room;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDetailForAdmin {

	private String idRoom;
	private Date createAtRoom;
	private Date modifiedAtRoom;
	private Integer customerNumRoom;
	private String descriptionRoom;
	private String floor;
	private Double incurredPrice;
	private String roomNum;
	private String roomState;
	
	private String idRoomtype;
	private String avatarRoomtype;
	private String nameRoomtype;
	private Double price;
	private String descriptionRoomtype;
	
	private String idReservation;
	private Date createAtReservation;
	private String createByReservation;
	private Date startDate;
	private Date endDate;
	private Integer customerNumReservation;
	private Double discount;
	private Integer taxService;
	private Integer taxInvoice;
	private Double total;
	private Double grandTotal;
	
	private String idAccount;
	private String nameAccount;
	private String phoneNum;
	private String address;
	private String avatar;
	private String email;
	
	private String idTransaction;
	
	
	
}
