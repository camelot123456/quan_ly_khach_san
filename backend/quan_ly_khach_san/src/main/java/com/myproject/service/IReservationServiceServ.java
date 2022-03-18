package com.myproject.service;

import java.util.List;
import java.util.Set;

import com.myproject.entity.ReservationServiceEntity;
import com.myproject.entity.ServiceEntity;

public interface IReservationServiceServ {

	public List<ReservationServiceEntity> findAll();
	
	public void addRoomsIntoReservation(String idReservation, Set<ServiceEntity> services);
	
	public void deleteById(String id);
	
	public void deleteMany(String[] ids);
	
	public List<ReservationServiceEntity> findAllByIdAccount(String idAccount);
	
}
