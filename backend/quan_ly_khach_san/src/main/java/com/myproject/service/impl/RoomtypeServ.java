package com.myproject.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.myproject.config.AppProperties;
import com.myproject.entity.RoomTypeEntity;
import com.myproject.entity.RoomTypePhotoEntity;
import com.myproject.payload.roomtype.RoomtypeCustom;
import com.myproject.payload.roomtype.RoomtypeFormCreate;
import com.myproject.repository.IRoomTypePhotoRepo;
import com.myproject.repository.IRoomtypeRepo;
import com.myproject.service.IRoomtypeServ;
import com.myproject.util.FileUtil;

import net.bytebuddy.utility.RandomString;

@Service
public class RoomtypeServ implements IRoomtypeServ{

	@Autowired
	private IRoomtypeRepo roomtypeRepo;
	
	@Autowired
	private IRoomTypePhotoRepo roomtypePhotoRepo;
	
	@Autowired
	private AppProperties appProperties;
	
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
	
	@Transactional
	@Override
	public void createWithAvatar(RoomtypeFormCreate roomType, MultipartFile file) throws FileNotFoundException, IOException {
		String id = "";
		do {
			id = RandomString.make(10);
		} while (roomtypeRepo.existsById(id));
		RoomTypeEntity roomtypeNew = new RoomTypeEntity();
		roomtypeNew.setId(id);
		roomtypeNew.setName(roomType.getName());
		roomtypeNew.setPrice(roomType.getPrice());
		roomtypeNew.setDescription(roomType.getDescription());
		RoomTypeEntity roomTypeAfterCreate = roomtypeRepo.save(roomtypeNew);
		
		RoomTypePhotoEntity typePhoto = new RoomTypePhotoEntity();
		String idRtp = "";
		do {
			idRtp = RandomString.make(10);
		} while (roomtypePhotoRepo.existsById(idRtp));
		typePhoto.setId(idRtp);
		typePhoto.setAvatarState(true);
		typePhoto.setRoomType(roomTypeAfterCreate);
		
		if (roomType.getTypeImage() == 1 ) {
			if (file != null) {
				String nameFile = file.getName() + "_" + RandomString.make(64) + ".png";
				FileUtil.saveFile(file, nameFile, appProperties.getSystemConstant().getUriSaveImage() + "/roomtype");
				typePhoto.setUrl(nameFile);
			} else {
				typePhoto.setUrl(appProperties.getSystemConstant().getImageRoomUrlDefault());
			}
		} else {
			if (roomType.getAvatarUrl().startsWith("https://") || roomType.getAvatarUrl().startsWith("http://")) {
				typePhoto.setUrl(roomType.getAvatarUrl());
			}else {
				typePhoto.setUrl(appProperties.getSystemConstant().getImageRoomUrlDefault());
			}
		}
		roomtypePhotoRepo.save(typePhoto);
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
		roomtypePhotoRepo.findAllByIdRoomtype(id).stream().forEach(rtp -> roomtypePhotoRepo.deleteById(rtp.getId()));
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
