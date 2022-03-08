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

import com.myproject.entity.RoomEntity;
import com.myproject.payload.room.RoomDetailForAdmin;
import com.myproject.payload.room.RoomRoomtypeReservationReservationroomAccount;
import com.myproject.repository.IAccountRepo;
import com.myproject.repository.IRoomRepo;
import com.myproject.service.IRoomServ;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Service
public class RoomServ implements IRoomServ {

	@Autowired
	private IRoomRepo roomRepo;

	@Autowired
	private IAccountRepo accountRepo;

	@Override
	public Page<RoomEntity> paged(int currentPage, int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		keyword = keyword == null ? "" : keyword;
		return roomRepo.pagedByKeyword(keyword, pageRequest);
	}
	
	@Override
	public Page<RoomRoomtypeReservationReservationroomAccount> findAllRoomsTransactionIsNotNull(int currentPage,
			int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> roomRecords = roomRepo.findAllRoomsTransactionIsNotNull(keyword);
		List<RoomRoomtypeReservationReservationroomAccount> roomNewArr = null;
		if (roomRecords.size() > 0) {
			roomNewArr = new ArrayList<RoomRoomtypeReservationReservationroomAccount>();
			for (Object[] record : roomRecords) {
				RoomRoomtypeReservationReservationroomAccount r = new RoomRoomtypeReservationReservationroomAccount();
				r.setIdRoom((String) record[0]);
				r.setRoomNum((String) record[1]);
				r.setRoomState((String) record[2]);
				r.setFloor((String) record[3]);
				r.setNameAccount((String) record[4]);
				r.setPhoneNum((String) record[5]);
				r.setIdRoomType((String) record[6]);
				r.setIdReservation((String) record[7]);
				r.setStartDate((Date) record[8]);
				r.setEndDate((Date) record[9]);
				r.setIdTransaction( (String) record[10]);
				roomNewArr.add(r);
			}
		}

		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		PageImpl<RoomRoomtypeReservationReservationroomAccount> pageImpl = new PageImpl<RoomRoomtypeReservationReservationroomAccount>(
				roomNewArr, pageRequest, roomNewArr.size());

		return pageImpl;
	}

	@Override
	public Page<RoomRoomtypeReservationReservationroomAccount> findAllRoomsTransactionIsNull(int currentPage,
			int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		keyword = keyword == null ? "" : keyword;
		List<Object[]> roomRecords = roomRepo.findAllRoomsTransactionIsNull(keyword);
		List<RoomRoomtypeReservationReservationroomAccount> roomNewArr = null;
		if (roomRecords.size() > 0) {
			roomNewArr = new ArrayList<RoomRoomtypeReservationReservationroomAccount>();
			for (Object[] record : roomRecords) {
				RoomRoomtypeReservationReservationroomAccount r = new RoomRoomtypeReservationReservationroomAccount();
				r.setIdRoom((String) record[0]);
				r.setRoomNum((String) record[1]);
				r.setRoomState((String) record[2]);
				r.setFloor((String) record[3]);
				r.setNameAccount((String) record[4]);
				r.setPhoneNum((String) record[5]);
				r.setIdRoomType((String) record[6]);
				r.setIdReservation((String) record[7]);
				r.setStartDate((Date) record[8]);
				r.setEndDate((Date) record[9]);
				roomNewArr.add(r);
			}
		}

		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		PageImpl<RoomRoomtypeReservationReservationroomAccount> pageImpl = new PageImpl<RoomRoomtypeReservationReservationroomAccount>(
				roomNewArr, pageRequest, roomNewArr.size());

		return pageImpl;
	}

	@Override
	public Optional<RoomDetailForAdmin> findRoomDetailForAdmin(String idRoom, String idTransaction) {
		// TODO Auto-generated method stub
		List<Object[]> roomRecords = roomRepo.findRoomDetailForAdmin(idRoom);
		List<Object[]> accountRecords = accountRepo.findByIdTransaction(idTransaction);
		try {
			Object[] roomObject = roomRecords.get(0);
			Object[] accountObject = accountRecords.get(0);

			RoomDetailForAdmin room = new RoomDetailForAdmin();
			room.setIdRoom((String) roomObject[0]);
			room.setCreateAtRoom((Date) roomObject[1]);
			room.setModifiedAtRoom((Date) roomObject[2]);
			room.setCustomerNumRoom((Integer) roomObject[3]);
			room.setDescriptionRoom((String) roomObject[4]);
			room.setFloor((String) roomObject[5]);
			room.setIncurredPrice((Double) roomObject[6]);
			room.setRoomNum((String) roomObject[7]);
			room.setRoomState((String) roomObject[8]);

			room.setIdRoomtype((String) roomObject[9]);
			room.setNameRoomtype((String) roomObject[10]);
			room.setPrice((Double) roomObject[11]);
			room.setDescriptionRoomtype((String) roomObject[12]);
			room.setAvatarRoomtype((String) roomObject[13]);

//		room.setIdReservation((String) record[13]);
//		room.setCreateAtReservation((Date) record[14]);
//		room.setCreateByReservation((String) record[15]);
//		room.setStartDate((Date) record[16]);
//		room.setEndDate((Date) record[17]);
//		room.setCustomerNumReservation((Integer) record[18]);
//		room.setDiscount((Double) record[19]);
//		room.setTaxService((Integer) record[20]);
//		room.setTaxInvoice((Integer) record[21]);
//		room.setTotal((Double) record[22]);
//		room.setGrandTotal((Double) record[23]);

			room.setIdAccount((String) accountObject[0]);
			room.setNameAccount((String) accountObject[1]);
			room.setPhoneNum((String) accountObject[2]);
			room.setAddress((String) accountObject[3]);
			room.setAvatar((String) accountObject[4]);
			room.setEmail((String) accountObject[5]);
			room.setIdTransaction((String) accountObject[6]);
			return Optional.of(room);
		} catch (IndexOutOfBoundsException e) {
			// TODO: handle exception
			Object[] roomObject = roomRecords.get(0);
			RoomDetailForAdmin room = new RoomDetailForAdmin();
			room.setIdRoom((String) roomObject[0]);
			room.setCreateAtRoom((Date) roomObject[1]);
			room.setModifiedAtRoom((Date) roomObject[2]);
			room.setCustomerNumRoom((Integer) roomObject[3]);
			room.setDescriptionRoom((String) roomObject[4]);
			room.setFloor((String) roomObject[5]);
			room.setIncurredPrice((Double) roomObject[6]);
			room.setRoomNum((String) roomObject[7]);
			room.setRoomState((String) roomObject[8]);

			room.setIdRoomtype((String) roomObject[9]);
			room.setNameRoomtype((String) roomObject[10]);
			room.setPrice((Double) roomObject[11]);
			room.setDescriptionRoomtype((String) roomObject[12]);
			room.setAvatarRoomtype((String) roomObject[13]);

			return Optional.of(room);
		}

	}

	/*
	 * lấy danh sách hiển thị từng phòng không trùng lặp bên sql server sau đó kiểm
	 * tra nếu nowDate nằm trong [startDate, endDate] thì cho vào danh sách chính
	 * nếu startDate, endDate == null thì chỉ điền thông tin room, roomtype, còn
	 * account, reservation set null
	 * 
	 */
	@Override
	public Page<RoomRoomtypeReservationReservationroomAccount> pagedRoomsAllForAdminPage(int currentPage, int sizePage,
			String sortField, String sortDir, String keyword) {
		keyword = keyword == null ? "" : keyword;
		List<Object[]> rooms = roomRepo.pagedRoomsAllForAdminPage(keyword);
		List<RoomRoomtypeReservationReservationroomAccount> roomsNew = null;
		if (rooms.size() > 0) {
			roomsNew = new ArrayList<RoomRoomtypeReservationReservationroomAccount>();
			for (Object[] record : rooms) {
//				lấy thông tin ngày đặt và trả trong reservation sau đó đi kiểm tra với ngày hiện tại
				RoomRoomtypeReservationReservationroomAccount room = new RoomRoomtypeReservationReservationroomAccount();
				Date startDate = (Date) record[8];
				Date endDate = (Date) record[9];
				Date now = new Date();
				room.setIdRoom((String) record[0]);
				room.setRoomNum((String) record[1]);
				room.setRoomState((String) record[2]);
				room.setFloor((String) record[3]);
				room.setIdRoomType((String) record[6]);
//				nếu như ngày đặt và ngày trả chưa có sẽ set account info = null
				if (startDate == null || endDate == null) {
					room.setNameAccount(null);
					room.setPhoneNum(null);
					room.setIdReservation(null);
					room.setStartDate(null);
					room.setEndDate(null);
					room.setIdTransaction(null);
				} else {
//					nếu ngày hôm nay nằm trong [ngày đặt, ngày trả] thì set account info
					if (startDate.before(now) && endDate.after(now)) {
						room.setNameAccount((String) record[4]);
						room.setPhoneNum((String) record[5]);
						room.setIdReservation((String) record[7]);
						room.setStartDate((Date) record[8]);
						room.setEndDate((Date) record[9]);
						room.setIdTransaction((String) record[10]);
//					Nếu hôm nay không nằm trong [ngày đặt, ngày trả] thì set account info = null
					} else {
						room.setNameAccount(null);
						room.setPhoneNum(null);
						room.setIdReservation(null);
						room.setStartDate(null);
						room.setEndDate(null);
						room.setIdTransaction(null);
					}
				}

				roomsNew.add(room);
			}
		}
		Sort sort = Sort.by(sortField);
		sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		Page<RoomRoomtypeReservationReservationroomAccount> roomPaged = new PageImpl<RoomRoomtypeReservationReservationroomAccount>(
				roomsNew, pageRequest, roomsNew.size());
		return roomPaged;

	}

	public List<RoomEntity> findAllRoomsInReservationByCustomerNumAndIdRoomtype(String idRoomtype, Integer customerNum,
			Date startDate, Date endDate) {
		List<Object[]> roomsInReservation = roomRepo.findAllRoomsInReservationByCustomerNumAndIdRoomtype(idRoomtype,
				customerNum);

		@Getter
		@Setter
		@ToString
		final class RoomCustom {
			private String idRoom;
			private Date startDate;
			private Date endDate;
		}

		List<RoomCustom> roomsCustom = null;
		if (roomsInReservation.size() > 0) {
			roomsCustom = new ArrayList<RoomCustom>();
			for (Object[] record : roomsInReservation) {
				RoomCustom roomCustom = new RoomCustom();
				roomCustom.idRoom = (String) record[0];
				roomCustom.startDate = (Date) record[1];
				roomCustom.endDate = (Date) record[2];
				roomsCustom.add(roomCustom);
			}
		}
		if (roomsCustom == null) {
			return null;
		}

		List<RoomEntity> roomsResult = new ArrayList<RoomEntity>();

//			kiểm tra xem ngày đặt trả có bị trùng với ngày đặt trả trong danh sách đặt phòng hay chưa?		
		for (RoomEntity roomEntity : roomRepo.findAll()) {
			if (roomsCustom.stream().filter(room -> room.idRoom.equals(roomEntity.getId())).count() == 0) {
				continue;
			}
			if (roomsCustom.stream().filter(room -> room.idRoom.equals(roomEntity.getId()))
					.anyMatch(room -> room.startDate == null || room.endDate == null)) {
				roomsResult.add(roomRepo.findById(roomEntity.getId()).get());
				continue;
			}
			boolean k = roomsCustom.stream().filter(room -> room.idRoom.equals(roomEntity.getId()))
					.anyMatch(room -> (room.startDate.before(startDate) && room.endDate.after(endDate))// 0110
							|| (room.startDate.after(startDate) && room.endDate.before(endDate))// 1001
							|| (room.startDate.after(startDate) && room.endDate.after(endDate)
									&& room.startDate.before(endDate))// 1010
							|| (room.startDate.before(startDate) && room.endDate.before(endDate)
									&& room.endDate.after(startDate))// 0101
							|| (room.startDate.compareTo(endDate) == 0) || (room.endDate.compareTo(endDate) == 0)
							|| (room.startDate.compareTo(startDate) == 0) || (room.endDate.compareTo(startDate) == 0));
			if (!k) {
				roomsResult.add(roomRepo.findById(roomEntity.getId()).get());
			} else
				continue;
		}
		return roomsResult;
	}
	


	@Override
	public Page<RoomRoomtypeReservationReservationroomAccount> findAllByRoomstate(String roomState, int currentPage,
			int sizePage, String sortField, String sortDir, String keyword) {
		// TODO Auto-generated method stub
		if (roomState.equalsIgnoreCase("using")) {
			return findAllRoomsTransactionIsNotNull(currentPage, sizePage, sortField, sortDir, keyword);
		} else if (roomState.equalsIgnoreCase("deposit")) {
			return findAllRoomsTransactionIsNull(currentPage, sizePage, sortField, sortDir, keyword);
		} else if (roomState.equalsIgnoreCase("empty")) {
			return null;
		} else if (roomState.equalsIgnoreCase("repair")) {
			return null;
		}
		return pagedRoomsAllForAdminPage(currentPage, sizePage, sortField, sortDir, keyword);
	}

	@Override
	public List<RoomEntity> findAll() {
		// TODO Auto-generated method stub
		return roomRepo.findAll();
	}

	@Override
	public List<RoomEntity> findAllByIdReservation(String idReservation) {
		// TODO Auto-generated method stub
		return roomRepo.findAllByIdReservation(idReservation);
	}

	@Override
	public Optional<RoomEntity> findById(String id) {
		// TODO Auto-generated method stub
		return roomRepo.findById(id);
	}

	@Override
	public RoomEntity save(RoomEntity room) {
		// TODO Auto-generated method stub
		if (!roomRepo.existsById(room.getId())) {
			return roomRepo.save(room);
		}
		return null;
	}

	@Override
	public RoomEntity update(RoomEntity room) {
		// TODO Auto-generated method stub
		if (roomRepo.existsById(room.getId())) {
			return roomRepo.save(room);
		}
		return null;
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		roomRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			roomRepo.deleteById(id);
		}
	}

}
