package com.myproject.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.myproject.entity.RoomTypeEntity;
import com.myproject.payload.roomtype.RoomtypeCustom;
import com.myproject.repository.IRoomtypeRepo;
import com.myproject.service.IRoomtypeServ;

@Service
public class RoomtypeServ implements IRoomtypeServ{

	@Autowired
	private IRoomtypeRepo roomtypeRepo;
	
//	----------------------------- SELECT -----------------------------	

	@Override
	public Page<RoomTypeEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		keyword = keyword == null ? "" : keyword;
		return roomtypeRepo.pagedRoomTypeByKeyword(keyword, pageRequest);
	}

	@Override
	public List<RoomTypeEntity> findAll() {
		// TODO Auto-generated method stub
		return roomtypeRepo.findAll();
	}

	@Override
	public Optional<RoomTypeEntity> findById(String id) {
		// TODO Auto-generated method stub
		Object[] records = roomtypeRepo.findOneById(id).get(0);
		RoomTypeEntity roomtype = new RoomTypeEntity();
		roomtype.setId((String) records[0]);
		roomtype.setCreatedAt((Date) records[1]);
		roomtype.setModifiedAt((Date) records[3]);
		roomtype.setName((String) records[4]);
		roomtype.setPrice((Double) records[5]);
		roomtype.setDescription((String) records[2]);
		roomtype.setAvatarUrl((String) records[6]);
		return Optional.of(roomtype);
	}
	
	public List<RoomTypeEntity> findAllByAvatarState(Boolean avatarState) {
		List<Object[]> roomtypeObject = roomtypeRepo.findAllByAvatarState(avatarState);
		List<RoomTypeEntity> roomTypes = null;
		if (roomtypeObject.size() > 0) {
			roomTypes = new ArrayList<RoomTypeEntity>();
			for (Object[] records : roomtypeObject) {
				RoomTypeEntity roomtype = new RoomTypeEntity();
				roomtype.setId((String) records[0]);
				roomtype.setCreatedAt((Date) records[1]);
				roomtype.setModifiedAt((Date) records[3]);
				roomtype.setName((String) records[4]);
				roomtype.setPrice((Double) records[5]);
				roomtype.setDescription((String) records[2]);
				roomtype.setAvatarUrl((String) records[6]);
				roomTypes.add(roomtype);
			}
		}
		return roomTypes;
	}
	
	@Override
	public Page<RoomtypeCustom> pagedRoomtype(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		keyword = keyword == null ? "" : keyword;
		List<Object[]> roomtypes = roomtypeRepo.pagedRoomtype(true, keyword);
		List<RoomtypeCustom> roomtypeCustoms = null;
		if (roomtypes.size() > 0) {
			roomtypeCustoms = new ArrayList<RoomtypeCustom>();
			for (Object[] record : roomtypes) {
				RoomtypeCustom roomtypeCustomNew = new RoomtypeCustom();
				roomtypeCustomNew.setId((String) record[0]);
				roomtypeCustomNew.setCreatedAt((Date) record[1]);
				roomtypeCustomNew.setDescription((String) record[2]);
				roomtypeCustomNew.setModifiedAt((Date) record[3]);
				roomtypeCustomNew.setName((String) record[4]);
				roomtypeCustomNew.setPrice((Double) record[5]);
				roomtypeCustomNew.setAvatarUrl((String) record[6]);
				roomtypeCustoms.add(roomtypeCustomNew);
			}
		}
		
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		Page<RoomtypeCustom> paged = new PageImpl<RoomtypeCustom>(roomtypeCustoms, pageRequest, roomtypeCustoms.size());
		return paged;
	}

//	----------------------------- INSERT -----------------------------	
	
	@Override
	public RoomTypeEntity save(RoomTypeEntity roomType) {
		// TODO Auto-generated method stub
		if (!roomtypeRepo.existsById(roomType.getId())) {
			return roomtypeRepo.save(roomType);
		}
		return null;
	}

//	----------------------------- UPDATE -----------------------------
	
	@Override
	public RoomTypeEntity update(RoomTypeEntity roomType) {
		// TODO Auto-generated method stub
		if (roomtypeRepo.existsById(roomType.getId())) {
			return roomtypeRepo.save(roomType);
		}
		return null;
	}

//	----------------------------- DELETE -----------------------------
	
	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		roomtypeRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			roomtypeRepo.deleteById(id);
		}
	}

}
