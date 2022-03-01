package com.myproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.entity.RoomTypePhotoEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.service.IRoomTypePhotoServ;

@RestController
@RequestMapping("/api")
public class RoomTypePhotoController {

	@Autowired
	private IRoomTypePhotoServ roomTypePhotoServ;
	
	@GetMapping("/roomTypePhotos/{idRoomType}")
	public ResponseEntity<?> doShowRoomTypePhotoByIdRoomType(@PathVariable("idRoomType") String idRoomType) {
		return ResponseEntity.ok().body(roomTypePhotoServ.findAllById(idRoomType));
	}
	
	@PostMapping(value = "/roomTypePhotos")
	public ResponseEntity<?> doSaveRoomTypePhoto(@RequestBody RoomTypePhotoEntity roomTypePhoto) {
		roomTypePhotoServ.save(roomTypePhoto);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@PutMapping("/roomTypePhotos")
	public ResponseEntity<?> doUpdateRoomTypePhoto(@RequestBody RoomTypePhotoEntity roomTypePhoto) {
		roomTypePhotoServ.updateAvatarState(roomTypePhoto);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/roomTypePhoto")
	public ResponseEntity<?> doDeleteOneRoomTypePhoto(@RequestBody EntityResponse entityResponse) {
		roomTypePhotoServ.deleteById(entityResponse.getId());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/roomTypePhotos")
	public ResponseEntity<?> doDeleteManyRoomTypePhoto(@RequestBody EntityResponse entityResponse) {
		roomTypePhotoServ.deleteMany(entityResponse.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
