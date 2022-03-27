package com.myproject.controller.admin;

import java.util.Date;
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
import com.myproject.payload.EntityResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.payload.room.RoomRoomtypeReservationReservationroomAccount;
import com.myproject.service.IRoomServ;
import com.myproject.service.IServiceServ;

import lombok.Getter;
import lombok.Setter;

@RestController(value = "admin-room")
@RequestMapping("/api/admin")
public class RoomController {

	@Autowired
	private IRoomServ roomServ;

	@Autowired
	private IServiceServ serviceServ;

	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/rooms/{roomState}/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomList(@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage, @Param("sortField") String sortField, @Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		
		Page<RoomEntity> paged = roomServ.paged(currentPage,
				sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword,
				paged.getTotalPages(), paged.getTotalElements());

		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("rooms", paged.getContent());

		return ResponseEntity.ok().body(dataRespone);
	}

	@GetMapping("/rooms/roomState")
	public ResponseEntity<?> doPagedRoomDefault() {
		return doPagedRoomList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(),
				appProperties.getSystemConstant().getPagedDefault().getSizePage(),
				appProperties.getSystemConstant().getPagedDefault().getSortField(),
				appProperties.getSystemConstant().getPagedDefault().getSortDir(),
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}

	@GetMapping("/rooms/roomStateList/{roomState}/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomStateList(@PathVariable("roomState") String roomState,@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage, @Param("sortField") String sortField, @Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		
		Page<RoomRoomtypeReservationReservationroomAccount> paged = roomServ.findAllByRoomstate(roomState, currentPage,
				sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword,
				paged.getTotalPages(), paged.getTotalElements());

		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("rooms", paged.getContent());

		return ResponseEntity.ok().body(dataRespone);
	}

	@GetMapping("/rooms/roomStateList")
	public ResponseEntity<?> doPagedRoomStateDefault() {
		return doPagedRoomStateList("", 
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(),
				appProperties.getSystemConstant().getPagedDefault().getSizePage(),
				appProperties.getSystemConstant().getPagedDefault().getSortField(),
				appProperties.getSystemConstant().getPagedDefault().getSortDir(),
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	

	@GetMapping(value = "/rooms/roomState/{idRoom}")
	public ResponseEntity<?> doGetRoomDetailForAdmin(@PathVariable("idRoom") String idRoom,
			@Param("idReservation") String idReservation) {
		Map<String, Object> apiResponse = new HashMap<String, Object>();
		apiResponse.put("room", roomServ.findRoomDetailForAdmin(idRoom, idReservation).get());
		apiResponse.put("services", serviceServ.findAllByIdReservation(idReservation));
		return ResponseEntity.ok().body(apiResponse);
	}

	@Getter
	@Setter
	final static class RoomChecked {
		private Date startDate;
		private Date endDate;
		private Integer customerNum;
		private String idRoomtype;
	}

	@PostMapping("/rooms/checked")
	public ResponseEntity<?> doShowRoomIsEmpty(@RequestBody RoomChecked roomChecked) {
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("rooms", roomServ.findAllRoomsInReservationByCustomerNumAndIdRoomtype(
				roomChecked.getIdRoomtype(),
				roomChecked.getCustomerNum(),
				roomChecked.getStartDate(), 
				roomChecked.getEndDate()));
		response.put("apiResponse", new ApiResponse(true, "Successfully."));
		return ResponseEntity.ok().body(response);
	}
	
	@PostMapping("/rooms/save")
	public ResponseEntity<?> doSaveRoom(@RequestBody RoomEntity room) {
		roomServ.save(room);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
	@PutMapping("/rooms/update")
	public ResponseEntity<?> doUpdateRoom(@RequestBody RoomEntity room) {
		roomServ.update(room);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
	@PutMapping("/rooms/updateRoomState")
	public ResponseEntity<?> doUpdateRoomState(@RequestBody RoomEntity room) {
		roomServ.updateRoomState(room);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}
	
	@DeleteMapping("/rooms/delete")
	public ResponseEntity<?> doDeleteRoom(@RequestBody EntityResponse entityResponse) {
		roomServ.deleteById(entityResponse.getId());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully."));
	}

}
