import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
  Badge,
} from "@chakra-ui/react";

import ModalScrollCustom from "../../fragments/ModalScrollCustom"
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import { PATH_IMG_ACCOUNT, URL_BASE } from "../../../../constants";
import {formatDate} from '../../../../commons/dateformat-common'
import { doDeleteCustomer, doUpdateCustomer, showPagedByType } from "../../../../redux/actions/account-action";

function CustomerAccountList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accountReducer.accountCustomerAccountArr);

  useEffect(() => {
    dispatch(showPagedByType({
      type: 'customer_account',
      currentPage: 0,
      sizePage: 20,
      sortField: "id",
      sortDir: "asc",
      keyword: "",
    }))
  }, []);

  const handleDeleteCustomer = (idAccount) => {
    dispatch(doDeleteCustomer({id: idAccount}))
    .then((res) => {
      toast({
        title: 'Thông báo',
        description: "Xóa khách hàng thành công",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch((err) => {
      toast({
        title: 'Thông báo',
        description: "Xóa khách hàng thất bại",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    .finally(() => {
      dispatch(showPagedByType({
        type: 'customer_account',
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
      {accounts ? (
        <Table variant="striped" colorScheme="blue" size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Stt</Th>
            <Th>Id</Th>
            <Th>Avatar</Th>
            <Th>Tên</Th>
            <Th>Địa chỉ</Th>
            <Th>Email</Th>
            <Th>Số điện thoại</Th>
            <Th>Công cụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts.map((account, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{account.id}</Td>
              <Td>
                {account.avatar && account.avatar.startsWith("https://") || account.avatar &&  account.avatar.startsWith("http://") ? (
                  <Image maxWidth="100px" maxHeight="60px" borderRadius={6} src={account.avatar} alt={account.name} />
                ) : (
                  <Image maxWidth="100px" maxHeight="60px" borderRadius={6} src={`${URL_BASE}/img/account/${account.avatar}`} alt={account.name} />
                )}
            </Td>
              <Td>{account.name}</Td>
              <Td>{account.address}</Td>
              <Td>{account.email}</Td>
              <Td>{account.phoneNum}</Td>
              <Td>
                <HStack>
                  <ModalScrollCustom 
                    icon={<i className="fa fa-pencil" aria-hidden="true"></i>}
                    title="Khách hàng không tài khoản"
                    className="btn-detail-list"
                    content={<ContentFormAccount idAccount={account.id} account={account}/>}
                    closeOnOverlayClick={false}
                  />
                  <AlertDialogCustom 
                    nameBtnCall={<i className="fa fa-trash-o" aria-hidden="true"></i>}
                    className="btn-delete-list"
                    title="Xóa khách hàng không tài khoản"
                    content="Bạn có muốn xóa khách hàng này không ?"
                    nameBtnNegative="Xóa"
                    nameBtnPositive="Hủy"
                    onBtnNegative={() => handleDeleteCustomer(account.id)}
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

function ContentFormAccount ({account}) {

  const dispatch = useDispatch();
  const toast = useToast()
  const roles = useSelector((state) => state.roleReducer.roles)

  if (account===undefined) {
    account = {
      name: '',
      address: '',
      email: '',
      phoneNum: '',

    }
  }

  const initialValues = {
    name: account.name || '',
    address: account.address || '',
    email: account.email || '',
    phoneNum: account.phoneNum || '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này không được để trống."),
    address: Yup.string(),
    email: Yup.string().email(),
    phoneNum: Yup.string().required("Trường này không được để trống."),
  })

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}
      onSubmit={(values) => {

          var data = {
            id: account.id,
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNum: values.phoneNum,
            authProvider: account.authProvider
          }
          console.log(data)
          dispatch(doUpdateCustomer(data))
          .then(response => {
            toast({
              title: 'Thông báo',
              description: "Cập nhập khách hàng thành công",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          })
          .catch((err) => {
            toast({
              title: 'Thông báo',
              description: "Cập nhập loại phòng thất bại",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          })
          .finally(() => {
            dispatch(showPagedByType({
              type: 'customer_account',
              currentPage: 0,
              sizePage: 20,
              sortField: "id",
              sortDir: "asc",
              keyword: "",
            }))
          })
      }}
    >
      {(formikProps) => {
        const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;

        return ( 
          <Form>
            <>
              <HStack justify="center">
                {account.avatar && account.avatar.startsWith("https://") || account.avatar &&  account.avatar.startsWith("http://") ? (
                  <Image borderRadius={6} mt={4} src={account.avatar} alt={account.name} />
                ) : (
                  <Image borderRadius={6} mt={4} src={`${URL_BASE}/${PATH_IMG_ACCOUNT}/${account.avatar}`} alt={account.name} />
                )}
              </HStack>
              
              <Badge colorScheme='green'>{account.authProvider || ''}</Badge>
              <Text fontWeight="medium">Id: {account.id || ''}</Text>
              <Text fontWeight="medium">Tạo lúc: {formatDate(account.createdAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
              <Text fontWeight="medium">Cập nhập lúc: {formatDate(account.modifiedAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
            </>

            <FormControl isInvalid={errors.name && touched.name}>
              <FormLabel htmlFor="name">Tên khách hàng</FormLabel>
              <Input size="sm" bg="white" id="name" onChange={handleChange} value={values.name}/>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.address && touched.address}>
              <FormLabel htmlFor="address">Địa chỉ</FormLabel>
              <Input size="sm" bg="white" id="address" onChange={handleChange} value={values.address}/>
              <FormErrorMessage>{errors.address}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email && touched.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input size="sm" bg="white" id="email" type="email" onChange={handleChange} value={values.email}/>
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phoneNum && touched.phoneNum}>
              <FormLabel htmlFor="phoneNum">Số điện thoại</FormLabel>
              <Input size="sm" bg="white" id="phoneNum" onChange={handleChange} value={values.phoneNum}/>
              <FormErrorMessage>{errors.phoneNum}</FormErrorMessage>
            </FormControl>

            <HStack justify="right">
              <Button colorScheme='blue' mt={4} onClick={handleSubmit}>Cập nhập</Button>
            </HStack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CustomerAccountList;
