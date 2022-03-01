package com.myproject.controller.admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.config.AppProperties;
import com.myproject.payload.PagedResponse;
import com.myproject.payload.room.RoomRoomtypeReservationReservationroomAccount;
import com.myproject.service.IRoomServ;

@RestController(value = "admin-room")
@RequestMapping("/api")
public class RoomController {

	@Autowired
	private IRoomServ roomServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/admin/rooms/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<RoomRoomtypeReservationReservationroomAccount> paged = roomServ.pagedRoomsForAdminPage(currentPage, sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, paged.getTotalPages(), paged.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("rooms", paged.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
	}
	
	@GetMapping("/admin/rooms")
	public ResponseEntity<?> doPagedRoomDefault() {
		return doPagedRoomList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
}
