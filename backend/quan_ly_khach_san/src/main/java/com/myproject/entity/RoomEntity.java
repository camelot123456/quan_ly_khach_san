package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.myproject.entity.enums.ERoomState;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[rooms]")
public class RoomEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	@Column(name = "[created_at]", columnDefinition = "datetime", updatable = false)
	protected Date createdAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	@Column(name = "[modified_at]", columnDefinition = "datetime")
	protected Date modifiedAt;
	

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
	
	@Column(name = "[floor]", columnDefinition = "int")
	private Integer floor;
	
//	1 room - n comment
	@JsonManagedReference("comment-room")
	@OneToMany(mappedBy = "room")
	private List<CommentEntity> comments;
	
//	1 room - n reservation_room
	@JsonManagedReference("room-reservation_room")
	@OneToMany(mappedBy = "room")
	private List<ReservationRoomEntity> reservationRoomArr;
	
//	1 room - 1 room_type
	@JsonBackReference("room-roomtype")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "[id_roomtype]")
	private RoomTypeEntity roomType;
	
//--------------------------transient-----------------------------------
	
	@Transient
	private String idRoomtype;
 
}

