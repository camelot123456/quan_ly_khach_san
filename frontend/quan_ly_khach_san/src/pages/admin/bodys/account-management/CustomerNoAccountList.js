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
} from "@chakra-ui/react";

import ModalScrollCustom from "../../fragments/ModalScrollCustom"
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import { PATH_IMG_ACCOUNT, URL_BASE } from "../../../../constants";
import {formatDate} from '../../../../commons/dateformat-common'
import { showPagedByType } from "../../../../redux/actions/account-action";

function CustomerNoAccountList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accountReducer.accounts);

  // console.log(accounstFirst)
  console.log(accounts)

  useEffect(() => {
    dispatch(showPagedByType({
      type: 'customer_no_account',
      currentPage: 0,
      sizePage: 20,
      sortField: "id",
      sortDir: "asc",
      keyword: "",
    }))
  }, []);

  const handleDeleteAccountById = (idAccount) => {
    // dispatch(doDeleteAccountById(idAccount))
    // .then((res) => {
    //   toast({
    //     title: 'Thông báo',
    //     description: "Xóa khách hàng thành công",
    //     status: 'success',
    //     duration: 9000,
    //     isClosable: true,
    //   })
    // })
    // .catch((err) => {
    //   toast({
    //     title: 'Thông báo',
    //     description: "Xóa khách hàng thất bại",
    //     status: 'error',
    //     duration: 9000,
    //     isClosable: true,
    //   })
    // })
    // .finally(() => {
    //   dispatch(showPagedByType({
    //     type: 'customer_no_account',
    //     currentPage: 0,
    //     sizePage: 20,
    //     sortField: "id",
    //     sortDir: "asc",
    //     keyword: "",
    //   }));
    // })
  }

  return (
    <>
      <ModalScrollCustom 
          icon={<i className="fa fa-plus" aria-hidden="true"></i>}
          title="Khách hàng không tài khoản"
          className="btn-add"
          content={<ContentFormAccount edit={false} />}
          closeOnOverlayClick={false}
          />
      {accounts ? (
        <Table variant="striped" colorScheme="blue">
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
                    content={<ContentFormAccount edit={true} idAccount={account.id} account={account}/>}
                    closeOnOverlayClick={false}
                  />
                  <AlertDialogCustom 
                    nameBtnCall={<i className="fa fa-trash-o" aria-hidden="true"></i>}
                    className="btn-delete-list"
                    title="Xóa khách hàng không tài khoản"
                    content="Bạn có muốn xóa khách hàng này không ?"
                    nameBtnNegative="Xóa"
                    nameBtnPositive="Hủy"
                    onBtnNegative={() => handleDeleteAccountById(account.id)}
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

  console.log(account);

  const dispatch = useDispatch();
  const toast = useToast()
  const [avatar1, setAvatar1] = useState()
  const [avatar2, setAvatar2] = useState()
  const [tab, setTab] = useState(1)
  const roles = useSelector((state) => state.roleReducer.roles)

  if (account===undefined) {
    account = {
      name: '',
      address: '',
      email: '',
      avatar: '',
      phoneNum: '',

    }
  }

  const initialValues = {
    name: account.name || '',
    address: account.address || '',
    email: account.email || '',
    avatar: account.avatar || '',
    phoneNum: account.phoneNum || '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này không được để trống."),
    address: Yup.string().required("Trường này không được để trống."),
    email: Yup.string().required("Trường này không được để trống."),
    avatar: Yup.string(),
    phoneNum: Yup.string().required("Trường này không được để trống."),
  })

  const handleRenderImageFile = (e) => {
    var file = e.target.files[0]
    setAvatar1(window.URL.createObjectURL(new Blob([file], {type: 'application/zip'})))
  }

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}
      onSubmit={(values) => {

        if (edit) {
          var formData = new FormData(document.getElementById('form-role'))
          // var data = {
          //   id: roomtype.id,
          //   name: values.name,
          //   price: values.price,
          //   description: values.description,
          //   idRoomtypePhoto: roomtypePhotoActive.id
          // }
          // console.log(data)
          // formData.append("roomtype", new Blob([JSON.stringify(data)], {type: 'application/json'}))
          // dispatch(doUpdateRoomtype(formData))
          // .then(response => {
          //   toast({
          //     title: 'Thông báo',
          //     description: "Cập nhập loại phòng thành công",
          //     status: 'success',
          //     duration: 9000,
          //     isClosable: true,
          //   })
          // })
          // .catch((err) => {
          //   toast({
          //     title: 'Thông báo',
          //     description: "Cập nhập loại phòng thất bại",
          //     status: 'error',
          //     duration: 9000,
          //     isClosable: true,
          //   })
          // })
          // .finally(() => {
          //   dispatch(doShowRoomtypeList())
          // })
        }
        else {
          var formData = new FormData(document.getElementById('form-roomtype'))
          // var data = {
          //   name: values.name,
          //   price: values.price,
          //   description: values.description,
          //   isImgFile: tab == 1 ? true : false,
          //   avatarUrl: formData.get('avatarUrl')
          // }
          // console.log(data)
          // formData.append("roomtype", new Blob([JSON.stringify(data)], {type: 'application/json'}))
          // formData.append("avatar-file", document.forms['form-roomtype'].avatarFile.files[0])
          // dispatch(doCreateRoomtype(formData))
          // .then(response => {
          //   toast({
          //     title: 'Thông báo',
          //     description: "Thêm mới khách hàng thành công",
          //     status: 'success',
          //     duration: 9000,
          //     isClosable: true,
          //   })
          // })
          // .catch((err) => {
          //   toast({
          //     title: 'Thông báo',
          //     description: "Thêm mới khách hàng thất bại",
          //     status: 'error',
          //     duration: 9000,
          //     isClosable: true,
          //   })
          // })
          // .finally(() => {
          //   dispatch(doShowRoomtypeList())
          // })
        }
      }}
    >
      {(formikProps) => {
        const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;

        return ( 
          <Form id="form-role" name="form-role" encType="multipart/form-data">

            {edit && (
              <>
                <HStack justify="center">
                  {/* <Image borderRadius={6} mt={4} src={!roomtypePhotoActive.imgFile ? roomtypePhotoActive.url : `${URL_BASE}/${PATH_IMG_ACCOUNT}/${roomtypePhotoActive.url}`} alt={roomtypePhotoActive.id}/> */}
                </HStack>
                
                <Text fontWeight="medium">Id: {account.id || ''}</Text>
                <Text fontWeight="medium">Tạo lúc: {formatDate(account.createdAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
                <Text fontWeight="medium">Cập nhập lúc: {formatDate(account.modifiedAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
              </>
            )}

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
              <Textarea size="sm" bg="white" id="email" type="email" onChange={handleChange} value={values.email}/>
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phoneNum && touched.phoneNum}>
              <FormLabel htmlFor="phoneNum">Số điện thoại</FormLabel>
              <Textarea size="sm" bg="white" id="phoneNum" onChange={handleChange} value={values.phoneNum}/>
              <FormErrorMessage>{errors.phoneNum}</FormErrorMessage>
            </FormControl>

            {!edit && (
              <>
                <Text fontWeight="medium" mt={4}>Ảnh đại diện</Text>
                <Tabs>
                  <TabList>
                    <Tab onClick={() => setTab(1)}>File</Tab>
                    <Tab onClick={() => setTab(2)}>URL</Tab>
                  </TabList>
    
                  <TabPanels bg="#EDFDFD" borderRadius={8}>
                    <TabPanel>
                      <input label="Ảnh đại diện" name="avatarFile" type="file" 
                        accept="image/png, image/jpeg, image/gif, image/ico, image/jpg" 
                        onChange={(e) => handleRenderImageFile(e)}/>
                      {avatar1 && <Image mt={4} src={avatar1} />}
                    </TabPanel>
                    <TabPanel>
                      <Input label="Ảnh đại diện" name="avatarUrl" type="text" 
                        onChange={(e) => setAvatar2(e.target.value)}/>
                      {avatar2 && <Image mt={4} src={avatar2} />}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </>
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

export default CustomerNoAccountList;
