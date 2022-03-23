import React from 'react'
import {Button, Divider, Flex, Heading, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, useToast} from '@chakra-ui/react'
import formatDate from '../../../commons/dateformat-common'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doCreateTransactionPaymnet } from '../../../redux/actions/transaction-action';
import ModalScrollCustom from '../../admin/fragments/ModalScrollCustom';
import { doFindForTransaction } from '../../../redux/actions/reservation-action';

function OrderAndHistory () {

    const dispatch = useDispatch();

    const reservationTransaction = useSelector((state) => state.reservationReducer.reservationTransaction);
    const rooms = useSelector((state) => state.roomReducer.roomsState);

    const handleFindReservationForTransaction = (idReservation) => {
        dispatch(doFindForTransaction(idReservation))
    }

    return (
        <>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Thời gian tạo</Th>
                        <Th>Ngày đặt</Th>
                        <Th>Ngày trả</Th>
                        <Th isNumeric>Giá tiền</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>
                            <ModalScrollCustom
                                icon={<i className="fa fa-credit-card" aria-hidden="true"></i>}
                                className='btn-reservation-deposit'
                                onBtnClick={handleFindReservationForTransaction}
                                data={room.idReservation}
                                title="Payment"
                                content={<ContentPayment reservationTransaction={reservationTransaction}/>}
                            />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    )
}

function ContentPayment(props) {
  
    const {reservationTransaction} = props
    console.log(reservationTransaction)
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()
  
    const handlePayment = (idReservation) => {
      dispatch(doCreateTransactionPaymnet(idReservation))
      .then((res) => {
        toast({
          title: 'Thông báo',
          description: "Đã thanh toán thành công",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          title: 'Thông báo',
          description: "Thanh toán thất bại",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
      .finally(() => {
        navigate("/admin/transactions")
      })
    }
  
    return (
      <>
        <Flex direction="column">
          <HStack>
            <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              S2 HOTEL
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
            </Heading>
          </HStack>
          <Divider />
          <Heading align="center" fontSize={32} >Phiếu thanh toán</Heading>
          <Text fontSize={14} align="center">{reservationTransaction.reservation.idReservation || ''}</Text>
          <Text fontSize={14} align="center">{formatDate(reservationTransaction.reservation.createdAt, "hh:MM:ss - dd/mm/yyyy") || ''}</Text>
          <Text fontSize={14}>Mã khách hàng: {reservationTransaction.reservation.idAccount || ''}</Text>
          <Text fontSize={14}>Khách hàng: {reservationTransaction.reservation.nameAccount || ''}</Text>
          <Divider />
          {/* <Heading align="center" fontSize={14}>Loại phòng</Heading> */}
          <Text fontSize={14}>Loại phòng: {reservationTransaction.reservation.nameRoomtype}</Text>
          <Text fontSize={14}>Ngày đặt: {formatDate(reservationTransaction.reservation.startDate, "dd/mm/yyyy") || ''}</Text>
          <Text fontSize={14}>Ngày trả: {formatDate(reservationTransaction.reservation.endDate, "dd/mm/yyyy") || ''}</Text>
          <Text fontSize={14}>Số người: {reservationTransaction.reservation.customerNum || 0}</Text>
          <Divider />
          {/* <Heading align="center" fontSize={14}>Phòng</Heading> */}
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Phòng</Th>
                <Th>Tầng</Th>
                <Th isNumeric>Giá</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservationTransaction.rooms.map((room, index) => (
                <Tr key={index}>
                  <Th>{room.id || ''}</Th>
                  <Th>{room.roomNum || ''}</Th>
                  <Th>{room.floor || 0}</Th>
                  <Th isNumeric>{room.incurredPrice || 0}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Divider />
          {/* <Heading align="center" fontSize={14}>Dịch vụ</Heading> */}
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Tên</Th>
                <Th>Số lượng</Th>
                <Th>Giá</Th>
                <Th isNumeric>Thành tiền</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservationTransaction.services && reservationTransaction.services.map((service, index) => (
                <Tr key={index}>
                  <Th>{service.idService || ''}</Th>
                  <Th>{service.name || ''}</Th>
                  <Th>{service.quantity || 0}</Th>
                  <Th>{service.price || 0}</Th>
                  <Th isNumeric>{service.intoPrice || 0}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Divider />
          <Table variant='simple' size='sm'>
            <Tbody>
              <Tr>
                <Th>Tiền phòng:</Th>
                <Th isNumeric>{reservationTransaction.reservation.priceRoomtype || 0}</Th>
              </Tr>
              <Tr>
                <Th>Tổng:</Th>
                <Th isNumeric>{Math.ceil(reservationTransaction.reservation.total) || 0}</Th>
              </Tr>
              <Tr>
                <Th>Thuế dịch vụ (5%):</Th>
                <Th isNumeric>{reservationTransaction.reservation.taxService || 0}</Th>
              </Tr>
              <Tr>
                <Th>Thuế VAT (10%):</Th>
                <Th isNumeric>{reservationTransaction.reservation.taxInvoice || 0}</Th>
              </Tr>
              <Tr>
                <Th color="red">Tổng cộng:</Th>
                <Th color="red" isNumeric>{Math.ceil(reservationTransaction.reservation.grandTotal) || 0}</Th>
              </Tr>
            </Tbody>
          </Table>
          <HStack mt={4} justify="end">
            <Button colorScheme='blue' onClick={() => handlePayment({
              reservation: {
                id: reservationTransaction.reservation.idReservation
              },
              account: {
                id: reservationTransaction.reservation.idAccount
              }
            })}>Thanh toán</Button>
          </HStack>
        </Flex>
      </>
    );
  }

export default OrderAndHistory