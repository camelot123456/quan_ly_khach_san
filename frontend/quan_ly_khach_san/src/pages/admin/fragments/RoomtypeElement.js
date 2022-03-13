import { Alert, AlertIcon, Badge, Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

function RoomTypeElement(props) {
  const { roomtype } = props;

  return (
    <>
      {roomtype ? (
        <HStack mt={4} align="start">
          <Box w="40%">
            <Image src={roomtype.avatarUrl} alt={roomtype.name} borderRadius="8px" />
          </Box>
          <Box w="60%">
            <Heading fontSize={18} textAlign="start">
              {roomtype.name}
            </Heading>
            <Badge colorScheme="purple" fontSize={14}>
              {roomtype.price} VND/Day
            </Badge>
            <Text fontSize={14} lineHeight="1.2" textAlign="justify">
              {roomtype.description}
            </Text>
          </Box>
        </HStack>
      ) : (
        <Alert status="warning" mt={4}>
          <AlertIcon />
          Vui lòng chọn loại phòng !
        </Alert>
      )}
    </>
  );
}

export default RoomTypeElement