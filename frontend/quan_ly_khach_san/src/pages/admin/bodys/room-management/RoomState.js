import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
  WrapItem,
  AlertIcon,
  Alert,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {formatDate} from '../../../../commons/dateformat-common'
import { doShowRoomsAdmin, doUpdateRoomstate } from "../../../../redux/actions/room-action";
import { doCancelById, doCheckoutRoomReservation, doFindForTransaction } from "../../../../redux/actions/reservation-action";
import { doCreateTransactionPaymnet } from "../../../../redux/actions/transaction-action"
import ModalScrollCustom from "../../fragments/ModalScrollCustom";
import AlertDialogCustom from "../../fragments/AlertDialogCustom";

function RoomState() {

  const toast = useToast()
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams(0);
  const [roomState, setRoomState] = useState(() => {
    if (searchParams.get("tab2") == "0") {
      return "using"
    } else if (searchParams.get("tab2") == "1") {
      return "waiting"
    } else if (searchParams.get("tab2") == "2") {
      return "deposit"
    } else if (searchParams.get("tab2") == "3") {
      return "checkout"
    } else if (searchParams.get("tab2") == "4") {
      return "empty"
    } else if (searchParams.get("tab2") == "5") {
      return "repair"
    }
  });

  const rooms = useSelector((state) => state.roomReducer.roomsState);

  const parseColor = (roomState) => {
    switch (roomState) {
      case "CHECKOUT":
        return "#4299E1";
      case "EMPTY":
        return "#A0AEC0";
      case "USING":
        return "#48BB78";
      case "DEPOSIT":
        return "#9F7AEA";
      case "WAITING":
        return "#D69E2E";
      case "REPAIR":
        return "#F56565";
      default:
        return "#4299E1";
    }
  };

  const handleFindReservationForTransaction = (idReservation) => {
    dispatch(doFindForTransaction(idReservation))
  }

  const handleCancelReservationById = (dataRequest) => {
    dispatch(doCancelById(dataRequest))
    .then((res) => {
      toast({
        description: "Huỷ phiếu đặt phòng thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch((err) => {
      toast({
        description: "Huỷ phiếu đặt phòng thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    .finally(() => {
      dispatch(
        doShowRoomsAdmin({
          roomState: "deposit",
          currentPage: 0,
          sizePage: 20,
          sortField: "id",
          sortDir: "asc",
          keyword: "",
        })
      );
    })
  }

  const handleCheckoutEarlyReservationById = (dataRequest) => {
    dispatch(doCancelById(dataRequest))
    .then((res) => {
      toast({
        description: "Trả phòng thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch((err) => {
      toast({
        description: "Trả phòng thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    .finally(() => {
      dispatch(
        doShowRoomsAdmin({
          roomState: "using",
          currentPage: 0,
          sizePage: 20,
          sortField: "id",
          sortDir: "asc",
          keyword: "",
        })
      );
    })
  }

  const handleCheckoutRoomReservation = (dataRequest) => {
    dispatch(doCheckoutRoomReservation(dataRequest))
    .then((res) => {
      toast({
        description: "Trả phòng thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch((err) => {
      toast({
        description: "Trả phòng thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    .finally(() => {
      dispatch(
        doShowRoomsAdmin({
          roomState: "checkout",
          currentPage: 0,
          sizePage: 20,
          sortField: "id",
          sortDir: "asc",
          keyword: "",
        })
      );
    })
  }

  const handleSetRoomRepair = (idRoom) => {
    dispatch(doUpdateRoomstate({id: idRoom, roomState: "EMPTY"}))
    .then(res => {
      toast({
        title: 'Thông báo',
        description: "Cập nhập thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch(err => {
      toast({
        title: 'Thông báo',
        description: "Cập nhập thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }).finally(() => {
      doShowRoomsAdmin({
        roomState: "repair",
        currentPage: 0,
        sizePage: 20,
        sortField: "id",
        sortDir: "asc",
        keyword: "",
      });
    })
  }

  const handlePaymentReservationById = (dataRequest) => {
    dispatch(doCreateTransactionPaymnet(dataRequest))
  }

  useEffect(() => {
    dispatch(
      doShowRoomsAdmin({
        roomState: roomState,
        currentPage: 0,
        sizePage: 20,
        sortField: "id",
        sortDir: "asc",
        keyword: "",
      })
    )
  }, [roomState]);

  return (
    <>
      <Tabs isFitted variant="enclosed" index={+searchParams.get("tab2") || 0}>
{/* -----------------------------------------------tab room state------------------------------------------------- */}  
        <TabList color="white">

          <Link to="/admin/rooms?tab1=0&tab2=0">
            <Tab borderRadius={8} h={70} bg="#48BB78" mr={5} w={190} 
              onClick={() => setRoomState("using")} >
              Đang ở: {rooms.length || 0} 
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=1">
            <Tab borderRadius={8} h={70} bg="#D69E2E" mr={5} w={190}
              onClick={() => setRoomState("waiting")} >
              Phòng chờ: {rooms.length || 0}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=2">
            <Tab borderRadius={8} h={70} bg="#9F7AEA" mr={5} w={190} 
              onClick={() => setRoomState("deposit")} >
              Đặt cọc: {rooms.length || 0}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=3">
            <Tab borderRadius={8} h={70} bg="#4299E1" mr={5} w={190} 
              onClick={() => setRoomState("checkout")} >
              Trả phòng: {rooms.length || 0}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=4">
            <Tab borderRadius={8} h={70} bg="#A0AEC0" mr={5} w={190}
              onClick={() => setRoomState("empty")} >
              Trống: {rooms.length || 0}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=5">
            <Tab borderRadius={8} h={70} bg="#F56565" mr={5} w={190}
              onClick={() => setRoomState("repair")} >
              Sửa chữa: {rooms.length || 0}
            </Tab>
          </Link>
        </TabList>
{/* -----------------------------------------------nút chuyển hướng sang trang đặt phòng------------------------------------------------- */}  
        <HStack mt={4} justify="start">
          <Link to="/admin/rooms/reservation">
            <Button colorScheme="blue">Đặt phòng</Button>
          </Link>
        </HStack>
{/* -----------------------------------------------RoomList------------------------------------------------- */}  
        <TabPanels>
    
          <TabPanel>
            <RoomAll
              rooms={rooms || []}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("USING")}
              type="USING"
              onCancelRoom={handleCheckoutEarlyReservationById}
            />
          </TabPanel>

          <TabPanel>
            <RoomAll
              rooms={rooms || []}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("WAITING")}
              type="WAITING"
            />
          </TabPanel>

          <TabPanel>
            <RoomAll
              rooms={rooms || []}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("DEPOSIT")}
              type="DEPOSIT"
              onCancelRoom={handleCancelReservationById}
              onPayment={handlePaymentReservationById}
              onFindReservationForTransaction={handleFindReservationForTransaction}
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms || []}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("CHECKOUT")}
              onCheckoutRoomReservation={handleCheckoutRoomReservation}
              type="CHECKOUT"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms || []}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("EMPTY")}
              type="EMPTY"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms || []}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("REPAIR")}
              type="REPAIR"
              onSetRoomRepair={handleSetRoomRepair}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function RoomAll(props) {
  const { rooms, onFormatDate, onParseColor, type, onCancelRoom, onFindReservationForTransaction, onCheckoutRoomReservation, onSetRoomRepair } = props;

  const reservationTransaction = useSelector((state) => state.reservationReducer.reservationTransaction);

  const handleSetRoomRepair = (idRoom) => {
    if (onSetRoomRepair) {
      return onSetRoomRepair(idRoom);
    }
  };

  const handleFormatDate = (date, format) => {
    if (onFormatDate) {
      return onFormatDate(date, format);
    }
  };

  const handleParseColor = (roomState) => {
    if (onParseColor) {
      return onParseColor(roomState);
    }
  };

  const handleCancelRoom = (data) => {
    if (onCancelRoom) {
      return onCancelRoom(data);
    }
  };

  const handleFindReservationForTransaction = (idReservation) => {
    if (onFindReservationForTransaction) {
      onFindReservationForTransaction(idReservation);
    }
  }

  const handleCheckoutRoomReservation = (idReservation) => {
    if (onCheckoutRoomReservation) {
      onCheckoutRoomReservation(idReservation);
    }
  }

  return (
    <>
      {rooms.length > 0 ? (<Wrap marginTop={4} justify="flex-start" spacing={6}>
        {rooms.map((room, index) => (
          <WrapItem key={index + 1} boxShadow="2xl">
            <Box p={2} borderRadius={4} w="185px" bg={handleParseColor(room.roomState)} >
              <Flex>
                <Box color="white">{index + 1}</Box>
                <Spacer />
                <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                  <Box color="white" borderRadius={4} rder="solid 1px" 
                    _hover={{ borderColor: "white", bg: "white", color: "black", }}
                  >
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                  </Box>
                </Link>
                <Link
                  style={{ minWidth: "26px", textAlign: "center" }}
                  to={`/admin/rooms/${room.idRoom}?idReservation=${
                    room.idReservation === null ? "" : room.idReservation
                  }`}
                >
                  <Box color="white" borderRadius={4} border="solid 1px"
                    _hover={{ borderColor: "white", bg: "white", color: "black", }}
                  >
                    <i className="fa fa-info" aria-hidden="true"></i>
                  </Box>
                </Link>
              </Flex>
              <VStack>
                <Box>
                  <Text color="white" textAlign="center">
                    {room.roomNum}
                  </Text>
                  {/* <Text color="white" textAlign="center">
                    {room.roomState}
                  </Text> */}
                  <Text color="white" textAlign="center">
                    <i className="fa fa-user" aria-hidden="true"></i>{" "}
                    {room.nameAccount || "Chưa có"}
                  </Text>
                  <Text color="white" textAlign="center">
                    <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                    {handleFormatDate(room.startDate, "dd/mm/yyyy")}
                  </Text>
                  <Text color="white" textAlign="center">
                    <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                    {handleFormatDate(room.endDate, "dd/mm/yyyy")}
                  </Text>
                </Box>
                <Spacer />
                <HStack justify="center">
                  {type == "DEPOSIT" ?
                    (<>
                      <AlertDialogCustom 
                        nameBtnCall={<i className="fa fa-ban" aria-hidden="true"></i>}
                        className="btn-cancel-deposit"
                        title="Hủy phiếu đặt phòng"
                        content="Bạn có muốn hủy phòng này không ?"
                        nameBtnNegative="Xác nhận"
                        nameBtnPositive="Hủy"
                        onBtnNegative={() => handleCancelRoom({idReservation: room.idReservation, idRoom: room.idRoom})}
                      />

                      <ModalScrollCustom
                        icon={<i className="fa fa-credit-card" aria-hidden="true"></i>}
                        className='btn-reservation-deposit'
                        onBtnClick={handleFindReservationForTransaction}
                        data={room.idReservation}
                        title="Payment"
                        content={<ContentPayment reservationTransaction={reservationTransaction}/>}
                      />
                    </>) : (<></>)
                  }

                  {type == "USING" ?
                    (<>
                      <AlertDialogCustom 
                        nameBtnCall={<i className="fa fa-ban" aria-hidden="true"></i>}
                        className="btn-cancel-deposit"
                        title="Trả phòng"
                        content={<>
                          <p>Ngày trả phòng: {handleFormatDate(room.endDate, "dd/mm/yyyy")}</p>
                          <p>Bạn có chắc khách hàng muốn trả phòng này không ?</p>
                        </>}
                        nameBtnNegative="Xác nhận"
                        nameBtnPositive="Hủy"
                        onBtnNegative={() => handleCancelRoom({idReservation: room.idReservation, idRoom: room.idRoom})}
                      />

                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="blue.800"
                          _hover={{ borderColor: "white", bg: "blue.500" }}
                        >
                          <i className="fa fa-comments" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

                  {type == "CHECKOUT" ?
                    (<>
                      <AlertDialogCustom 
                        nameBtnCall={<i className="fa fa-ban" aria-hidden="true"></i>}
                        className="btn-cancel-deposit"
                        title="Trả phòng"
                        content="Bạn có chắc khách hàng đã phòng này không ?"
                        nameBtnNegative="Xác nhận"
                        nameBtnPositive="Hủy"
                        onBtnNegative={() => handleCheckoutRoomReservation({idReservation: room.idReservation})}
                      />
                    </>) : (<></>)
                  }

                  {type == "EMPTY" ?
                    (<>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="red.800"
                          _hover={{ borderColor: "white", bg: "red.500" }}
                        >
                          <i className="fa fa-gavel" aria-hidden="true"></i>
                        </Box>
                      </Link>
                      <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="green.800"
                          _hover={{ borderColor: "white", bg: "green.500" }}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

                  {type == "REPAIR" ?
                    (<>
                      <AlertDialogCustom 
                        nameBtnCall={<i className="fa fa-ban" aria-hidden="true"></i>}
                        className="btn-cancel-deposit"
                        title="Trả phòng"
                        content="Bạn có phòng hoàn tất sửa chữa ?"
                        nameBtnNegative="Xác nhận"
                        nameBtnPositive="Hủy"
                        onBtnNegative={() => handleSetRoomRepair(room.idRoom)}
                      />
                    </>) : (<></>)
                  }

                </HStack>
              </VStack>
            </Box>
          </WrapItem>
        ))}
      </Wrap>):(
        <Alert status='info'>
          <AlertIcon />
          Danh sách trống !
        </Alert>
      )}
    </>
  );
}

function ContentPayment(props) {
  
  const {reservationTransaction} = props
  console.log(reservationTransaction)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()

  const handlePayment = (idReservation) => {
    dispatch(doCreateTransactionPaymnet(idReservation))
    .then((res) => {
      toast({
        title: 'Thông báo',
        description: "Đã thanh toán thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch((err) => {
      toast({
        title: 'Thông báo',
        description: "Thanh toán thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    .finally(() => {
      navigate("/admin/transactions")
    })
  }

  return (
    <>
      <Flex direction="column">
        <HStack>
          <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            S2 HOTEL
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
          </Heading>
        </HStack>
        <Divider />
        <Heading align="center" fontSize={32} >Phiếu thanh toán</Heading>
        <Text fontSize={14} align="center">{reservationTransaction.reservation.idReservation || ''}</Text>
        <Text fontSize={14} align="center">{formatDate(reservationTransaction.reservation.createdAt, "hh:MM:ss - dd/mm/yyyy") || ''}</Text>
        <Text fontSize={14}>Mã khách hàng: {reservationTransaction.reservation.idAccount || ''}</Text>
        <Text fontSize={14}>Khách hàng: {reservationTransaction.reservation.nameAccount || ''}</Text>
        <Divider />
        {/* <Heading align="center" fontSize={14}>Loại phòng</Heading> */}
        <Text fontSize={14}>Loại phòng: {reservationTransaction.reservation.nameRoomtype}</Text>
        <Text fontSize={14}>Ngày đặt: {formatDate(reservationTransaction.reservation.startDate, "dd/mm/yyyy") || ''}</Text>
        <Text fontSize={14}>Ngày trả: {formatDate(reservationTransaction.reservation.endDate, "dd/mm/yyyy") || ''}</Text>
        <Text fontSize={14}>Số người: {reservationTransaction.reservation.customerNum || 0}</Text>
        <Divider />
        {/* <Heading align="center" fontSize={14}>Phòng</Heading> */}
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Phòng</Th>
              <Th>Tầng</Th>
              <Th isNumeric>Giá</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservationTransaction.rooms.map((room, index) => (
              <Tr key={index}>
                <Th>{room.id || ''}</Th>
                <Th>{room.roomNum || ''}</Th>
                <Th>{room.floor || 0}</Th>
                <Th isNumeric>{room.incurredPrice || 0}</Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Divider />
        {/* <Heading align="center" fontSize={14}>Dịch vụ</Heading> */}
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Tên</Th>
              <Th>Số lượng</Th>
              <Th>Giá</Th>
              <Th isNumeric>Thành tiền</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservationTransaction.services && reservationTransaction.services.map((service, index) => (
              <Tr key={index}>
                <Th>{service.idService || ''}</Th>
                <Th>{service.name || ''}</Th>
                <Th>{service.quantity || 0}</Th>
                <Th>{service.price || 0}</Th>
                <Th isNumeric>{service.intoPrice || 0}</Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Divider />
        <Table variant='simple' size='sm'>
          <Tbody>
            <Tr>
              <Th>Tiền phòng:</Th>
              <Th isNumeric>{reservationTransaction.reservation.priceRoomtype || 0}</Th>
            </Tr>
            <Tr>
              <Th>Tổng:</Th>
              <Th isNumeric>{Math.ceil(reservationTransaction.reservation.total) || 0}</Th>
            </Tr>
            <Tr>
              <Th>Thuế dịch vụ (5%):</Th>
              <Th isNumeric>{reservationTransaction.reservation.taxService || 0}</Th>
            </Tr>
            <Tr>
              <Th>Thuế VAT (10%):</Th>
              <Th isNumeric>{reservationTransaction.reservation.taxInvoice || 0}</Th>
            </Tr>
            <Tr>
              <Th color="red">Tổng cộng:</Th>
              <Th color="red" isNumeric>{Math.ceil(reservationTransaction.reservation.grandTotal) || 0}</Th>
            </Tr>
          </Tbody>
        </Table>
        <HStack mt={4} justify="end">
          <Button colorScheme='blue' onClick={() => handlePayment({
            reservation: {
              id: reservationTransaction.reservation.idReservation
            },
            account: {
              id: reservationTransaction.reservation.idAccount
            }
          })}>Thanh toán</Button>
        </HStack>
      </Flex>
    </>
  );
}

export default RoomState;
