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

import { doShowRoomtypeList } from "../../../../redux/actions/roomtype-action";

function RoomtypeList() {
  const dispatch = useDispatch();
  const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes);

  useEffect(() => {
    dispatch(doShowRoomtypeList());
  }, []);

  return (
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
              <Image w={130} src={roomtype.avatarUrl} alt={roomtype.name} />
            </Td>
            <Td>{roomtype.name}</Td>
            <Td>{roomtype.price}</Td>
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

export default RoomtypeList;
