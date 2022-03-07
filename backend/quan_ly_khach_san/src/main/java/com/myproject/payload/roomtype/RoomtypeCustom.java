package com.myproject.payload.roomtype;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomtypeCustom {

	private String id;
	private String name;
	private Double price;
	private String description;
	private Date createdAt;
	private Date modifiedAt;
	private String avatarUrl;
	
}
