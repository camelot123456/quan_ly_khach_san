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
} from "@chakra-ui/react";

import {formatDate} from '../../../../commons/dateformat-common'
import { getTransactionsList } from "../../../../redux/actions/transaction-action";

function TransactionList() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactionReducer.transactions);

  console.log(transactions)

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
    <Table variant="striped" colorScheme="blue">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Stt</Th>
          <Th>Id</Th>
          <Th>Tên</Th>
          <Th>Ngày thanh toán</Th>
          <Th>Giá (VND)</Th>
          <Th>Công cụ</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{transaction.id}</Td>
            <Td>{transaction.account.name || ""}</Td>
            <Td>{formatDate(transaction.createdAt, "dd/mm/yyyy")}</Td>
            <Td>{transaction.amount}</Td>
            <Td>
              <HStack>
                <Link to="/">
                  <Center p={2} bg="green" borderRadius={4} color="white">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Center>
                </Link>
                <Link to="/">
                  <Center  p={2} bg="red" borderRadius={4} color="white">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </Center>
                </Link>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TransactionList;
