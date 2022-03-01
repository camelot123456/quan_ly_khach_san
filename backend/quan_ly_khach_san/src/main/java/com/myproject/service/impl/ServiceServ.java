package com.myproject.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.ServiceEntity;
import com.myproject.repository.IServiceRepo;
import com.myproject.service.IServiceServ;

@Service
public class ServiceServ implements IServiceServ{

	@Autowired
	private IServiceRepo serviceRepo;
	
	@Override
	public Page<ServiceEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		if (keyword == "" || keyword == null) {
			return serviceRepo.findAll(pageRequest);
		}
		return serviceRepo.pagedByKeyword(keyword, pageRequest);
	}

	@Override
	public List<ServiceEntity> findAll() {
		// TODO Auto-generated method stub
		return serviceRepo.findAll();
	}
	
	@Override
	public List<ServiceEntity> findAllByIdReservation(String idReservation) {
		// TODO Auto-generated method stub
		return serviceRepo.findAllByIdReservation(idReservation);
	}

	@Override
	public Optional<ServiceEntity> findById(String id) {
		// TODO Auto-generated method stub
		return serviceRepo.findById(id);
	}

	@Override
	public ServiceEntity save(ServiceEntity service) {
		// TODO Auto-generated method stub
		if (!serviceRepo.existsById(service.getId())) {
			return serviceRepo.save(service);
		}
		return null;
	}

	@Override
	public ServiceEntity update(ServiceEntity service) {
		// TODO Auto-generated method stub
		if (serviceRepo.existsById(service.getId())) {
			return serviceRepo.save(service);
		}
		return null;
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		serviceRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			serviceRepo.deleteById(id);
		}
	}


}
