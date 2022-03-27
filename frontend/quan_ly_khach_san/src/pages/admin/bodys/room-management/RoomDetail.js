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
        idReservation: searchParams.get("idReservation"),
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
                  <table>
                    <tr>
                      <th>ID:</th>
                      <td>{room.idAccount}</td>
                    </tr>
                    <tr>
                      <th>Họ & tên:</th>
                      <td>{room.nameAccount}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{room.email}</td>
                    </tr>
                    <tr>
                      <th>Số điện thoại:</th>
                      <td>{room.phoneNum}</td>
                    </tr>
                    <tr>
                      <th>Địa chỉ:</th>
                      <td>{room.address}</td>
                    </tr>
                  </table>
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

          <table>
            <tr>
              <th style={{minWidth: '160px'}}>Mã phiếu thuê:</th>
              <td>{room.idReservation}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Mã phòng:</th>
              <td>{room.idRoom}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Thời gian tạo:</th>
              <td>{room.createAtRoom}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Thời gian cập nhập:</th>
              <td>{room.modifiedAtRoom}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Số phòng:</th>
              <td>{room.roomNum}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Tầng:</th>
              <td>{room.floor}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Khách tối đa:</th>
              <td>{room.customerNumRoom}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Giá phát sinh:</th>
              <td>{room.incurredPrice}</td>
            </tr>
            <tr>
              <th style={{minWidth: '160px'}}>Mô tả:</th>
              <td>{room.descriptionRoom}</td>
            </tr>
          </table>

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
