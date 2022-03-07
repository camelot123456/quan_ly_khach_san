import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dateformat from "dateformat";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { doShowRoomsAdmin } from "../../../../redux/actions/room-action";

function RoomState() {
  const rooms = useSelector((state) => state.roomReducer.rooms);

  const dispatch = useDispatch();

  const formatDate = (date) => {
    return dateformat(date, "dd/mm/yyyy");
  };

  const parseColor = (roomState) => {
    switch (roomState) {
      case "ALL":
        return "#4299E1";
      case "EMPTY":
        return "#A0AEC0";
      case "USING":
        return "#48BB78";
      case "DEPOSIT":
        return "#9F7AEA";
      case "REPAIR":
        return "#F56565";
      default:
        return "#4299E1";
    }
  };

  useEffect(() => {
    dispatch(doShowRoomsAdmin());
  }, []);

  return (
    <>
      <HStack spacing={8}>
        <Link style={{ width: "100%" }} to="/admin/rooms">
          <Box
            w="100%"
            h="100%"
            align="center"
            borderRadius={6}
            p={4}
            color="white"
            bg="#4299E1"
            boxShadow='lg'
          >
            Tất cả:{" "}
          </Box>
        </Link>

        <Link style={{ width: "100%" }} to="/admin/rooms?state=USING">
          <Box
            w="100%"
            h="100%"
            align="center"
            borderRadius={6}
            p={4}
            color="white"
            bg="#48BB78"
            boxShadow='lg'
          >
            Đang ở:{" "}
          </Box>
        </Link>

        <Link style={{ width: "100%" }} to="/admin/rooms?state=DEPOSIT">
          <Box
            w="100%"
            h="100%"
            align="center"
            borderRadius={6}
            p={4}
            color="white"
            bg="#9F7AEA"
            boxShadow='lg'
          >
            Đặt cọc:{" "}
          </Box>
        </Link>

        <Link style={{ width: "100%" }} to="/admin/rooms?state=EMPTY">
          <Box
            w="100%"
            h="100%"
            align="center"
            borderRadius={6}
            p={4}
            color="white"
            bg="#A0AEC0"
            boxShadow='lg'
          >
            Trống:{" "}
          </Box>
        </Link>

        <Link style={{ width: "100%" }} to="/admin/rooms?state=REPAIR" >
          <Box
            w="100%"
            h="100%"
            align="center"
            borderRadius={6}
            p={4}
            color="white"
            bg="#F56565"
            boxShadow='lg'
          >
            Sửa chữa:{" "}
          </Box>
        </Link>
      </HStack>

      <HStack mt={4} justify="end">
        <Link to="/admin/rooms/reservation">
          <Button colorScheme="blue">Đặt phòng</Button>
        </Link>
      </HStack>

      <Wrap marginTop={8} justify="flex-start" spacing={8}>
        {rooms.map((room, index) => (
          <WrapItem key={index + 1} boxShadow='2xl'>
            <Box
              p={2}
              borderRadius={4}
              w="185px"
              bg={parseColor(room.roomState)}
            >
              <Flex>
                <Box color="white">{index + 1}</Box>
                <Spacer />
                <Link
                  style={{
                    minWidth: "26px",
                    textAlign: "center",
                    marginRight: "3px",
                  }}
                  to="/"
                >
                  <Box
                    color="white"
                    borderRadius={4}
                    border="solid 1px"
                    _hover={{
                      borderColor: "white",
                      bg: "white",
                      color: "black",
                    }}
                  >
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                  </Box>
                </Link>
                <Link
                  style={{ minWidth: "26px", textAlign: "center" }}
                  to={`/admin/rooms/${room.idRoom}?idTransaction=${
                    room.idTransaction === null ? "" : room.idTransaction
                  }`}
                >
                  <Box
                    color="white"
                    borderRadius={4}
                    border="solid 1px"
                    _hover={{
                      borderColor: "white",
                      bg: "white",
                      color: "black",
                    }}
                  >
                    <i className="fa fa-info" aria-hidden="true"></i>
                  </Box>
                </Link>
              </Flex>
              <VStack>
                <Box>
                  <Text color="white" textAlign="center">
                    {room.roomNum}
                  </Text>
                  <Text color="white" textAlign="center">
                    {room.roomState}
                  </Text>
                  <Text color="white" textAlign="center">
                    <i className="fa fa-user" aria-hidden="true"></i>{" "}
                    {room.nameAccount || "Chưa có"}
                  </Text>
                  <Text color="white" textAlign="center">
                    <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                    {formatDate(room.startDate)}
                  </Text>
                  <Text color="white" textAlign="center">
                    <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                    {formatDate(room.endDate)}
                  </Text>
                </Box>
                <Spacer />
                <HStack justify="center">
                  <Link
                    style={{
                      minWidth: "26px",
                      textAlign: "center",
                      marginRight: "3px",
                    }}
                    to="/"
                  >
                    <Box
                      color="white"
                      borderRadius={4}
                      border="solid 1px"
                      _hover={{
                        borderColor: "white",
                        bg: "white",
                        color: "black",
                      }}
                    >
                      <i className="fa fa-bell-o" aria-hidden="true"></i>
                    </Box>
                  </Link>
                  <Link
                    style={{ minWidth: "26px", textAlign: "center" }}
                    to="/"
                  >
                    <Box
                      color="white"
                      borderRadius={4}
                      border="solid 1px"
                      _hover={{
                        borderColor: "white",
                        bg: "white",
                        color: "black",
                      }}
                    >
                      <i className="fa fa-info" aria-hidden="true"></i>
                    </Box>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}

export default RoomState;
