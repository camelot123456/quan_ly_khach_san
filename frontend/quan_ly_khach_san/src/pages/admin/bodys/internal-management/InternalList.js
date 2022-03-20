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
  Heading,
  Divider,
  Switch,
  Badge
} from "@chakra-ui/react";

import ModalScrollCustom from "../../fragments/ModalScrollCustom"
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import { PATH_IMG_ACCOUNT, URL_BASE } from "../../../../constants";
import {formatDate} from '../../../../commons/dateformat-common'
import { doCreateAccountInternal, doDeleteCustomer, doUpdateCustomer, showPagedByType } from "../../../../redux/actions/account-action";
import {showRoleByIdAccount, showRoles} from '../../../../redux/actions/role-action'

function InternalList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accountReducer.accountInternalArr);

  useEffect(() => {
    dispatch(showPagedByType({
      type: 'internal_account',
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
        type: 'internal_account',
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
          title="Thành viên nội bộ"
          className="btn-add"
          content={<ContentFormAccount edit={false} />}
          closeOnOverlayClick={false}
          />
      {accounts ? (
        <Table variant="striped" colorScheme="blue" size='sm' mt={4}>
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
                    title="Nhân viên"
                    className="btn-detail-list"
                    content={<ContentFormAccount edit={true} idAccount={account.id} account={account}/>}
                    closeOnOverlayClick={false}
                  />
                  <AlertDialogCustom 
                    nameBtnCall={<i className="fa fa-trash-o" aria-hidden="true"></i>}
                    className="btn-delete-list"
                    title="Xóa nhân viên"
                    content="Bạn có muốn xóa nhân viên này không ?"
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

function ContentFormAccount ({edit, idAccount, account}) {

  const dispatch = useDispatch();
  const toast = useToast()
  const [avatar1, setAvatar1] = useState()
  const [avatar2, setAvatar2] = useState()
  const [tab, setTab] = useState(1)
  const [checkboxIdRole, setCheckboxIdRole] = useState([])
  const roles = useSelector((state) => state.roleReducer.roles)

  console.log(edit)

  if (account===undefined) {
    account = {
      name: '',
      address: '',
      email: '',
      avatar: '',
      phoneNum: '',
      password: ''
    }
  }

  const initialValues = {
    name: account.name || '',
    address: account.address || '',
    email: account.email || '',
    avatar: account.avatar || '',
    phoneNum: account.phoneNum || '',
    password: '',
    passwordConfirmation: ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này không được để trống."),
    address: Yup.string().required("Trường này không được để trống."),
    email: Yup.string().required("Trường này không được để trống."),
    avatar: Yup.string(),
    phoneNum: Yup.string().required("Trường này không được để trống."),
    // password: Yup.string().required("Trường này không được để trống."),
    // passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không trùng khớp"),
  })

  const handeChangeCheckbox = (idRole) => {
    setCheckboxIdRole(prev => {
      if (checkboxIdRole.includes(idRole)) {
        return checkboxIdRole.filter(cb => cb !== idRole)
      } else {
        return [...prev, idRole]
      }
    })
  }

  const handleRenderImageFile = (e) => {
    var file = e.target.files[0]
    setAvatar1(window.URL.createObjectURL(new Blob([file], {type: 'application/zip'})))
  }

  useEffect(() => {
    dispatch(showRoles())
    if (edit) {
      account.roles.forEach(role => handeChangeCheckbox(role.id))
    }
  }, [idAccount])

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}
      onSubmit={(values) => {
        
        if (edit) {
          var data = {
            id: account.id,
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNum: values.phoneNum,
            roles: checkboxIdRole,
            authProvider: account.authProvider
          }
          console.log(data)
          dispatch(doUpdateCustomer(data))
          .then(response => {
            toast({
              title: 'Thông báo',
              description: "Cập nhập nhân viên thành công",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          })
          .catch((err) => {
            toast({
              title: 'Thông báo',
              description: "Cập nhập nhân viên thất bại",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          })
          .finally(() => {
            dispatch(showPagedByType({
              type: 'internal_account',
              currentPage: 0,
              sizePage: 20,
              sortField: "id",
              sortDir: "asc",
              keyword: "",
            }))
          })
        } else {
          var data = {
            id: account.id,
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNum: values.phoneNum,
            authProvider: account.authProvider,
            password: values.passwordConfirmation
          }
          console.log(data)
          dispatch(doCreateAccountInternal(data))
          .then(response => {
            toast({
              title: 'Thông báo',
              description: "Thêm nhân viên thành công",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          })
          .catch((err) => {
            toast({
              title: 'Thông báo',
              description: "Thêm nhân viên thất bại",
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          })
          .finally(() => {
            dispatch(showPagedByType({
              type: 'internal_account',
              currentPage: 0,
              sizePage: 20,
              sortField: "id",
              sortDir: "asc",
              keyword: "",
            }))
          })
        }
      }
    }
    >
      {(formikProps) => {
        const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;

        return ( 
          <Form id="form-role" name="form-role" encType="multipart/form-data">

            {edit && (
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
            )}

            <FormControl isInvalid={errors.name && touched.name}>
              <FormLabel htmlFor="name">Tên</FormLabel>
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

            {!edit && 
              <>
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                  <Input size="sm" bg="white" id="password" type="password" onChange={handleChange} value={values.password}/>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={errors.passwordConfirmation && touched.passwordConfirmation}>
                  <FormLabel htmlFor="passwordConfirmation">Nhập lại mật khẩu</FormLabel>
                  <Input size="sm" bg="white" id="passwordConfirmation" type="password" onChange={handleChange} value={values.passwordConfirmation}/>
                  <FormErrorMessage>{errors.passwordConfirmation}</FormErrorMessage>
                </FormControl>
              </>
            }

            {edit && roles && (
              <Table size='sm' mt={4}>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Logo</Th>
                    <Th>Tên</Th>
                    <Th>Mã</Th>
                    <Th isNumeric>Cấp quyền</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {roles.map((role, index) => (
                    <Tr key={index}>
                      <Td>{role.id}</Td>
                      <Td><Image src={role.avatar} borderRadius={4}/></Td>
                      <Td>{role.name}</Td>
                      <Td>{role.code}</Td>
                      <Td isNumeric>
                        {account.roles.some(r => r.id === role.id) ? (
                        <input type="checkbox" id={role.id} onClick={() => handeChangeCheckbox(role.id)} defaultChecked className="checkbox-role-account"/>):(
                        <input onClick={() => handeChangeCheckbox(role.id)} type="checkbox" id={role.id} className="checkbox-role-account"/>)}
                      </Td>
                    </Tr>
                ))}
                </Tbody>
              </Table>
            )}

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

export default InternalList;
