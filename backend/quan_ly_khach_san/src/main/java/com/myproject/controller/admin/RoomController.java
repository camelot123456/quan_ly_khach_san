package com.myproject.controller.admin;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.config.AppProperties;
import com.myproject.payload.ApiResponse;
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

	@GetMapping("/rooms/page/{currentPage}")
	public ResponseEntity<?> doPagedRoomList(@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage, @Param("sortField") String sortField, @Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<RoomRoomtypeReservationReservationroomAccount> paged = roomServ.pagedRoomsAllForAdminPage(currentPage,
				sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword,
				paged.getTotalPages(), paged.getTotalElements());

		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("rooms", paged.getContent());

		return ResponseEntity.ok().body(dataRespone);
	}

	@GetMapping("/rooms")
	public ResponseEntity<?> doPagedRoomDefault() {
		return doPagedRoomList(appProperties.getSystemConstant().getPagedDefault().getCurrentPage(),
				appProperties.getSystemConstant().getPagedDefault().getSizePage(),
				appProperties.getSystemConstant().getPagedDefault().getSortField(),
				appProperties.getSystemConstant().getPagedDefault().getSortDir(),
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}

	@GetMapping(value = "/rooms/{idRoom}")
	public ResponseEntity<?> doGetRoomDetailForAdmin(@PathVariable("idRoom") String idRoom,
			@Param("idTransaction") String idTransaction) {
		Map<String, Object> apiResponse = new HashMap<String, Object>();
		apiResponse.put("room", roomServ.findRoomDetailForAdmin(idRoom, idTransaction).get());
		apiResponse.put("services", serviceServ.findAllByIdTransaction(idTransaction));
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

}
