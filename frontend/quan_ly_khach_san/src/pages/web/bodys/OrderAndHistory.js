import React, { useEffect } from 'react'
import {Button, Divider, Flex, Heading, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, useToast, Box, VStack, Center, Image, Grid, GridItem} from '@chakra-ui/react'
import {formatDate} from '../../../commons/dateformat-common'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { doCreateTransactionPaymnet, doFindTransactionById, doSoftDeleteById } from '../../../redux/actions/transaction-action';
import ModalScrollCustom from '../../admin/fragments/ModalScrollCustom';
import { doCancelById, doCheckoutRoomReservation, doFindForTransaction } from '../../../redux/actions/reservation-action';
import { showMyAccountByIdAccount } from '../../../redux/actions/account-action';
import {round} from '../../../commons/round'
import AlertDialogCustom from '../../admin/fragments/AlertDialogCustom';

function OrderAndHistory () {

    const dispatch = useDispatch();
    const {idAccount} = useParams()
    const toast = useToast()

    const myAccountReservation = useSelector((state) => state.accountReducer.myAccountReservation);
    const myAccountTransaction = useSelector((state) => state.accountReducer.myAccountTransaction);
    const myAccount = useSelector((state) => state.accountReducer.myAccount);
    const reservationTransaction = useSelector((state) => state.reservationReducer.reservationTransaction);

    console.log({myAccountTransaction, myAccount, myAccountReservation})

    useEffect(() => {
      dispatch(showMyAccountByIdAccount(idAccount))
    }, [])

    const handleFindReservationForTransaction = (idReservation) => {
        dispatch(doFindForTransaction(idReservation))
    }

    const handleCancelReservationById = (dataRequest) => {
      dispatch(doCheckoutRoomReservation(dataRequest))
      .then((res) => {
        toast({
          description: "Huỷ phiếu đặt phòng thành công",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          description: "Huỷ phiếu đặt phòng thất bại",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
      .finally(() => {
        dispatch(showMyAccountByIdAccount(idAccount));
      })
    }

    
    const handleDeleteTransactionById = (dataRequest) => {
      dispatch(doSoftDeleteById(dataRequest))
      .then((res) => {
        toast({
          description: "Xóa giao dịch thành công",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          description: "Xóa giao dịch thất bại",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
      .finally(() => {
        dispatch(showMyAccountByIdAccount(idAccount));
      })
    }

    return (
        <Box p={4}>
        <Heading py={4}>Thông tin cá nhân</Heading>
        <Divider />
          <HStack align="start" pt={4}>
            <VStack width="70%">
              <Box className="box-container-account-1">
                <Heading pb={4} size="md">Danh sách đặt phòng</Heading>
                <Table size='sm'>
                  <Thead>
                      <Tr>
                          <Th>Id</Th>
                          <Th>Giờ thanh toán</Th>
                          <Th>Ngày đặt</Th>
                          <Th>Ngày trả</Th>
                          <Th>Lượng khách</Th>
                          <Th>Giá tiền</Th>
                          <Th isNumeric>Tool</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {myAccountReservation && (
                        myAccountReservation.map((re, index) => (
                          <Tr key={index}>
                            <Td>{re.id}</Td>
                            <Td>{formatDate(re.createdAt, 'hh:MM - dd/mm/yyyy')}</Td>
                            <Td>{formatDate(re.startDate, 'dd/mm/yyyy')}</Td>
                            <Td>{formatDate(re.endDate, 'dd/mm/yyyy')}</Td>
                            <Td>{re.customerNum}</Td>
                            <Td>{round(re.total)}</Td>
                            <Td>
                                <HStack justify="end">
                                  <AlertDialogCustom 
                                    nameBtnCall={<i className="fa fa-ban" aria-hidden="true"></i>}
                                    className="btn-cancel-deposit"
                                    title="Trả phòng"
                                    content={<p>Bạn có muốn hủy phiếu đặt phòng này không ?</p>}
                                    nameBtnNegative="Xác nhận"
                                    nameBtnPositive="Hủy"
                                    onBtnNegative={() => handleCancelReservationById({idReservation: re.id})}
                                  />
                                  <ModalScrollCustom
                                      icon={<i className="fa fa-credit-card" aria-hidden="true"></i>}
                                      className='btn-reservation-deposit'
                                      onBtnClick={handleFindReservationForTransaction}
                                      data={re.id}
                                      title="Payment"
                                      content={<ContentPayment reservationTransaction={reservationTransaction} idAccount={idAccount}/>}
                                  />
                                </HStack>
                            </Td>
                          </Tr>
                        ))
                      )}
                  </Tbody>
                </Table>
              </Box>

              <Box className="box-container-account-1">
                <Heading pb={4} size="md">Lịch sử giao dịch</Heading>
                <Table size='sm'>
                  <Thead>
                      <Tr>
                          <Th>Id</Th>
                          <Th>Giờ thanh toán</Th>
                          <Th>Ngày đặt</Th>
                          <Th>Ngày trả</Th>
                          <Th>Khách hàng</Th>
                          <Th>Giá tiền</Th>
                          <Th isNumeric>Tool</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {myAccountTransaction && (
                        myAccountTransaction.map((tc, index) => (
                          <Tr key={index}>
                            <Td>{tc.id}</Td>
                            <Td>{formatDate(tc.createdAt, 'hh:MM - dd/mm/yyyy')}</Td>
                            <Td>{formatDate(tc.startDate, 'dd/mm/yyyy')}</Td>
                            <Td>{formatDate(tc.endDate, 'dd/mm/yyyy')}</Td>
                            <Td>{tc.nameCustomer}</Td>
                            <Td>{round(tc.amount)}</Td>
                            <Td>

                                <HStack justify="end">
                                  <AlertDialogCustom 
                                    nameBtnCall={<i className="fa fa-ban" aria-hidden="true"></i>}
                                    className="btn-cancel-deposit"
                                    title="Trả phòng"
                                    content={<p>Bạn có muốn xóa lịch sử giao dịch này không ?</p>}
                                    nameBtnNegative="Xác nhận"
                                    nameBtnPositive="Hủy"
                                    onBtnNegative={() => handleDeleteTransactionById({id: tc.id})}
                                  />
                                  <ModalScrollCustom
                                    icon={<i className="fa fa-credit-card" aria-hidden="true"></i>}
                                    className='btn-reservation-deposit'
                                    onBtnClick={handleFindReservationForTransaction}
                                    data={tc.idReservation}
                                    title="Payment"
                                    content={<ContentTransaction idTransaction={tc.id} idAccount={myAccount.id}/>}
                                />
                                </HStack>
                            </Td>
                          </Tr>
                        ))
                      )}
                  </Tbody>
                </Table>
              </Box>      
            </VStack>        
                
            <Box className="box-container-account-2">
              <Heading pb={4} size="md">Thông tin cá nhân</Heading>
              <Center>
                <Image borderRadius='full'
                  boxSize='150px'
                  src={myAccount.avatar} 
                  alt={myAccount.name}/>
              </Center>
              <table>
                <tr>
                  <th>Họ & tên:</th>
                  <td>{myAccount.name}</td>
                </tr>
                <tr>
                  <th>Id:</th>
                  <td>{myAccount.id}</td>
                </tr>
                <tr>
                  <th>Loại:</th>
                  <td>{myAccount.authProvider}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{myAccount.email}</td>
                </tr>
                <tr>
                  <th>Địa chỉ:</th>
                  <td>{myAccount.address}</td>
                </tr>
                <tr>
                  <th>Số điện thoại:</th>
                  <td>{myAccount.phoneNum}</td>
                </tr>
              </table>
            </Box>
          </HStack>
        </Box>
    )
}

function ContentPayment(props) {
  
    const {reservationTransaction, idAccount} = props
  
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
        dispatch(showMyAccountByIdAccount(idAccount))
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
          
          <Text fontSize={14}>Loại phòng: {reservationTransaction.reservation.nameRoomtype}</Text>
          <Text fontSize={14}>Ngày đặt: {formatDate(reservationTransaction.reservation.startDate, "dd/mm/yyyy") || ''}</Text>
          <Text fontSize={14}>Ngày trả: {formatDate(reservationTransaction.reservation.endDate, "dd/mm/yyyy") || ''}</Text>
          <Text fontSize={14}>Số người: {reservationTransaction.reservation.customerNum || 0}</Text>
          <Divider />
          
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
                  <Th isNumeric>{round(room.incurredPrice) || 0}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Divider />
          
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
                  <Th>{round(service.price) || 0}</Th>
                  <Th isNumeric>{round(service.intoPrice) || 0}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Divider />
          <Table variant='simple' size='sm'>
            <Tbody>
              <Tr>
                <Th>Tiền phòng:</Th>
                <Th isNumeric>{round(reservationTransaction.reservation.priceRoomtype) || 0}</Th>
              </Tr>
              <Tr>
                <Th>Tổng:</Th>
                <Th isNumeric>{round(reservationTransaction.reservation.total) || 0}</Th>
              </Tr>
              <Tr>
                <Th>Thuế dịch vụ (5%):</Th>
                <Th isNumeric>{round(reservationTransaction.reservation.taxService) || 0}</Th>
              </Tr>
              <Tr>
                <Th>Thuế VAT (10%):</Th>
                <Th isNumeric>{round(reservationTransaction.reservation.taxInvoice) || 0}</Th>
              </Tr>
              <Tr>
                <Th color="red">Tổng cộng:</Th>
                <Th color="red" isNumeric>{round(reservationTransaction.reservation.grandTotal) || 0}</Th>
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



  function ContentTransaction(props) {
  
    const {idTransaction, idAccount} = props
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()

    const transaction = useSelector((state) => state.transactionReducer.transaction)

    useEffect(() => {
      dispatch(doFindTransactionById(idTransaction))
    }, [idTransaction])
  
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
          {transaction && (
            <>
              <Heading align="center" fontSize={32} >Chi tiết hóa đơn</Heading>
              <Text fontSize={14} align="center">{transaction.id || ''}</Text>
              <Text fontSize={14} align="center">{formatDate(transaction.createdAt, "hh:MM:ss - dd/mm/yyyy") || ''}</Text>
              <Text fontSize={14}>Mã khách hàng: {idAccount || ''}</Text>
              <Text fontSize={14}>Khách hàng: {transaction.nameCustomer || ''}</Text>
              <Divider />
              
              <Text fontSize={14}>Ngày đặt: {formatDate(transaction.startDate, "dd/mm/yyyy") || ''}</Text>
              <Text fontSize={14}>Ngày trả: {formatDate(transaction.endDate, "dd/mm/yyyy") || ''}</Text>
              <Text fontSize={14}>Số người: {transaction.customerNum || 0}</Text>
              <Divider />
              
              <Table variant='simple' size='sm'>
                <Tbody>
                  <Tr>
                    <Th>Tổng:</Th>
                    <Th isNumeric>{round(transaction.total) || 0}</Th>
                  </Tr>
                  <Tr>
                    <Th>Thuế dịch vụ (5%):</Th>
                    <Th isNumeric>{round(transaction.taxService) || 0}</Th>
                  </Tr>
                  <Tr>
                    <Th>Thuế VAT (10%):</Th>
                    <Th isNumeric>{round(transaction.taxInvoice) || 0}</Th>
                  </Tr>
                  <Tr>
                    <Th color="red">Tổng cộng:</Th>
                    <Th color="red" isNumeric>{round(transaction.amount) || 0}</Th>
                  </Tr>
                </Tbody>
              </Table>
            </>
          )}
        </Flex>
      </>
    );
  }

export default OrderAndHistory