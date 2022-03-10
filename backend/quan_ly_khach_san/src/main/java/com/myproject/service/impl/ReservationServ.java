package com.myproject.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.config.AppProperties;
import com.myproject.entity.AccountEntity;
import com.myproject.entity.AccountRoleEntity;
import com.myproject.entity.ReservationEntity;
import com.myproject.entity.ReservationRoomEntity;
import com.myproject.entity.ReservationServiceEntity;
import com.myproject.entity.RoleEntity;
import com.myproject.entity.ServiceEntity;
import com.myproject.entity.TransactionEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.payload.reservation.ReservationCustom;
import com.myproject.payload.reservation.ReservationDeleteRoom;
import com.myproject.payload.reservation.ReservationForTransaction;
import com.myproject.repository.IAccountRepo;
import com.myproject.repository.IAccountRoleRepo;
import com.myproject.repository.IReservationRepo;
import com.myproject.repository.IReservationRoomRepo;
import com.myproject.repository.IReservationServiceRepo;
import com.myproject.repository.IRoleRepo;
import com.myproject.repository.IRoomRepo;
import com.myproject.repository.IRoomtypeRepo;
import com.myproject.repository.IServiceRepo;
import com.myproject.repository.ITransactionRepo;
import com.myproject.service.IAccountServ;
import com.myproject.service.IReservationServ;
import com.myproject.service.ITransactionServ;

import net.bytebuddy.utility.RandomString;

@Service
public class ReservationServ implements IReservationServ {

	@Autowired
	private AppProperties appProperties;

	@Autowired
	private IReservationRepo reservationRepo;

	@Autowired
	private ITransactionRepo transactionRepo;

	@Autowired
	private ITransactionServ transactionServ;

	@Autowired
	private IReservationRoomRepo reservationRoomRepo;

	@Autowired
	private IReservationServiceRepo reservationServiceRepo;

	@Autowired
	private IAccountServ accountServ;

	@Autowired
	private IRoomRepo roomRepo;

	@Autowired
	private IServiceRepo serviceRepo;

	@Autowired
	private IAccountRepo accountRepo;

	@Autowired
	private IRoleRepo roleRepo;

	@Autowired
	private IAccountRoleRepo accountRoleRepo;

	@Autowired
	private IRoomtypeRepo roomtypeRepo;

	@Override
	public Page<ReservationEntity> paged(int currentPage, int sizePage, String sortField, String sortDir,
			String keyword) {
		// TODO Auto-generated method stub
		Sort sort = Sort.by(sortField);
		sort = sortDir.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();
		PageRequest pageRequest = PageRequest.of(currentPage, sizePage, sort);
		keyword = keyword == null ? "" : keyword;
		return reservationRepo.pagedByKeyword(keyword, pageRequest);
	}

	@Override
	public List<ReservationEntity> findByIdAccount(String idAccount) {
		// TODO Auto-generated method stub
		return reservationRepo.findByIdAccount(idAccount);
	}

	@Override
	public Optional<ReservationEntity> findById(String id) {
		// TODO Auto-generated method stub
		return reservationRepo.findById(id);
	}	


	@Override
	public Optional<ReservationForTransaction> findReservationForTransaction(String idReservation) {
		// TODO Auto-generated method stub
		Object[] records = reservationRepo.findReservationForTransaction(idReservation).get(0);
		ReservationForTransaction forTransaction = new ReservationForTransaction();
		forTransaction.setIdRoomtype((String) records[0]);
		forTransaction.setNameRoomtype((String) records[1]);
		forTransaction.setPriceRoomtype((Double) records[2]);
		forTransaction.setIdReservation((String) records[3]);
		forTransaction.setStartDate((Date) records[4]);
		forTransaction.setEndDate((Date) records[5]);
		forTransaction.setCreatedAt((Date) records[6]);
		forTransaction.setCustomerNum((Integer) records[7]);
		forTransaction.setTaxService((Double) records[8]);
		forTransaction.setTaxInvoice((Double) records[9]);
		forTransaction.setTotal((Double) records[10]);
		forTransaction.setGrandTotal((Double) records[11]);
		forTransaction.setDiscount((Double) records[12]);
		forTransaction.setIdAccount((String) records[13]);
		forTransaction.setNameAccount((String) records[14]);
		return Optional.of(forTransaction);
	}

	@Override
	public ReservationEntity save(ReservationEntity reservation, String idAccount) {
		// TODO Auto-generated method stub
		String id = RandomString.make(6);
		if (!reservationRepo.existsById(id)) {
			reservation.setId(id);
			AccountEntity account = accountServ.findById(idAccount).get();
			reservation.setAccount(account);
			return reservationRepo.save(reservation);
		}
		return null;
	}

	@Transactional
	@Override
	public void createReservation(ReservationCustom reservationCustom) {
		// TODO Auto-generated method stub
		String idReservation = "";
		do {
			idReservation = RandomString.make(10);
		} while (reservationRepo.existsById(idReservation));

//		Tạo danh sách đặt phòng, tạo thông tin khách hàng mới , rồi khách vào bảng đặt phòng
		ReservationEntity reservation = new ReservationEntity();

		String idCustomer = "";
		AccountEntity customer = new AccountEntity();
		if (reservationCustom.getCustomer().getId() == null || reservationCustom.getCustomer().getId().equals("")) {
			do {
				idCustomer = RandomString.make(10);
			} while (accountRepo.existsById(idCustomer));
			customer.setId(idCustomer);
			customer.setName(reservationCustom.getCustomer().getName());
			customer.setEmail(reservationCustom.getCustomer().getEmail());
			customer.setAddress(reservationCustom.getCustomer().getAddress());
			customer.setPhoneNum(reservationCustom.getCustomer().getPhoneNum());
			customer.setEnabled(true);
			customer.setVerified(true);
			customer.setAuthProvider(EAuthProvider.NO_ACCOUNT);
			customer.setAvatar(appProperties.getSystemConstant().getAvatarUrlDefault());

			AccountEntity customerNew = accountRepo.save(customer);

			AccountRoleEntity accountRole = new AccountRoleEntity();
			String idAccountRole = "";
			do {
				idAccountRole = RandomString.make(10);
			} while (accountRoleRepo.existsById(idAccountRole));

			RoleEntity role = roleRepo.findByCode("MEMBER").get();
			accountRole.setId(idAccountRole);
			accountRole.setRole(role);
			accountRole.setAccount(customerNew);
			accountRoleRepo.save(accountRole);

			reservation.setAccount(customerNew);
		} else {
			AccountEntity customerOld = accountRepo.findById(reservationCustom.getCustomer().getId()).get();
			reservation.setAccount(customerOld);
		}

		reservation.setId(idReservation);
		reservation.setStartDate(reservationCustom.getStartDate());
		reservation.setEndDate(reservationCustom.getEndDate());
		reservation.setCustomerNum(reservationCustom.getCustomerNum());

		ReservationEntity reservationNew = reservationRepo.save(reservation);

//		Thêm phòng
		double totalRoomIncurredPrice = 0.0;
		for (String id : reservationCustom.getRooms()) {
			ReservationRoomEntity reservationRoom = new ReservationRoomEntity();
			String idReservationRoom = "";
			do {
				idReservationRoom = RandomString.make(10);
			} while (reservationRoomRepo.existsById(idReservationRoom));
			reservationRoom.setId(idReservationRoom);
			reservationRoom.setRoom(roomRepo.findById(id).get());
			reservationRoom.setReservation(reservationNew);
			totalRoomIncurredPrice += reservationRoom.getRoom().getIncurredPrice();

			reservationRoomRepo.save(reservationRoom);
		}
//		Thêm dịch vụ 
		double totalServicesPrice = 0.0;
		for (ServiceEntity service : reservationCustom.getServices()) {
			ReservationServiceEntity reservationService = new ReservationServiceEntity();
			String idReservationService = "";
			do {
				idReservationService = RandomString.make(10);
			} while (reservationServiceRepo.existsById(idReservationService));
			reservationService.setId(idReservationService);
			reservationService.setService(serviceRepo.findById(service.getId()).get());
			reservationService.setQuantity(service.getQuantity());
			reservationService
					.setIntoPrice(service.getQuantity() * serviceRepo.findById(service.getId()).get().getPrice());
			reservationService.setReservation(reservationNew);

			totalServicesPrice += reservationService.getService().getPrice() * reservationService.getQuantity();
			reservationServiceRepo.save(reservationService);
		}

//		Tính toán chi phí

		Double roomtypePrice = roomtypeRepo.findById(reservationCustom.getIdRoomtype()).get().getPrice();

		long diff = reservationNew.getEndDate().getTime() - reservationNew.getStartDate().getTime();
		long distance = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
		double total = roomtypePrice * distance + totalRoomIncurredPrice + totalServicesPrice;

		double taxService5Percent = totalServicesPrice * 0.05;
		double taxInvoice10Percent = total * 0.1;
		double grandTotal = total + taxService5Percent + taxInvoice10Percent;

		reservationNew.setDiscount(0.0);
		reservationNew.setTaxService(taxService5Percent);
		reservationNew.setTaxInvoice(taxInvoice10Percent);
		reservationNew.setTotal(total);
		reservationNew.setGrandTotal(grandTotal);

		reservationRepo.save(reservationNew);

	}

	@Override
	public ReservationEntity update(ReservationEntity reservation, String idAccount) {
		// TODO Auto-generated method stub
		if (reservationRepo.existsById(reservation.getId())) {
			AccountEntity account = accountServ.findById(idAccount).get();
			reservation.setAccount(account);
			return reservationRepo.save(reservation);
		}
		return null;
	}

//	nếu reservation chứa nhiều room, thì kiểm tra room lớn hơn 1 thì chỉ xóa mỗi room cần xóa
//	nếu reservation chỉ có 1 room, thì xóa luôn cả reservation

	@Override
	public void deleteRoomInReservation(ReservationDeleteRoom request) {
		ReservationEntity reservation = reservationRepo.findById(request.getIdReservation()).get();

		if (reservation.getReservationRoomArr().size() > 1) {
			reservationRoomRepo.delete(reservation.getReservationRoomArr().stream()
					.filter(rer -> rer.getRoom().getId().equals(request.getIdRoom()))
					.findFirst().get());
		} else if (reservation.getReservationRoomArr().size() == 1){
			for (ReservationRoomEntity rer : reservation.getReservationRoomArr()) {
				reservationRoomRepo.deleteById(rer.getId());
			}

			for (ReservationServiceEntity res : reservation.getReservationServiceArr()) {
				reservationServiceRepo.deleteById(res.getId());
			}

			reservationRepo.deleteById(request.getIdReservation());
		}
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		ReservationEntity reservation = reservationRepo.findById(id).get();

		Optional<TransactionEntity> transaction = transactionServ.findByIdReservation(reservation.getId());
		if (transaction.isPresent()) {
			transaction.get().setReservation(null);
			transactionRepo.save(transaction.get());
		}

		for (ReservationRoomEntity reservationRoomIterable : reservation.getReservationRoomArr()) {
			reservationRoomRepo.deleteById(reservationRoomIterable.getId());
		}

		for (ReservationServiceEntity reservationServiceIterable : reservation.getReservationServiceArr()) {
			reservationServiceRepo.deleteById(reservationServiceIterable.getId());
		}

		reservationRepo.deleteById(id);
	}

	@Override
	public void deleteMany(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			this.deleteById(id);
		}
	}

}
