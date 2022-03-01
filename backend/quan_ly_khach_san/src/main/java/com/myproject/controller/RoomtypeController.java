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
import com.myproject.entity.RoomTypeEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.service.IRoomtypeServ;

@RestController
@RequestMapping("/api")
public class RoomtypeController {

	@Autowired
	private IRoomtypeServ roomtypeServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/roomtypes/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomType(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<RoomTypeEntity> paged = roomtypeServ.paged(currentPage, sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, paged.getTotalPages(), paged.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("roomTypes", paged.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
	}
	
	@GetMapping("/roomtypes")
	public ResponseEntity<?> doPagedRoomTypeDefault() {
		return doPagedRoomType(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@PostMapping(value = "/roomtypes")
	public ResponseEntity<?> doSaveRoomType(@RequestBody RoomTypeEntity roomType) {
		roomtypeServ.save(roomType);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@PutMapping("/roomtypes")
	public ResponseEntity<?> doUpdateRoomType(@RequestBody RoomTypeEntity roomType) {
		roomtypeServ.update(roomType);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/roomtype")
	public ResponseEntity<?> doDeleteOneRoomType(@RequestBody EntityResponse entityResponse) {
		roomtypeServ.deleteById(entityResponse.getId());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/roomtypes")
	public ResponseEntity<?> doDeleteManyRoomType(@RequestBody EntityResponse entityResponse) {
		roomtypeServ.deleteMany(entityResponse.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
