import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../../../../App.css'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  Center,
  HStack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Text,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Wrap,
  WrapItem,
  Heading,
  Select,
} from "@chakra-ui/react";

import { findAll, doSaveRoom, doUpdateRoom, doDeleteRoom } from "../../../../redux/actions/room-action";
import ModalScrollCustom from "../../fragments/ModalScrollCustom"
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import {formatDate} from '../../../../commons/dateformat-common'
import { doShowRoomtypeByAvatarStateList } from "../../../../redux/actions/roomtype-action";

function RoomList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.roomReducer.rooms);

  useEffect(() => {
    dispatch(findAll({
      currentPage: 0,
      sizePage: 20,
      sortField: "id",
      sortDir: "asc",
      keyword: "",
    }));
  }, []);

  const handleDeleteRoomById = (idRoom) => {
    dispatch(doDeleteRoom({id: idRoom}))
    .then(res => {
      toast({
        title: 'Thông báo',
        description: "Xóa phòng thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch(err => {
      toast({
        title: 'Thông báo',
        description: "Xóa phòng thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }).finally(() => {
      dispatch(findAll({
        currentPage: 0,
        sizePage: 20,
        sortField: "id",
        sortDir: "asc",
        keyword: "",
      }));
    })
  }

  return (
    <>
      <ModalScrollCustom 
          icon={<i className="fa fa-plus" aria-hidden="true"></i>}
          title="Phòng"
          className="btn-add-room"
          content={<ContentFormRoom edit={false} />}
          closeOnOverlayClick={false}
      />
      {rooms ? (
        <Table variant="striped" colorScheme="blue">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Stt</Th>
            <Th>Id</Th>
            <Th>Số phòng</Th>
            <Th>Tầng</Th>
            <Th>Chứa</Th>
            <Th>Giá phát sinh</Th>
            <Th>Công cụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rooms.map((room, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{room.id}</Td>
              <Td>{room.roomNum}</Td>
              <Td>{room.floor}</Td>
              <Td>{room.customerNum}</Td>
              <Td>{room.incurredPrice}</Td>
              <Td>
                <HStack>
                  <ModalScrollCustom 
                    icon={<i className="fa fa-pencil" aria-hidden="true"></i>}
                    title="Phòng"
                    className="btn-detail-room-list"
                    content={<ContentFormRoom edit={true} idRoom={room.id} room={room}/>}
                    closeOnOverlayClick={false}
                  />
                  <AlertDialogCustom 
                    nameBtnCall={<i className="fa fa-trash-o" aria-hidden="true"></i>}
                    className="btn-delete-room-list"
                    title="Xóa phòng"
                    content="Bạn có muốn xóa phòng này không ?"
                    nameBtnNegative="Xóa"
                    nameBtnPositive="Hủy"
                    onBtnNegative={() => handleDeleteRoomById(room.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      ) : (
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={20} spacing='4' />
        </Box>
      )}
    </>
  );
}

function ContentFormRoom ({edit, idRoom, room}) {

  const dispatch = useDispatch();
  const toast = useToast()
  const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes)

  useEffect(async () => {
    await dispatch(doShowRoomtypeByAvatarStateList())
  }, [])

  if (room===undefined) {
    room = {
      roomNum: '',
      floor: 1,
      customerNum: 1,
      incurredPrice: 0,
      description: ''
    }
  }

  const initialValues = {
    id: room.id,
    idRoomtype: room.idRoomtype,
    roomNum: room.roomNum,
    floor: room.floor,
    customerNum: room.customerNum,
    incurredPrice: room.incurredPrice,
    description: room.description
  }

  const validationSchema = Yup.object().shape({
    idRoomtype: Yup.string().required().required("Trường này không được để trống."),
    roomNum: Yup.string().required("Trường này không được để trống."),
    floor: Yup.number("Chỉ được nhập số").min(1).max(20).required("Trường này không được để trống."),
    customerNum: Yup.number("Chỉ được nhập số").min(1, "Tối thiểu là 1").max(10, "Tối đa là 10").required("Trường này không được để trống."),
    incurredPrice: Yup.number("Chỉ được nhập số").min(0).required("Trường này không được để trống."),
  })

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}
      onSubmit={(values) => {

        if (edit) {
          var data = {
            id: room.id,
            idRoomtype: values.idRoomtype,
            roomNum: values.roomNum,
            floor: values.floor,
            customerNum: values.customerNum,
            incurredPrice: values.incurredPrice,
            description: values.description
          }
          console.log(data)
          dispatch(doUpdateRoom(data))
          .then((res) => {
            toast({
              title: 'Thông báo',
              description: "Cập nhập phòng thành công",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          })
          .catch(err => {
            toast({
              title: 'Thông báo',
              description: "Cập nhập phòng thất bại",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          })
          .finally(() => {
            dispatch(findAll({
              currentPage: 0,
              sizePage: 20,
              sortField: "id",
              sortDir: "asc",
              keyword: "",
            }));
          })
        }
        else {
          var data = {
            idRoomtype: values.idRoomtype,
            roomNum: values.roomNum,
            floor: values.floor,
            customerNum: values.customerNum,
            incurredPrice: values.incurredPrice,
            description: values.description
          }
          console.log(data)
          dispatch(doSaveRoom(data))
          .then((res) => {
            toast({
              title: 'Thông báo',
              description: "Thêm mới phòng thành công",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          })
          .catch(err => {
            toast({
              title: 'Thông báo',
              description: "Thêm mới phòng thất bại",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          })
          .finally(() => {
            dispatch(findAll({
              currentPage: 0,
              sizePage: 20,
              sortField: "id",
              sortDir: "asc",
              keyword: "",
            }));
          })
        }
      }}
    >
      {(formikProps) => {
        const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;

        return ( 
          <Form id="form-room" name="form-room" encType="multipart/form-data">

            <FormControl isInvalid={errors.idRoomtype && touched.idRoomtype}>
              <FormLabel htmlFor="idRoomtype">Loại phòng</FormLabel>
              <Select placeholder="Chọn loại phòng ..." size="sm" bg="blue.100" borderRadius="6px" id="idRoomtype"
                onChange={handleChange} value={values.idRoomtype}
                >
                {roomtypes.map((rt) => (
                  <option value={rt.id} key={rt.id}>
                    {rt.name}
                  </option>
                ))}
              </Select>
              <p style={{fontSize: "14px", color: "red", opacity: "0.8"}}>{errors.idRoomtype}</p>
            </FormControl>

            {edit && (
              <>
                <Text fontWeight="medium">Id: {room.id || ''}</Text>
                <Text fontWeight="medium">Tạo lúc: {formatDate(room.createdAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
                <Text fontWeight="medium">Cập nhập lúc: {formatDate(room.modifiedAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
              </>
            )}

            <FormControl isInvalid={errors.roomNum && touched.roomNum}>
              <FormLabel htmlFor="roomNum">Số phòng</FormLabel>
              <Input size="sm" bg="white" id="roomNum" onChange={handleChange} value={values.roomNum}/>
              <FormErrorMessage>{errors.roomNum}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.floor && touched.floor}>
              <FormLabel htmlFor="floor">Tầng</FormLabel>
              <Input size="sm" bg="white" id="floor" type="number" onChange={handleChange} value={values.floor}/>
              <FormErrorMessage>{errors.floor}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.customerNum && touched.customerNum}>
              <FormLabel htmlFor="customerNum">Số khách</FormLabel>
              <Input size="sm" bg="white" id="customerNum" type="number" onChange={handleChange} value={values.customerNum}/>
              <FormErrorMessage>{errors.customerNum}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.incurredPrice && touched.incurredPrice}>
              <FormLabel htmlFor="incurredPrice">Giá phát sinh</FormLabel>
              <Input size="sm" bg="white" id="incurredPrice" onChange={handleChange} value={values.incurredPrice}/>
              <FormErrorMessage>{errors.incurredPrice}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description && touched.description}>
              <FormLabel htmlFor="description">Mô tả</FormLabel>
              <Textarea size="sm" bg="white" id="description" onChange={handleChange} value={values.description}/>
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <HStack justify="right">
              {edit ? 
              (<Button colorScheme='blue' mt={4} onClick={handleSubmit}>Cập nhập</Button>) : 
              (<Button colorScheme='blue' mt={4} onClick={handleSubmit} >Thêm</Button>)}
            </HStack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RoomList;
