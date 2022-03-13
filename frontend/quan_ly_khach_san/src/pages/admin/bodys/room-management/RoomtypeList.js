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

import { doShowRoomtypeList, doCreateRoomtype, doDeleteRoomtypeById, doUpdateRoomtype } from "../../../../redux/actions/roomtype-action";
import ModalScrollCustom from "../../fragments/ModalScrollCustom"
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import AlertDialogCustom from "../../fragments/AlertDialogCustom";
import { PATH_IMG_ROOMTYPE, URL_BASE } from "../../../../constants";
import {formatDate} from '../../../../commons/dateformat-common'
import {setRoomtypePhotoActive, showRoomtypePhotoByIdRoomtype} from '../../../../redux/actions/roomtypePhoto-action'

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
                  <Image maxWidth="100px" maxHeight="60px" borderRadius={6} src={roomtype.avatarUrl} alt={roomtype.name} />
                  ) : (
                  <Image maxWidth="100px" maxHeight="60px" borderRadius={6} src={`${URL_BASE}/img/roomtype/${roomtype.avatarUrl}`} alt={roomtype.name} />
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

  const dispatch = useDispatch();
  const toast = useToast()
  const [avatar1, setAvatar1] = useState()
  const [avatar2, setAvatar2] = useState()
  const [tab, setTab] = useState(1)
  const roomtypeResponse = useSelector((state) => state.roomtypeReducer.apiResponse);
  const roomtypePhotos = useSelector((state) => state.roomtypePhotoReducer.roomtypePhotos)
  const roomtypePhotoActive = useSelector((state) => state.roomtypePhotoReducer.roomtypePhotoActive)


  useEffect(async () => {
    await dispatch(showRoomtypePhotoByIdRoomtype(idRoomtype))
    dispatch(setRoomtypePhotoActive(roomtype.id, roomtype.avatarUrl, roomtype.isImgFile))
  }, [])

  if (roomtype===undefined) {
    roomtype = {
      name: '',
      price: 0,
      description: '',
      avatarUrl: ''
    }
  }

  const initialValues = {
    name: roomtype.name,
    price: roomtype.price,
    description: roomtype.description,
    avatarUrl: roomtype.avatarUrl,
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

  const handleSetRoomtypePhotoActive = async (idImage, urlImage, imgFile) => {
    dispatch(setRoomtypePhotoActive(idImage, urlImage, imgFile))
  }

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}
      onSubmit={async (values) => {

        if (edit) {
          var formData = new FormData(document.getElementById('form-roomtype'))
          var data = {
            id: roomtype.id,
            name: values.name,
            price: values.price,
            description: values.description,
            idRoomtypePhoto: roomtypePhotoActive.id
          }
          console.log(data)
          formData.append("roomtype", new Blob([JSON.stringify(data)], {type: 'application/json'}))
          await dispatch(doUpdateRoomtype(formData));
          await dispatch(doShowRoomtypeList())
          toast({
            title: 'Cập nhập loại phòng.',
            description: roomtypeResponse.message,
            status: roomtypeResponse.sussess ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
          })
          
        }
        else {
          var formData = new FormData(document.getElementById('form-roomtype'))
          var data = {
            name: values.name,
            price: values.price,
            description: values.description,
            isImgFile: tab == 1 ? true : false,
            avatarUrl: formData.get('avatarUrl')
          }
          console.log(data)
          formData.append("roomtype", new Blob([JSON.stringify(data)], {type: 'application/json'}))
          formData.append("avatar-file", document.forms['form-roomtype'].avatarFile.files[0])
          await dispatch(doCreateRoomtype(formData));
          await dispatch(doShowRoomtypeList())
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
                  <Image borderRadius={6} mt={4} src={!roomtypePhotoActive.imgFile ? roomtypePhotoActive.url : `${URL_BASE}/${PATH_IMG_ROOMTYPE}/${roomtypePhotoActive.url}`} alt={roomtypePhotoActive.id}/>
                </HStack>
                <Wrap>
                  {roomtypePhotos && (
                    roomtypePhotos.map((rtp, index) => (
                      <WrapItem key={index}>
                        <Center w='70px' h='50px'>
                            <Image src={!rtp.isImgFile ? rtp.url : `${URL_BASE}/${PATH_IMG_ROOMTYPE}/${rtp.url}`} alt={rtp.id} 
                              className={roomtypePhotoActive.id === rtp.id ? 'image-roomtypephoto-list active' : 'image-roomtypephoto-list'} 
                              onClick={() => handleSetRoomtypePhotoActive(rtp.id, rtp.url, rtp.isImgFile)}/>
                        </Center>
                      </WrapItem>
                    ))
                  )}
                </Wrap>
                <Text fontWeight="medium">Id: {roomtype.id || ''}</Text>
                <Text fontWeight="medium">Tạo lúc: {formatDate(roomtype.createdAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
                <Text fontWeight="medium">Cập nhập lúc: {formatDate(roomtype.modifiedAt, 'hh:MM:ss - dd/mm/yyyy') || ''}</Text>
              </>
            )}

            <FormControl isInvalid={errors.name && touched.name}>
              <FormLabel htmlFor="name">Tên loại phòng</FormLabel>
              <Input size="sm" bg="white" id="name" onChange={handleChange} value={values.name}/>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.price && touched.price}>
              <FormLabel htmlFor="price">Giá</FormLabel>
              <Input size="sm" bg="white" id="price" type="number" onChange={handleChange} value={values.price}/>
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.description && touched.description}>
              <FormLabel htmlFor="price">Mô tả</FormLabel>
              <Textarea size="sm" bg="white" id="description" onChange={handleChange} value={values.description}/>
              <FormErrorMessage>{errors.description}</FormErrorMessage>
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

export default RoomtypeList;
