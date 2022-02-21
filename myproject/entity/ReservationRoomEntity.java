package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.myproject.entity.enums.ERoomState;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[reservation_room]")
public class ReservationRoomEntity extends AbstractEntity{

	@Enumerated(EnumType.STRING)
	@Column(name = "[status]", columnDefinition = "varchar(7)")
	private ERoomState status;
	
//	1 reservation_room - 1 reservation
	@ManyToOne
	@JoinColumn(name = "[id_reservation]")
	private ReservationEntity reservation;
	
//	1 reservation_room - 1 room
	@ManyToOne
	@JoinColumn(name = "[id_room]")
	private RoomEntity room;
	
}
