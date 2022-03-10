import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
// import { Country, State, City } from "country-state-city";

import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast 
} from "@chakra-ui/react";

import { doCheckRoomEmpty } from "../../../../redux/actions/room-action";
import { doShowRoomtypeByAvatarStateList } from "../../../../redux/actions/roomtype-action";
import { doFindAll } from "../../../../redux/actions/service-action";
import FormField from "../../fragments/FormField";
import { doFindByIdEmailPhoneNum } from "../../../../redux/actions/account-action";
import {
  doCreateReservation,
  doSetRoomsId,
  doSetServices,
} from "../../../../redux/actions/reservation-action";

function RoomReservation() {
  const dispatch = useDispatch();

  const toast = useToast()
  const [customerNum, setCustomerNum] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [roomtype, setRoomtype] = useState(null);
  const [keyword, setKeyword] = useState("");

  
  const reservationResponse = useSelector((state => state.reservationReducer.apiResponse))
  const roomsChecked = useSelector((state) => state.roomReducer.roomsChecked);
  const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes);
  const services = useSelector((state) => state.serviceReducer.services);
  const account = useSelector((state) => state.accountReducer.account);
  const reservationRooms = useSelector(
    (state) => state.reservationReducer.rooms
  );
  const reservationServices = useSelector(
    (state) => state.reservationReducer.services
  );

  const initialValues = {
    id: "",
    name: "",
    address: "",
    email: "",
    phoneNum: "",
    avatar: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string("Chỉ được nhập kiểu văn bản").required(
      "Trường này không được để trống."
    ),
    address: Yup.string().required("Trường này không được để trống."),
    email: Yup.string().email().required("Trường này không được để trống."),
    phoneNum: Yup.string().required("Trường này không được để trống."),
  });

  const handleCheckRoomEmpty = (apiRequest) => {
    dispatch(doCheckRoomEmpty(apiRequest));
  };

  const handleFindRoomtypeById = (idRoomtype) => {
    var _rt = roomtypes.find((rt) => rt.id == idRoomtype);
    setRoomtype(_rt);
  };

  useEffect(() => {
    dispatch(doShowRoomtypeByAvatarStateList());
    dispatch(doFindAll());
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={(values) => {
          var data = {
            customer: {
              id: values.id,
              name: values.name,
              email: values.email,
              address: values.address,
              phoneNum: values.phoneNum,
            },
            rooms: reservationRooms,
            services: reservationServices,
            startDate: startDate,
            endDate: endDate,
            customerNum: customerNum,
            idRoomtype: roomtype.id,
          };

          console.log(data);
          dispatch(doCreateReservation(data));
          toast({
            title: 'Tạo phiếu đặt phòng.',
            description: reservationResponse.message,
            status: reservationResponse.sussess ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
          })
        }}
      >
        {(formikProps) => {
          // ... do something here ...
          const { values, errors, touched, setFieldValue } = formikProps;

          const handleFindByKeyword = () => {
            dispatch(doFindByIdEmailPhoneNum(keyword));
            setFieldValue("name", account.name || "");
            setFieldValue("email", account.email || "");
            setFieldValue("address", account.address || "");
            setFieldValue("phoneNum", account.phoneNum || "");
            setFieldValue("avatar", account.avatar || "");
            setFieldValue("id", account.id || "");
          };

          return (
            <Form>
              <Heading py={4}>Đặt phòng</Heading>
              <Divider />
              <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
                <GridItem bg="#EDF2F7" borderRadius={8} p={4} colSpan={1} boxShadow="lg" >

{/* -----------------------------------------------Chọn loại phòng------------------------------------------------- */}
                  <Heading size="lg" color="blue.500">Chọn phòng</Heading>

                  <Select placeholder="Chọn loại phòng ..." size="sm" bg="blue.100" mt={4} borderRadius="6px"
                    onChange={(e) => handleFindRoomtypeById(e.target.value)}
                  >
                    {roomtypes.map((rt) => (
                      <option value={rt.id} key={rt.id}>
                        {rt.name}
                      </option>
                    ))}
                  </Select>

                  <RoomTypeElement roomtype={roomtype} />

{/* -----------------------------------------------Chọn ngày thuê------------------------------------------------- */}
                  <HStack w="100%" p={3} bg="blue.100" borderRadius="6px" mt={4} >
                    <Text fontSize={12}>Chọn ngày thuê: </Text>
                    <DatePicker
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
                      <Button size="xs" colorScheme="blue" fontSize="14px"
                        onClick={() =>
                          handleCheckRoomEmpty({
                            idRoomtype: roomtype.id,
                            customerNum: customerNum,
                            startDate: startDate,
                            endDate: endDate,
                          })
                        }
                      >
                        Tìm phòng
                      </Button>
                    )}

                  </HStack>
{/* -----------------------------------------------RoomListElement------------------------------------------------- */}
                  <TableRoomElement rooms={roomsChecked} />

                  <Heading size="lg" color="blue.500" mt={8}>Chọn dịch vụ</Heading>
{/* -----------------------------------------------ServiceListElement------------------------------------------------- */}
                  <TableServiceElement services={services} />
                </GridItem>

                <GridItem bg="#EDF2F7" borderRadius={8} p={4} colSpan={1} boxShadow="lg" >
                  <Heading size="lg" color="blue.500">Thông tin khách hàng</Heading>
{/* -----------------------------------------------form tìm kiếm khách hàng------------------------------------------------- */}
                  <InputGroup mt={4} size="sm">
                    <Input borderRadius="20px" borderColor="blue.100" fontStyle="italic" type="search"
                      placeholder="Nhập Id, email, số điện thoại để tìm kiếm khách hàng ..."
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <InputRightElement type="button">
                      <Button h="1.75rem" borderRadius="20px" onClick={() => handleFindByKeyword()} >
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <HStack align="start">
                    <Box width="30%" mr={4}>
                      <Image mt={4} boxSize="200px" objectFit="cover" borderRadius="6px" src={account.avatar || ""} alt="Ảnh đại diện của khách" />
                    </Box>

{/* -----------------------------------------------form thông tin khách hàng------------------------------------------------- */}                    
                    <Box width="70%">
                      <FastField name="id" type="hidden" component={FormField.InputField} />
                      <FastField name="name" type="text" component={FormField.InputField} label="Họ & tên" />
                      <FastField name="email" type="email" component={FormField.InputField} label="Email" />
                      <FastField name="address" component={FormField.InputField} type="text" label="Địa chỉ" />
                      <FastField name="phoneNum" component={FormField.InputField} type="text" label="Số điện thoại" />
                    </Box>
                  </HStack>
{/* -----------------------------------------------Nút xử lý chức năng đặt phòng------------------------------------------------- */}
                  <HStack mt={8} justify="right">
                    <Button colorScheme="blue">Báo giá</Button>
                    <Button colorScheme="blue" type="submit">Đặt phòng</Button>
                  </HStack>

                </GridItem>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
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
                  <AlertIcon />
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

function RoomTypeElement(props) {
  const { roomtype } = props;

  return (
    <>
      {roomtype ? (
        <HStack mt={4} align="start">
          <Box w="40%">
            <Image src={roomtype.avatarUrl} alt={roomtype.name} borderRadius="8px" />
          </Box>
          <Box w="60%">
            <Heading fontSize={18} textAlign="start">
              {roomtype.name}
            </Heading>
            <Badge colorScheme="purple" fontSize={14}>
              {roomtype.price} VND/Day
            </Badge>
            <Text fontSize={14} lineHeight="1.2" textAlign="justify">
              {roomtype.description}
            </Text>
          </Box>
        </HStack>
      ) : (
        <Alert status="warning" mt={4}>
          <AlertIcon />
          Vui lòng chọn loại phòng !
        </Alert>
      )}
    </>
  );
}

export default RoomReservation;
