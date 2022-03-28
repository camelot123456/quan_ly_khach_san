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
import com.myproject.entity.ServiceEntity;
import com.myproject.payload.PagedResponse;
import com.myproject.service.IServiceServ;

@RestController("admin-service")
@RequestMapping("/api/admin")
public class ServiceController {

	@Autowired
	private IServiceServ serviceServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/services/room-reservation")
	public ResponseEntity<?> doFindAll() {
		return ResponseEntity.ok().body(serviceServ.findAll());
	}
	
	@GetMapping("/services/page/{currentPage}")
	public ResponseEntity<?> doPagedByType( 
			@PathVariable("currentPage") int currentPage, 
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<ServiceEntity> services = serviceServ.paged(currentPage, sizePage, sortField, sortDir, keyword);
		PagedResponse paged = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, services.getTotalPages(), services.getTotalElements());
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("paged", paged);
		response.put("services", services.getContent());
		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping("/services")
	public ResponseEntity<?> doPagedByTypeDefault() {
		return doPagedByType(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(),
				appProperties.getSystemConstant().getPagedDefault().getSizePage(),
				appProperties.getSystemConstant().getPagedDefault().getSortField(),
				appProperties.getSystemConstant().getPagedDefault().getSortDir(),
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
}
