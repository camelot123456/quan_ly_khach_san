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
import com.myproject.entity.ServiceEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.EntityResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.service.IServiceServ;

@RestController
@RequestMapping("/api")
public class ServiceController {

	@Autowired
	private IServiceServ serviceServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/services/page/{currentPage}")
	public ResponseEntity<?> doPagedserviceList(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		Page<ServiceEntity> paged = serviceServ.paged(currentPage, sizePage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, paged.getTotalPages(), paged.getTotalElements());
		
		Map<String, Object> dataRespone = new HashMap<String, Object>();
		dataRespone.put("paged", pagedResponse);
		dataRespone.put("services", paged.getContent());
		
		return ResponseEntity.ok().body(dataRespone);
	}
	
	@GetMapping("/services")
	public ResponseEntity<?> doPagedserviceDefault() {
		return doPagedserviceList(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@PostMapping(value = "/services")
	public ResponseEntity<?> doSaveservice(@RequestBody ServiceEntity service) {
		serviceServ.save(service);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@PutMapping("/services")
	public ResponseEntity<?> doUpdateservice(@RequestBody ServiceEntity service) {
		serviceServ.update(service);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/service")
	public ResponseEntity<?> doDeleteOneService(@RequestBody EntityResponse entityResponse) {
		serviceServ.deleteById(entityResponse.getId());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/services")
	public ResponseEntity<?> doDeleteManyService(@RequestBody EntityResponse entityResponse) {
		serviceServ.deleteMany(entityResponse.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
