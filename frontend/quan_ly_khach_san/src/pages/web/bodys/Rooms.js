import { Badge, Box, Container, Heading, Image, StarIcon, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { showRoomtypePublic } from "../../../redux/actions/roomtype-action";
import {Link} from "react-router-dom";

function Rooms() {

  const dispatch = useDispatch();
  const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes)

  useEffect(() => {
    dispatch(showRoomtypePublic({
        currentPage: 0,
        sizePage: 20,
        sortField: "id",
        sortDir: "asc",
        keyword: "",
    }))
  }, [])

  return (
    <Box px={32}>
    <Heading>Rooms Page</Heading>
    <Wrap mt={8} spacing={8}>
    {roomtypes && roomtypes.map((roomtype, index) => (
        <WrapItem key={index} cursor="pointer" _hover={{transform: 'scale(1.1)'}}>
            <Link to={`/rooms/${roomtype.id}`}>
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image src={roomtype.avatarUrl} alt={roomtype.name} />

                    <Box p="6">
                        <Box display="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                            </Badge>
                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {roomtype.name}
                        </Box>

                        <Box>
                            {roomtype.price} <Box as="span" color="gray.600" fontSize="sm">$</Box>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </WrapItem>
      ))}
      </Wrap>
    </Box>
  );
}

export default Rooms;
