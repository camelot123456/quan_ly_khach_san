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
import com.myproject.payload.roomtype.RoomtypeCustom;
import com.myproject.service.IRoomtypeServ;

@RestController("admin-roomtype")
@RequestMapping("/api/admin")
public class RoomtypeController {

	@Autowired
	private IRoomtypeServ roomtypeServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/roomtypes/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomtypeList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<RoomtypeCustom> paged = roomtypeServ.pagedRoomtype(currentPage, sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, paged.getTotalPages(), paged.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("roomtypes", paged.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
	}
	
	@GetMapping("/roomtypes")
	public ResponseEntity<?> doPagedRoomtypeDefault() {
		return doPagedRoomtypeList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@GetMapping(value = "/roomtypes/{idRoomtype}")
	public ResponseEntity<?> doFindRoomtypeById(@PathVariable("idRoomtype") String idRoomtype) {
		return ResponseEntity.ok().body(roomtypeServ.findById(idRoomtype).get());
	}
	
	@GetMapping(value = "/roomtypes/avatar-state")
	public ResponseEntity<?> doShowRoomtypeByAvatarState() {
		return ResponseEntity.ok().body(roomtypeServ.findAllByAvatarState(true));
	}
	
}
