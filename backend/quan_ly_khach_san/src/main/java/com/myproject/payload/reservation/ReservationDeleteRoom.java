package com.myproject.payload.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDeleteRoom {

	private String idReservation;
	private String idRoom;
	
}
