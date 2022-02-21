package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[roomtype_photo]")
public class RoomTypePhotoEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;

	@Column(name = "[avatar]", columnDefinition = "bit")
	private Boolean avatar;
	
	@Column(name = "[url]", columnDefinition = "nvarchar(255)")
	private String url;
	
//	1 room_type_photo - 1 room_type
	@ManyToOne
	@JoinColumn(name = "[id_roomtype]")
	private RoomTypeEntity roomType;
	
}
