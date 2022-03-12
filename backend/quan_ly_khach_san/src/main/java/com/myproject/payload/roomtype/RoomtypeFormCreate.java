package com.myproject.payload.roomtype;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomtypeFormCreate {

	private String id;
	private String name;
	private Double price;
	private String description;
	private String avatarUrl;
	private String idRoomtypePhoto;
	private Boolean isImgFile;
	
}
