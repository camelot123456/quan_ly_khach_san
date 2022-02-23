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
import com.myproject.entity.RoleEntity;
import com.myproject.payload.ApiResponse;
import com.myproject.payload.PagedResponse;
import com.myproject.service.IRoleServ;

@RestController
@RequestMapping("/api")
public class RoleController {

	@Autowired
	private IRoleServ roleServ;
	
	@Autowired
	private AppProperties appProperties;
	
	@GetMapping("/roles/{idRole}")
	public ResponseEntity<?> doFindRoleById(@PathVariable("idRole") String idRole) {
		return ResponseEntity.ok().body(roleServ.findById(idRole));
	}
	
	@GetMapping("/roles")
//	@PreAuthorize("hasAnyRole('ROLE_DIRECTOR')")
	public ResponseEntity<?> doPagedRoleDefault() {
		return doPagedRole(
				appProperties.getSystemConstant().getPagedDefault().getCurrentPage(), 
				appProperties.getSystemConstant().getPagedDefault().getSizePage(), 
				appProperties.getSystemConstant().getPagedDefault().getSortField(), 
				appProperties.getSystemConstant().getPagedDefault().getSortDir(), 
				appProperties.getSystemConstant().getPagedDefault().getKeyword());
	}
	
	@GetMapping("/roles/page/{currentPage}")
//	@PreAuthorize("hasAnyRole('ROLE_DIRECTOR')")
	public ResponseEntity<?> doPagedRole(
			@PathVariable("currentPage") int currentPage,
			@Param("sizePage") int sizePage,
			@Param("sortField") String sortField,
			@Param("sortDir") String sortDir,
			@Param("keyword") String keyword) {
		
		Page<RoleEntity> roles = roleServ.paged(sizePage, currentPage, sortField, sortDir, keyword);
		PagedResponse pagedResponse = new PagedResponse(currentPage, sizePage, sortField, sortDir, keyword, roles.getTotalPages(), roles.getTotalElements());
		
		Map<String, Object> dataResponse = new HashMap<String, Object>();
		dataResponse.put("paged", pagedResponse);
		dataResponse.put("roles", roles.getContent());
		
		return ResponseEntity.ok().body(dataResponse);
	}
	
	@PostMapping("/roles")
	public ResponseEntity<?> doAddRole(@RequestBody RoleEntity role) {
		roleServ.save(role);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@PutMapping("/roles")
	public ResponseEntity<?> doUpdateRole(@RequestBody RoleEntity role) {
		roleServ.update(role);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/roles/{idRole}")
	public ResponseEntity<?> doDeleleOne(@PathVariable("idRole") String idRole){
		roleServ.deleteById(idRole);
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
	@DeleteMapping("/roles")
	public ResponseEntity<?> doDeleleMany(@RequestBody RoleEntity role){
		roleServ.deleteMany(role.getIds());
		return ResponseEntity.ok().body(new ApiResponse(true, "Successfully"));
	}
	
}
