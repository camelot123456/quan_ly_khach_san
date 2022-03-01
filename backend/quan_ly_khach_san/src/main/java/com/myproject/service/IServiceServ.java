package com.myproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.myproject.entity.ServiceEntity;

public interface IServiceServ {

	public Page<ServiceEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword);
	
	public List<ServiceEntity> findAll();
	
	public List<ServiceEntity> findAllByIdReservation(String idReservation);
	
	public Optional<ServiceEntity> findById(String id);
	
	public ServiceEntity save(ServiceEntity service);
	
	public ServiceEntity update(ServiceEntity service);
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	
}
