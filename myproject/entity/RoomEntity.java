package com.myproject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
@Table(name = "[rooms]")
public class RoomEntity extends AbstractEntity{

	@Column(name = "[room_num]", columnDefinition = "char(5)")
	private String roomNum;
	
	@Column(name = "[customer_num]", columnDefinition = "int default 0")
	private Integer customerNum;
	
	@Column(name = "[incurred_price]", columnDefinition = "float default 0")
	private Double incurredPrice;
	
	@Column(name = "[description]", columnDefinition = "nvarchar(max)")
	private String description;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "[room_state]", columnDefinition = "varchar(7)")
	private ERoomState roomState;
	
	@Column(name = "[floor]", columnDefinition = "char(2)")
	private String floor;
	
//	1 room - n comment
	@OneToMany(mappedBy = "room")
	private List<CommentEntity> comments;
	
//	1 room - n reservation_room
	@OneToMany(mappedBy = "room")
	private List<ReservationRoomEntity> reservationRoomArr;
	
//	1 room - 1 room_type
	@ManyToOne
	@JoinColumn(name = "id_roomtype")
	private RoomTypeEntity roomType;
}

