package com.myproject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[roomtypes]")
public class RoomTypeEntity extends AbstractEntity{

	@Column(name = "[name]", columnDefinition = "nvarchar(64)")
	private String name;
	
	@Column(name = "[price]", columnDefinition = "float default 0")
	private Double price;
	
	@Column(name = "[description]", columnDefinition = "nvarchar(max)")
	private String description;
	
//	1 room_type - n room
	@OneToMany(mappedBy = "roomType")
	private List<RoomEntity> rooms;
	
//	1 room_type - n room_type_photos
	@OneToMany(mappedBy = "roomType")
	private List<RoomTypePhotoEntity> roomTypePhotoArr;
	
}
