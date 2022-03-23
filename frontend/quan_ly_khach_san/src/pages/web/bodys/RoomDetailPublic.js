import { Alert, AlertIcon, Badge, Box, Button, Checkbox, Container, Heading, HStack, Image, Input, Spacer, StarIcon, Table, Tbody, Td, Text, Th, Thead, Tr, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { doFindRoomtypeById, showRoomtypePublic } from "../../../redux/actions/roomtype-action";
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doFindAll } from "../../../redux/actions/service-action";
import { doCheckRoomEmpty } from "../../../redux/actions/room-action";
import { doCreateReservation, doSetRoomsId, doSetServices, resetReservationRoom } from "../../../redux/actions/reservation-action";
import ModalScrollCustom from "../../admin/fragments/ModalScrollCustom"
import '../../../App.css'
import { ACCESS_TOKEN } from "../../../constants";
import {parseJwt} from '../../../commons/jwt-common'
import { doFindByIdEmailPhoneNum } from "../../../redux/actions/account-action";

function RoomDetailPublic() {

    const {idRoomtype} = useParams()
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes)
    const roomtype = useSelector((state) => state.roomtypeReducer.roomtype)

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [customerNum, setCustomerNum] = useState(1);
    const ref = useRef({})
    const toast = useToast()

    const roomsChecked = useSelector((state) => state.roomReducer.rooms);
    const services = useSelector((state) => state.serviceReducer.services);
    const account = useSelector((state) => state.accountReducer.account);
    const reservationRooms = useSelector(
      (state) => state.reservationReducer.rooms
    );
    const reservationServices = useSelector(
      (state) => state.reservationReducer.services
    );

    useEffect(() => {
      dispatch(showRoomtypePublic({
          currentPage: 0,
          sizePage: 20,
          sortField: "id",
          sortDir: "asc",
          keyword: "",
        }))
      dispatch(doFindAll());
      dispatch(doFindByIdEmailPhoneNum(parseJwt(localStorage.getItem(ACCESS_TOKEN)).sub))
    }, [])

    useEffect(() => {
      dispatch(doFindRoomtypeById(idRoomtype))
    }, [idRoomtype])

    const handleCheckRoomEmpty = (apiRequest) => {
      dispatch(resetReservationRoom())
      dispatch(doCheckRoomEmpty(apiRequest))
      .then(() => {
        ref.current = apiRequest
      })
      .catch(() => {

      })
      .finally(() => {

      })
    };
    

    const handleReservationRoom = () => {
      if (reservationRooms) {
        var data = {
          customer: {
            id: account.id,
            name: account.name,
            email: account.email,
            address: account.address,
            phoneNum: account.phoneNum,
          },
          rooms: reservationRooms,
          services: reservationServices,
          startDate: startDate,
          endDate: endDate,
          customerNum: customerNum,
          idRoomtype: roomtype.id,
        };

        console.log(data);
        dispatch(doCreateReservation(data))
        .then((res) => {
          toast({
            description: "Tạo phiếu đặt phòng thành công",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          navigate("/home")
        })
        .catch((err) => {
          toast({
            description: "Tạo phiếu đặt phòng thất bại",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }) 
      }
      
    }

    return (
        <>
        {/* <!-- Product section--> */}
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={roomtype.avatarUrl}  alt={roomtype.name} /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: {roomtype.id}</div>
                        <h1 className="display-5 fw-bolder">{roomtype.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">${roomtype.price*1.2}</span>
                            <span>${roomtype.price}</span>
                        </div>
                        <p className="lead">{roomtype.description}</p>

                        <HStack w="100%" p={3} bg="blue.100" borderRadius="6px" mt={4} >
                            <Text fontSize={12}>Chọn ngày thuê: </Text>
                            <DatePicker
                            minDate={new Date()}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            withPortal
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            />
        {/* -----------------------------------------------Chọn số lượng người thuê------------------------------------------------- */}
                            <Text fontSize={12}>Số lượng khách thuê: </Text>
                            <Input type="number" defaultValue={1} min={1} max={20} bg="white" size="xs" maxW={16}
                            onChange={(e) => setCustomerNum(e.target.value)} ></Input>
                            <Spacer />

        {/* -----------------------------------------------Nút tìm kiếm phòng------------------------------------------------- */}
                            {startDate && endDate && (
                              <ModalScrollCustom 
                                icon={<i className="fa fa-search" aria-hidden="true"></i>}
                                title="Thành viên nội bộ"
                                className="btn-detail-list"
                                onBtnClick={() =>
                                  handleCheckRoomEmpty({
                                      idRoomtype: roomtype.id,
                                      customerNum: customerNum,
                                      startDate: startDate,
                                      endDate: endDate,
                                  })}
                                content={<>
                                          <TableRoomElement rooms={roomsChecked}/>
                                          <TableServiceElement services={services} />
                                          <HStack justify="end" mt={8}>
                                            <button className="btn btn-outline-dark flex-shrink-0" type="button"
                                              onClick={handleReservationRoom}
                                            >
                                                <i className="bi-cart-fill me-1"></i>
                                                Đặt ngay
                                            </button>
                                          </HStack>
                                        </>}
                                closeOnOverlayClick={false}
                              />
                            )}
                        </HStack>

                        {/* <div className="d-flex">
                            <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Đặt ngay
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Related items section--> */}
        <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Phòng khác</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {roomtypes && roomtypes.map((roomtype, index) => (
              <div className="col mb-5" key={index}>
                <div className="card h-100">
                  {/* <!-- Sale badge--> */}
                  <div
                    className="badge bg-dark text-white position-absolute"
                    style={{top: '0.5rem', right: '0.5rem'}}
                  >
                    Giảm
                  </div>
                  {/* <!-- Product image--> */}
                  <img
                    className="card-img-top"
                    src={roomtype.avatarUrl}
                    alt={roomtype.name}
                  />
                  {/* <!-- Product details--> */}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* <!-- Product name--> */}
                      <h5 className="fw-bolder">{roomtype.name}</h5>
                      {/* <!-- Product reviews--> */}
                      <div className="d-flex justify-content-center small text-warning mb-2">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      </div>
                      {/* <!-- Product price--> */}
                      <span className="text-muted text-decoration-line-through">
                        ${roomtype.price}
                      </span>
                      ${roomtype.price}
                    </div>
                  </div>
                  {/* <!-- Product actions--> */}
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link className="btn btn-outline-dark mt-auto" to={`/rooms/${roomtype.id}`}>Xem</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
                </div>
            </div>
        </section>
        </>
    )

}


function TableServiceElement(props) {
    const { services } = props;
    const dispatch = useDispatch();
  
    const handleSetServices = (id, quantity) => {
      dispatch(doSetServices({ id, quantity }));
    };
  
    return (
      <>
        <Table size="sm" mt={4} shadow="lg" bg="white" borderRadius="6">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Tên</Th>
              <Th>Số lượng</Th>
              <Th isNumeric>Giá (VND)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services ? (
              services.map((service, index) => (
                <Tr key={index}>
                  <Td>{service.id}</Td>
                  <Td>{service.name}</Td>
                  <Th>
                    <Input defaultValue="0" width={50} type="number" max={10} min={0} borderColor="blue.100" size="sm"
                      onChange={(e) => handleSetServices(service.id, e.target.value)} />
                  </Th>
                  <Td isNumeric>{service.price}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6}>
                  <Alert status="warning" mt={4}>
                    <AlertIcon/>
                    Danh sách dịch vụ khách sạn trống !
                  </Alert>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </>
    );
  }
  
  function TableRoomElement(props) {
    const { rooms } = props;
    const dispatch = useDispatch();
    const [checkboxRoom, setCheckboxRoom] = useState([])
    const [inputService, setInputService] = useState([])
  
    const handleSetRoomsId = (idRoom) => {
      dispatch(doSetRoomsId(idRoom));
    };

    return (
      <>
        <Table size="sm" mt={4} shadow="lg" bg="white" borderRadius="6">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Id</Th>
              <Th>Số phòng</Th>
              <Th>Tầng</Th>
              <Th>Lượng khách</Th>
              <Th isNumeric>Giá phát sinh (VND)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rooms ? (
              rooms.map((room, index) => (
                <Tr key={index}>
                  <Td>
                    <Checkbox onChange={() => handleSetRoomsId(room.id)} />
                  </Td>
                  <Td>{room.id}</Td>
                  <Td>{room.roomNum}</Td>
                  <Td>{room.floor}</Td>
                  <Td>{room.customerNum}</Td>
                  <Td isNumeric>{room.incurredPrice}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6}>
                  <Alert status="warning" mt={4}>
                    <AlertIcon />
                    Không có phòng trống !
                  </Alert>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </>
    );
  }

export default RoomDetailPublic