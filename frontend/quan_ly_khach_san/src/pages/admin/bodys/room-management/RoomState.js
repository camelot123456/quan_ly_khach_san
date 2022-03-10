import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  ListItem,
  Select,
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
  UnorderedList,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {formatDate} from '../../../../commons/dateformat-common'
import { doShowRoomsAdmin } from "../../../../redux/actions/room-action";
import { doCancelById, doFindForTransaction } from "../../../../redux/actions/reservation-action";
import { doCreateTransactionPaymnet } from "../../../../redux/actions/transaction-action"
import ModalScrollCustom from "../../fragments/ModalScrollCustom";

function RoomState() {
  const [searchParams, setSearchParams] = useSearchParams(0);
  const [roomState, setRoomState] = useState("all");

  const rooms = useSelector((state) => state.roomReducer.rooms);
  
  const dispatch = useDispatch();

  const parseColor = (roomState) => {
    switch (roomState) {
      case "ALL":
        return "#4299E1";
      case "EMPTY":
        return "#A0AEC0";
      case "USING":
        return "#48BB78";
      case "DEPOSIT":
        return "#9F7AEA";
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
    );
  }, [roomState]);

  return (
    <>
      <Tabs isFitted variant="enclosed" index={+searchParams.get("tab2") || 0}>
        <TabList color="white">
          <Link to="/admin/rooms?tab1=0&tab2=0">
            <Tab borderRadius={8} h={70} bg="#4299E1" mr={10} w={220} 
              onClick={() => setRoomState("all")} >
              Tất cả:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=1">
            <Tab borderRadius={8} h={70} bg="#48BB78" mr={10} w={220} 
              onClick={() => setRoomState("using")} >
              Đang ở:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=2">
            <Tab borderRadius={8} h={70} bg="#9F7AEA" mr={10} w={220}
              onClick={() => setRoomState("deposit")}
            >
              Đặt cọc:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=3">
            <Tab borderRadius={8} h={70} bg="#A0AEC0" mr={10} w={220}
              onClick={() => setRoomState("empty")}
            >
              Trống:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=4">
            <Tab borderRadius={8} h={70} bg="#F56565" mr={10} w={220}
              onClick={() => setRoomState("repair")}
            >
              Sửa chữa:{" "}
            </Tab>
          </Link>
        </TabList>

        <HStack mt={4} justify="start">
          <Link to="/admin/rooms/reservation">
            <Button colorScheme="blue">Đặt phòng</Button>
          </Link>
        </HStack>

        <TabPanels>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={parseColor}
              type="ALL"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("USING")}
              type="USING"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
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
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("EMPTY")}
              type="EMPTY"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("REPAIR")}
              type="REPAIR"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function RoomAll(props) {
  const { rooms, onFormatDate, onParseColor, type, onCancelRoom, reservation, onFindReservationForTransaction } = props;


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

  return (
    <>
      <Wrap marginTop={4} justify="flex-start" spacing={6}>
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
                  to={`/admin/rooms/${room.idRoom}?idTransaction=${
                    room.idTransaction === null ? "" : room.idTransaction
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
                  <Text color="white" textAlign="center">
                    {room.roomState}
                  </Text>
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
                      <Box color="white" borderRadius={4} border="solid 1px" bg="red.800" minWidth="26px"
                        textAlign="center" _hover={{ borderColor: "white", bg: "red.500", cursor: "pointer" }} 
                        onClick={() => handleCancelRoom({idReservation: room.idReservation, idRoom: room.idRoom})}
                      >
                        <i className="fa fa-ban" aria-hidden="true"></i>
                      </Box>

                      <ModalScrollCustom
                        icon={<i className="fa fa-credit-card" aria-hidden="true"></i>}
                        className='btn-reservation-deposit'
                        onBtnClick={handleFindReservationForTransaction}
                        data={room.idReservation}
                        contentPayment={<ContentPayment />}
                      />
                    </>) : (<></>)
                  }

                  {type == "USING" ?
                    (<>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="red.800"
                          _hover={{ borderColor: "white", bg: "red.500" }}
                        >
                          <i className="fa fa-ban" aria-hidden="true"></i>
                        </Box>
                      </Link>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="blue.800"
                          _hover={{ borderColor: "white", bg: "blue.500" }}
                        >
                          <i className="fa fa-comments" aria-hidden="true"></i>
                        </Box>
                      </Link>
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
                      <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="green.800"
                          _hover={{ borderColor: "white", bg: "green.500" }}
                        >
                          <i className="fa fa-medkit" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

                </HStack>
              </VStack>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}

function ContentPayment(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservation = useSelector((state) => state.reservationReducer.reservation);
  
  const handlePayment = (idReservation) => {
    dispatch(doCreateTransactionPaymnet(idReservation))
    navigate("/admin/room")
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
        <Text fontSize={14}>{reservation.reservation.idReservation}</Text>
        <Text align="center" fontSize={14}>{formatDate(reservation.reservation.createdAt, "hh:MM:ss - dd/mm/yyyy")}</Text>
        <Text fontSize={14}>Mã khách hàng: {reservation.reservation.idAccount}</Text>
        <Text fontSize={14}>Khách hàng: {reservation.reservation.nameAccount}</Text>
        <Divider />
        {/* <Heading align="center" fontSize={14}>Loại phòng</Heading> */}
        <Text fontSize={14}>Loại phòng: {reservation.reservation.nameRoomtype}</Text>
        <Text fontSize={14}>Ngày đặt: {formatDate(reservation.reservation.startDate, "dd/mm/yyyy")}</Text>
        <Text fontSize={14}>Ngày trả: {formatDate(reservation.reservation.endDate, "dd/mm/yyyy")}</Text>
        <Text fontSize={14}>Số người: {reservation.reservation.customerNum}</Text>
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
            {reservation.rooms.map((room, index) => (
              <Tr key={index}>
                <Th>{room.id}</Th>
                <Th>{room.roomNum}</Th>
                <Th>{room.floor}</Th>
                <Th isNumeric>{room.incurredPrice}</Th>
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
            {reservation.services.map((service, index) => (
              <Tr key={index}>
                <Th>{service.idService}</Th>
                <Th>{service.name}</Th>
                <Th>{service.quantity}</Th>
                <Th>{service.price}</Th>
                <Th isNumeric>{service.intoPrice}</Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Divider />
        <Table variant='simple' size='sm'>
          <Tbody>
            <Tr>
              <Th>Tiền phòng:</Th>
              <Th isNumeric>{reservation.reservation.priceRoomtype}</Th>
            </Tr>
            <Tr>
              <Th>Tổng:</Th>
              <Th isNumeric>{Math.ceil(reservation.reservation.total)}</Th>
            </Tr>
            <Tr>
              <Th>Thuế dịch vụ (5%):</Th>
              <Th isNumeric>{Math.ceil(reservation.reservation.taxService)}</Th>
            </Tr>
            <Tr>
              <Th>Thuế VAT (10%):</Th>
              <Th isNumeric>{Math.ceil(reservation.reservation.taxInvoice)}</Th>
            </Tr>
            <Tr>
              <Th color="red">Tổng cộng:</Th>
              <Th color="red" isNumeric>{Math.ceil(reservation.reservation.grandTotal)}</Th>
            </Tr>
          </Tbody>
        </Table>
        <HStack mt={4} justify="end">
          <Button colorScheme='blue' onClick={() => handlePayment({
            reservation: {
              id: reservation.reservation.idReservation
            },
            account: {
              id: reservation.reservation.idAccount
            }
          })}>Thanh toán</Button>
        </HStack>
      </Flex>
    </>
  );
}

export default RoomState;
