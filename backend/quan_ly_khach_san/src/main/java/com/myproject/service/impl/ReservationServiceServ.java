package com.myproject.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.entity.ReservationEntity;
import com.myproject.entity.ReservationServiceEntity;
import com.myproject.entity.ServiceEntity;
import com.myproject.repository.IReservationRepo;
import com.myproject.repository.IReservationServiceRepo;
import com.myproject.repository.IServiceRepo;
import com.myproject.service.IReservationServiceServ;

import net.bytebuddy.utility.RandomString;

@Service
public class ReservationServiceServ implements IReservationServiceServ{

	@Autowired
	private IReservationServiceRepo reservationServiceRepo;
	
	@Autowired
	private IReservationRepo reservationRepo;
	
	@Autowired
	private IServiceRepo serviceRepo;
	
	@Override
	public List<ReservationServiceEntity> findAll() {
		// TODO Auto-generated method stub
		return reservationServiceRepo.findAll();
	}

	@Override
	public void addRoomsIntoReservation(String idReservation, Set<ServiceEntity> services) {
		// TODO Auto-generated method stub
		ReservationEntity reservation = reservationRepo.findById(idReservation).get();
		for (ServiceEntity serviceIterate : services) {
			ReservationServiceEntity reservationService = new ReservationServiceEntity();
			
			ServiceEntity service = serviceRepo.findById(serviceIterate.getId()).get();
			reservationService.setReservation(reservation);
			reservationService.setQuantity(serviceIterate.getQuantity());
			reservationService.setIntoPrice(serviceIterate.getQuantity() * service.getPrice());
			reservationService.setId(RandomString.make(6));
			reservationServiceRepo.save(reservationService);
		}
	}
	
	@Override
	public List<ReservationServiceEntity> findAllByIdAccount(String idAccount) {
		// TODO Auto-generated method stub
		return reservationServiceRepo.findAllByIdAccount(idAccount);
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		reservationServiceRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			reservationServiceRepo.deleteById(id);
		}
	}

	

}
