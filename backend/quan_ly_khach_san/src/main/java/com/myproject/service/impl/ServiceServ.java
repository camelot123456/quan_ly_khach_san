package com.myproject.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.ServiceEntity;
import com.myproject.payload.service.ServiceOfInvoice;
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
		keyword = keyword == null ? "" : keyword;
		return serviceRepo.pagedByKeyword(keyword, pageRequest);
	}

	@Override
	public List<ServiceEntity> findAll() {
		// TODO Auto-generated method stub
		return serviceRepo.findAll();
	}
	
	@Override
	public List<ServiceOfInvoice> findAllByIdTransaction(String idTransaction) {
		List<Object[]> services = serviceRepo.findAllByIdTransaction(idTransaction);
		List<ServiceOfInvoice> serviceOfInvoices = null;
		if (services.size() > 0) {
			serviceOfInvoices = new ArrayList<ServiceOfInvoice>();
			for (Object[] record : services) {
				ServiceOfInvoice serviceOfInvoice = new ServiceOfInvoice();
				serviceOfInvoice.setIdReservationService((String) record[0]);
				serviceOfInvoice.setCreatedAt((Date) record[1]);
				serviceOfInvoice.setModifiedAt((Date) record[2]);
				serviceOfInvoice.setName((String) record[3]);
				serviceOfInvoice.setAvatarUrl((String) record[4]);
				serviceOfInvoice.setIdService((String) record[5]);
				serviceOfInvoice.setPrice((Double) record[6]);
				serviceOfInvoice.setQuantity((Integer) record[7]);
				serviceOfInvoice.setIntoPrice(((Integer) record[7]) * ((Double) record[6]));
				
				serviceOfInvoices.add(serviceOfInvoice);
			}
		}
		return serviceOfInvoices;
	}
	
	@Override
	public List<ServiceOfInvoice> findAllByIdReservation(String idReservation) {
		// TODO Auto-generated method stub
		List<Object[]> services = serviceRepo.findAllByIdReservation(idReservation);
		List<ServiceOfInvoice> serviceOfInvoices = null;
		if (services.size() > 0) {
			serviceOfInvoices = new ArrayList<ServiceOfInvoice>();
			for (Object[] record : services) {
				ServiceOfInvoice serviceOfInvoice = new ServiceOfInvoice();
				serviceOfInvoice.setIdReservationService((String) record[0]);
				serviceOfInvoice.setCreatedAt((Date) record[1]);
				serviceOfInvoice.setModifiedAt((Date) record[2]);
				serviceOfInvoice.setName((String) record[3]);
				serviceOfInvoice.setAvatarUrl((String) record[4]);
				serviceOfInvoice.setIdService((String) record[5]);
				serviceOfInvoice.setPrice((Double) record[6]);
				serviceOfInvoice.setQuantity((Integer) record[7]);
				serviceOfInvoice.setIntoPrice(((Integer) record[7]) * ((Double) record[6]));
				
				serviceOfInvoices.add(serviceOfInvoice);
			}
		}
		return serviceOfInvoices;
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
