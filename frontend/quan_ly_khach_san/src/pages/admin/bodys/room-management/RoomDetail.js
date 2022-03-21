import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Divider,
  Image,
  Text,
  Flex,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useToast,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import ModalServiceCustom from "../../fragments/ModalServiceCustom";

import { doShowRoomDetailAdmin } from "../../../../redux/actions/room-action";

function RoomDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { idRoom } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const room = useSelector((state) => state.roomReducer.room);
  const services = useSelector(
    (state) => state.roomReducer.services
  );

  useEffect(() => {
    dispatch(
      doShowRoomDetailAdmin({
        idRoom,
        idTransaction: searchParams.get("idTransaction"),
      })
    );
  }, []);

  const onBtnNegative = (idAccount) => {
    console.log(idAccount);
  };

  return (
    <>
      <Heading py={4}>Chi tiết phòng</Heading>
      <Divider />
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        mt={4}
      >
        <GridItem
          bg="#EDF2F7"
          borderRadius={8}
          p={4}
          rowSpan={1}
          boxShadow="lg"
        >
          <Heading size="lg">Loại phòng</Heading>
          <Flex justifyContent="flex-start"  my={3}>
            <Image
              src={room.avatarRoomtype}
              alt={room.nameRoomtype}
              borderRadius="8px"
              boxSize="200px"
              me={3}
            />
            <Box>
              <Heading size="xm">{room.nameRoomtype}</Heading>
              <Text>Mã loại phòng: {room.idRoomtype}</Text>
              <Text>Mô tả:</Text>
              <Text>{room.descriptionRoomtype}</Text>
            </Box>
          </Flex>
        </GridItem>

        <GridItem
          bg="#EDF2F7"
          borderRadius={8}
          p={4}
          rowSpan={1}
          boxShadow="lg"
        >
          <Heading size="lg">Thông tin khách hàng</Heading>
          {room.idAccount ? (
            <>
              <Flex justifyContent="flex-start" my={3}>
                <Image
                  src={room.avatar}
                  alt={room.nameAccount}
                  borderRadius="8px"
                  boxSize="200px"
                  me={3}
                />
                <Box>
                  <Text>ID: {room.idAccount}</Text>
                  <Text>Họ & tên: {room.nameAccount}</Text>
                  <Text>Email: {room.email}</Text>
                  <Text>Số điện thoại: {room.phoneNum}</Text>
                  <Text>Địa chỉ: {room.address}</Text>
                </Box>
              </Flex>
              <Stack spacing={4} direction="row" align="center" justify="end">
                <AlertDialogCustom
                  nameBtnCall="Trả phòng"
                  className="btn-detail-checkout"
                  title="Trả phòng"
                  content="Bạn có chắc chắn khách hàng muốn trả phòng ?"
                  nameBtnNegative="Đồng ý"
                  nameBtnPositive="Hủy"
                  onBtnNegative={() => onBtnNegative(room.idRoom)}
                />
              </Stack>
            </>
          ) : (
            <Alert status="warning" mt={4}>
              <AlertIcon />
              Hiện tại phòng này chưa có khách!
            </Alert>
          )}
        </GridItem>

        <GridItem bg="#EDF2F7" borderRadius={8} rowSpan={2} boxShadow="lg">
          <Heading p={4} size="lg">
            Thông tin phòng
          </Heading>
          {console.log(room)}
            
          <UnorderedList ps={4}>
            <ListItem>Mã dịch vụ: {room.idTransaction}</ListItem>
            <ListItem>Mã phiếu thuê: {room.idReservation}</ListItem>
            <ListItem>Mã phòng: {room.idRoom}</ListItem>
            <ListItem>Thời gian tạo: {room.createAtRoom}</ListItem>
            <ListItem>Thời gian cập nhập: {room.modifiedAtRoom}</ListItem>
            <ListItem>Số phòng: {room.roomNum}</ListItem>
            <ListItem>Tầng: {room.floor}</ListItem>
            <ListItem>Khách tối đa: {room.customerNumRoom}</ListItem>
            <ListItem>Giá phát sinh: {room.incurredPrice}</ListItem>
            <ListItem>Mô tả: {room.descriptionRoom}</ListItem>
          </UnorderedList>

        </GridItem>

        <GridItem bg="#EDF2F7" borderRadius={8} rowSpan={2} boxShadow="lg">
          <Heading p={4} size="lg">
            Dach sách dịch vụ phòng
          </Heading>
          <Box px={3}>
            <Stack spacing={4} direction="row" align="center">
              <ModalServiceCustom />
            </Stack>
            {services == null ? (
              <Alert status="warning" mt={4}>
                <AlertIcon />
                Hiện tại phòng này chưa có dịch vụ!
              </Alert>
            ) : (
              <>
                <Table size="sm" mt={3} bg="white">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Tên dịch vụ</Th>
                      <Th>Số lượng</Th>
                      <Th>Giá</Th>
                      <Th isNumeric>Thành tiền</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {services.map((service) => (
                      <Tr key={service.idReservationService}>
                        <Td>{service.idReservationService}</Td>
                        <Td>{service.name}</Td>
                        <Td>{service.quantity}</Td>
                        <Td>{service.price}</Td>
                        <Td isNumeric>
                          {Math.round(service.intoPrice * 100) / 100}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  {/* <Tfoot>
                          <Tr>
                            <Th>Tổng</Th>
                            <Th></Th>
                            <Th>{servicesInvoice.reduce((prev, curr) => prev.quantity + curr.quantity)}</Th>
                            <Th>{servicesInvoice.reduce((prev, curr) => prev.price + curr.price)}</Th>
                            <Th isNumeric>{servicesInvoice.reduce((prev, curr) => prev.intoPrice + curr.intoPrice)}</Th>
                          </Tr>
                        </Tfoot> */}
                </Table>
              </>
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default RoomDetail;
