package com.myproject.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.config.AppProperties;
import com.myproject.entity.RoomEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.service.IRoomServ;

@RestController
@RequestMapping("/api")
public class RoomController {

	@Autowired
	private IRoomServ roomServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/rooms/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<RoomEntity> paged = roomServ.paged(currentPage, sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, paged.getTotalPages(), paged.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("rooms", paged.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
	}
	
	@GetMapping("/rooms")
	public ResponseEntity<?> doPagedRoomDefault() {
		return doPagedRoomList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@PostMapping(value = "/rooms")
	public ResponseEntity<?> doSaveroom(@RequestBody RoomEntity room) {
		roomServ.save(room);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@PutMapping("/rooms")
	public ResponseEntity<?> doUpdateroom(@RequestBody RoomEntity room) {
		roomServ.update(room);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/rooms/{idRoom}")
	public ResponseEntity<?> doDeleteOneroom(@PathVariable("idRoom") String idRoom) {
		roomServ.deleteById(idRoom);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/rooms")
	public ResponseEntity<?> doDeleteOneroom(@RequestBody RoomEntity room) {
		roomServ.deleteMany(room.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
