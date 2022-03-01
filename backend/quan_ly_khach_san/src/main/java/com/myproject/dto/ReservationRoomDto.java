package com.myproject.dto;

import com.myproject.entity.ReservationEntity;
import com.myproject.entity.RoomEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRoomDto {

	private String id;
	private RoomEntity room;
	private ReservationEntity reservation;
	
}
