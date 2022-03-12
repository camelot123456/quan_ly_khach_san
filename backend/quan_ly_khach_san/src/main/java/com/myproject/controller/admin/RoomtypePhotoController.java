package com.myproject.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.service.IRoomTypePhotoServ;

@RestController("admin-roomtypePhoto")
@RequestMapping("/api/admin")
public class RoomtypePhotoController {

	@Autowired
	private IRoomTypePhotoServ roomtypePhotoServ;
	
	@GetMapping("/roomtypePhotos")
	public ResponseEntity<?> showRoomtypePhotoByIdRoomtype(@Param("idRoomtype") String idRoomtype) {
		return ResponseEntity.ok().body(roomtypePhotoServ.findAllByIdRoomtype(idRoomtype));
	}
	
}
