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
} from "@chakra-ui/react";

import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import ModalServiceCustom from "../../fragments/ModalServiceCustom";

import { doShowRoomDetailAdmin } from "../../../../redux/actions/room-action";
import FormField from "../../fragments/FormField";

function RoomDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { idRoom } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const room = useSelector((state) => state.roomReducer.room);
  const servicesInvoice = useSelector(
    (state) => state.roomReducer.servicesInvoice
  );
  const initialValues = {
    createAtRoom: "",
    modifiedAtRoom: "",
    roomNum: "",
    floor: "",
    customerNumRoom: "",
    incurredPrice: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    roomNum: Yup.string().required("Trường này không được để trống."),
    floor: Yup.number("Chỉ được nhập số").required(
      "Trường này không được để trống."
    ),
    customerNumRoom: Yup.number("Chỉ được nhập số").required(
      "Trường này không được để trống."
    ),
    incurredPrice: Yup.number("Chỉ được nhập số").required(
      "Trường này không được để trống."
    ),
  });

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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(formikProps) => {
        // do something here ................
        const { values, errors, touched } = formikProps;
        return (
          <Form>
            <Heading py={4}>Chi tiết phòng</Heading>
            <Divider />
            <Grid
              templateRows="repeat(4, 1fr)"
              templateColumns="repeat(2, 1fr)"
              gap={4}
              mt={4}
            >
              <GridItem bg="#EDF2F7" borderRadius={8} p={4} rowSpan={1} boxShadow='lg'>
                <Heading size="lg">Loại phòng</Heading>
                <Flex justifyContent="flex-start" my={3}>
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

              <GridItem bg="#EDF2F7" borderRadius={8} p={4} rowSpan={1} boxShadow='lg'>
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
                    <Stack
                      spacing={4}
                      direction="row"
                      align="center"
                      justify="end"
                    >
                      <AlertDialogCustom
                        nameBtnCall="Trả phòng"
                        colorBtnCall="red"
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

              <GridItem bg="#EDF2F7" borderRadius={8} rowSpan={2} boxShadow='lg'>
                <Heading p={4} size="lg">
                  Thông tin phòng
                </Heading>
                <Grid
                  templateRows="repeat(3, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                  gap={2}
                  px={4}
                >
                  <GridItem>
                    <FastField
                      name="createAtRoom"
                      component={FormField.InputField}
                      label="Thời gian tạo"
                      value={room.createAtRoom}
                      disabled
                    />
                  </GridItem>
                  <GridItem>
                    <FastField
                      name="modifiedAtRoom"
                      component={FormField.InputField}
                      label="Thời gian cập nhập"
                      value={room.modifiedAtRoom}
                      disabled
                    />
                  </GridItem>
                  <GridItem>
                    <FastField
                      name="roomNum"
                      component={FormField.InputField}
                      label="Số phòng"
                      placeholder="Số phòng ..."
                      value="asd"
                    />
                  </GridItem>
                  <GridItem>
                    <FastField
                      name="floor"
                      component={FormField.InputField}
                      label="Tầng"
                      placeholder="Tầng ..."
                      type="number"
                      value={room.floor}
                    />
                  </GridItem>
                  <GridItem>
                    <FastField
                      name="customerNumRoom"
                      component={FormField.InputField}
                      label="Khách tối đa"
                      placeholder="Khách tối đa ..."
                      type="number"
                    />
                  </GridItem>
                  <GridItem>
                    <FastField
                      name="incurredPrice"
                      component={FormField.InputField}
                      label="Giá phát sinh (VND)"
                      placeholder="Giá phát sinh (VND) ..."
                      type="number"
                    />
                  </GridItem>
                </Grid>
                <Box px={4}>
                  <FastField
                    name="descriptionRoom"
                    component={FormField.TextareaField}
                    label="Mô tả"
                    placeholder="Mô tả ..."
                  />
                </Box>
                <Stack spacing={4} direction="row" align="center" p={4}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    type="submit"
                    onClick={() =>
                      toast({
                        title: "Account created.",
                        description: "We've created your account for you.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      })
                    }
                  >
                    Cập nhập
                  </Button>
                </Stack>
              </GridItem>

              <GridItem bg="#EDF2F7" borderRadius={8} rowSpan={2} boxShadow='lg'>
                <Heading p={4} size="lg">
                  Dach sách dịch vụ phòng
                </Heading>
                <Box px={3}>
                  {servicesInvoice == null ? (
                    <Alert status="warning" mt={4}>
                      <AlertIcon />
                      Hiện tại phòng này chưa có dịch vụ!
                    </Alert>
                  ) : (
                    <>
                      <Stack spacing={4} direction="row" align="center">
                        <ModalServiceCustom />
                      </Stack>
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
                          {servicesInvoice.map((service) => (
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
          </Form>
        );
      }}
    </Formik>
  );
}

export default RoomDetail;
