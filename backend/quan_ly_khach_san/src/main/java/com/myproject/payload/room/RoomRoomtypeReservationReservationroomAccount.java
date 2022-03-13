
package com.myproject.payload.room;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRoomtypeReservationReservationroomAccount {

	private String idRoom;
	private String roomNum;
	private String roomState;
	private Integer floor;
	private String nameAccount;
	private String phoneNum;
	private String idRoomType;
	private String idReservation;
	private String idTransaction;
	private Date startDate;
	private Date endDate;
	
}
