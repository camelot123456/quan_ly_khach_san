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
} from "@chakra-ui/react";

import { doShowRoomtypeList, doCreateRoomtype, doDeleteRoomtypeById, doFindRoomtypeById } from "../../../../redux/actions/roomtype-action";
import ModalScrollCustom from "../../fragments/ModalScrollCustom"
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup'
import FormField from "../../fragments/FormField";
import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import { ACCESS_TOKEN, URL_BASE } from "../../../../constants";

function RoomtypeList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes);
  const roomtypeResponse = useSelector((state) => state.roomtypeReducer.apiResponse);

  useEffect(() => {
    dispatch(doShowRoomtypeList());
  }, []);

  const handleDeleteRoomtypeById = async (idRoomtype) => {
    await dispatch(doDeleteRoomtypeById(idRoomtype));
    await dispatch(doShowRoomtypeList())
    toast({
      title: 'Xóa loại phòng',
      description: roomtypeResponse.message,
      status: roomtypeResponse.success ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
    })
    
  }

  return (
    <>
      <ModalScrollCustom 
          icon={<i className="fa fa-plus" aria-hidden="true"></i>}
          title="Loại phòng"
          className="btn-add-roomtype"
          content={<ContentFormRoomtype edit={false} />}
          closeOnOverlayClick={false}
      />
      {roomtypes ? (
        <Table variant="striped" colorScheme="blue">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Stt</Th>
            <Th>Id</Th>
            <Th>Ảnh chính</Th>
            <Th>Tên phòng</Th>
            <Th>Giá (VND)</Th>
            <Th>Công cụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {roomtypes.map((roomtype, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{roomtype.id}</Td>
              <Td>
                { roomtype.avatarUrl.startsWith("https://") || roomtype.avatarUrl.startsWith("http://") ? (
                  <Image w={130} src={roomtype.avatarUrl} alt={roomtype.name} />
                  ) : (
                  <Image w={130} src={`${URL_BASE}/img/roomtype/${roomtype.avatarUrl}`} alt={roomtype.name} />
                )}
              </Td>
              <Td>{roomtype.name}</Td>
              <Td>{roomtype.price}</Td>
              <Td>
                <HStack>
                  <ModalScrollCustom 
                    icon={<i className="fa fa-pencil" aria-hidden="true"></i>}
                    title="Loại phòng"
                    className="btn-detail-roomtype-list"
                    content={<ContentFormRoomtype edit={true} idRoomtype={roomtype.id} roomtype={roomtype}/>}
                    closeOnOverlayClick={false}
                  />
                  <AlertDialogCustom 
                    nameBtnCall={<i className="fa fa-trash-o" aria-hidden="true"></i>}
                    className="btn-delete-roomtype-list"
                    title="Xóa loại phòng"
                    content="Bạn có muốn xóa loại phòng này không ?"
                    nameBtnNegative="Xóa"
                    nameBtnPositive="Hủy"
                    onBtnNegative={() => handleDeleteRoomtypeById(roomtype.id)}
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

function ContentFormRoomtype ({edit, idRoomtype, roomtype}) {

  console.log({edit, idRoomtype, roomtype})

  const dispatch = useDispatch();
  const roomtypeResponse = useSelector((state) => state.roomtypeReducer.apiResponse);
  const toast = useToast()
  const [avatar1, setAvatar1] = useState()
  const [avatar2, setAvatar2] = useState()
  const [tab, setTab] = useState(1)

  const initialValues = {
    name: "",
    price: "",
    description: "",
    avatarUrl: "",
    avatarFile: ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này không được để trống."),
    price: Yup.number("Chỉ được nhập số").min(0).required("Trường này không được để trống."),
    description: Yup.string().max(500),
    avatarUrl: Yup.string(),
    avatarFile: Yup.string()
  })

  const handleRenderImageFile = (e) => {
    var file = e.target.files[0]
    setAvatar1(window.URL.createObjectURL(new Blob([file], {type: 'application/zip'})))
  }

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}
      onSubmit={async (values) => {

        if (edit) {
          console.log("edited")
        }
        else {
          var formData = new FormData(document.getElementById('form-roomtype'))
          var data = {
            name: values.name,
            price: values.price,
            description: values.description,
            typeImage: tab,
            avatarUrl: formData.get('avatarUrl')
          }
          console.log(data)
          formData.append("roomtype", new Blob([JSON.stringify(data)], {type: 'application/json'}))
          formData.append("avatar-file", document.forms['form-roomtype'].avatarFile.files[0])
          await dispatch(doCreateRoomtype(formData));
          await dispatch(doShowRoomtypeList())
          console.log(roomtypeResponse)
          toast({
            title: 'Thêm mới loại phòng.',
            description: roomtypeResponse.message,
            status: roomtypeResponse.sussess ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }}
    >
      {(formikProps) => {
        const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;

        return ( 
          <Form id="form-roomtype" name="form-roomtype" encType="multipart/form-data">

            {edit && (
              <>
                <HStack justify="center">
                  <Image borderRadius={6} mt={4} src={roomtype.avatarUrl} alt={roomtype.name}/>
                </HStack>
                <Text fontWeight="medium">Id: {roomtype.id}</Text>
                <Text fontWeight="medium">Tạo lúc: {roomtype.createdAt}</Text>
                <Text fontWeight="medium">Cập nhập lúc: {roomtype.modìiedAt}</Text>
              </>
            )}

            <FormControl mt={2} isInvalid={errors.name && touched.name}>
              <FormLabel htmlFor="name">Tên loại phòng</FormLabel>
              {edit ? (
                <Input size="sm" bg="white" id="name" onChange={handleChange} value={roomtype.name}/>
              ) : (
                <Input size="sm" bg="white" id="name" onChange={handleChange} value={values.name}/>
              )}
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl mt={2} isInvalid={errors.price && touched.price}>
              <FormLabel htmlFor="price">Giá</FormLabel>
              {edit ? (
                <Input size="sm" bg="white" id="price" type="number" onChange={handleChange} value={roomtype.price}/>
              ) : (
                <Input size="sm" bg="white" id="price" type="number" onChange={handleChange} value={values.price}/>
              )}
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl mt={2} isInvalid={errors.description && touched.description}>
              <FormLabel htmlFor="price">Mô tả</FormLabel>
              {edit ? (
                <Textarea size="sm" bg="white" id="description" onChange={handleChange} value={roomtype.description}/>
              ) : (
                <Textarea size="sm" bg="white" id="description" onChange={handleChange} value={values.description}/>
              )}
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

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
            <HStack justify="right">
              {edit ? 
              (<Button colorScheme='blue' mt={4} onClick={handleSubmit}>Cập nhập</Button>) 
              : (<Button colorScheme='blue' mt={4} onClick={handleSubmit} >Thêm</Button>)}
            </HStack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RoomtypeList;
