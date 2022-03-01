package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[reservation_room]")
public class ReservationRoomEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
//	1 reservation_room - 1 reservation
	@JsonBackReference("reservation-reservation_room")
	@ManyToOne
	@JoinColumn(name = "[id_reservation]")
	private ReservationEntity reservation;
	
//	1 reservation_room - 1 room
	@JsonBackReference("room-reservation_room")
	@ManyToOne
	@JoinColumn(name = "[id_room]")
	private RoomEntity room;
	
}
