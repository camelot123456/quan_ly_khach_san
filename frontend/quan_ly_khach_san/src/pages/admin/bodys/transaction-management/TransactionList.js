import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  Center,
  HStack,
  Alert,
  AlertIcon,
  Box,
  SkeletonCircle,
  SkeletonText,
  Heading, 
  Divider
} from "@chakra-ui/react";

import {formatDate} from '../../../../commons/dateformat-common'
import { getTransactionsList } from "../../../../redux/actions/transaction-action";
import axios from "axios";

function TransactionList() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactionReducer.transactions);

  useEffect(() => {
    dispatch(getTransactionsList({
        currentPage: 0,
        sizePage: 20,
        sortField: "id",
        sortDir: "asc",
        keyword: "",
    }));
  }, []);

  return (
    <>
      <Heading py={4}>Lịch sử giao dịch</Heading>
      <Divider />
      {transactions ? (
        <Table variant="striped" colorScheme="blue" size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Stt</Th>
            <Th>Id giao dịch</Th>
            <Th>Tên</Th>
            <Th>Ngày thanh toán</Th>
            <Th>Tổng tiền (VND)</Th>
            <Th>Công cụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{transaction.id}</Td>
              <Td>{transaction.nameCustomer || ""}</Td>
              <Td>{formatDate(transaction.createdAt, "dd/mm/yyyy")}</Td>
              <Td>{transaction.amount}</Td>
              <Td>
                <HStack>
                  <Link to="/">
                    <Center p={2} bg="green" borderRadius={4} color="white">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Center>
                  </Link>
                  {/* <Link to="/">
                    <Center  p={2} bg="red" borderRadius={4} color="white">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </Center>
                  </Link> */}
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

export default TransactionList;
