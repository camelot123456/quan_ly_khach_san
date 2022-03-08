import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dateformat from "dateformat";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";

import { doShowRoomsAdmin } from "../../../../redux/actions/room-action";

function RoomState() {
  const [searchParams, setSearchParams] = useSearchParams(0);
  const [roomState, setRoomState] = useState("all");

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
    dispatch(
      doShowRoomsAdmin({
        roomState: roomState,
        currentPage: 0,
        sizePage: 20,
        sortField: "id",
        sortDir: "asc",
        keyword: "",
      })
    );
  }, [roomState]);

  return (
    <>
      <Tabs isFitted variant="enclosed" index={+searchParams.get("tab2") || 0}>
        <TabList color="white">
          <Link to="/admin/rooms?tab1=0&tab2=0">
            <Tab borderRadius={8} h={70} bg="#4299E1" mr={10} w={220} 
              onClick={() => setRoomState("all")} >
              Tất cả:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=1">
            <Tab borderRadius={8} h={70} bg="#48BB78" mr={10} w={220} 
              onClick={() => setRoomState("using")} >
              Đang ở:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=2">
            <Tab borderRadius={8} h={70} bg="#9F7AEA" mr={10} w={220}
              onClick={() => setRoomState("deposit")}
            >
              Đặt cọc:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=3">
            <Tab borderRadius={8} h={70} bg="#A0AEC0" mr={10} w={220}
              onClick={() => setRoomState("empty")}
            >
              Trống:{" "}
            </Tab>
          </Link>

          <Link to="/admin/rooms?tab1=0&tab2=4">
            <Tab borderRadius={8} h={70} bg="#F56565" mr={10} w={220}
              onClick={() => setRoomState("repair")}
            >
              Sửa chữa:{" "}
            </Tab>
          </Link>
        </TabList>

        <HStack mt={4} justify="start">
          <Link to="/admin/rooms/reservation">
            <Button colorScheme="blue">Đặt phòng</Button>
          </Link>
        </HStack>

        <TabPanels>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={parseColor}
              type="ALL"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("USING")}
              type="USING"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("DEPOSIT")}
              type="DEPOSIT"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("EMPTY")}
              type="EMPTY"
            />
          </TabPanel>
          <TabPanel>
            <RoomAll
              rooms={rooms}
              onFormatDate={formatDate}
              onParseColor={() => parseColor("REPAIR")}
              type="REPAIR"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function RoomAll(props) {
  const { rooms, onFormatDate, onParseColor, type } = props;

  const handleFormatDate = (date) => {
    if (onFormatDate) {
      return onFormatDate(date);
    }
  };

  const handleParseColor = (roomState) => {
    if (onParseColor) {
      return onParseColor(roomState);
    }
  };

  return (
    <>
      <Wrap marginTop={4} justify="flex-start" spacing={6}>
        {rooms.map((room, index) => (
          <WrapItem key={index + 1} boxShadow="2xl">
            <Box p={2} borderRadius={4} w="185px" bg={handleParseColor(room.roomState)} >
              <Flex>
                <Box color="white">{index + 1}</Box>
                <Spacer />
                <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                  <Box color="white" borderRadius={4} rder="solid 1px" 
                    _hover={{ borderColor: "white", bg: "white", color: "black", }}
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
                  <Box color="white" borderRadius={4} border="solid 1px"
                    _hover={{ borderColor: "white", bg: "white", color: "black", }}
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
                    {handleFormatDate(room.startDate)}
                  </Text>
                  <Text color="white" textAlign="center">
                    <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                    {handleFormatDate(room.endDate)}
                  </Text>
                </Box>
                <Spacer />
                <HStack justify="center">
                  {type == "DEPOSIT" ?
                    (<>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="red.800"
                          _hover={{ borderColor: "white", bg: "red.500" }}
                        >
                          <i className="fa fa-ban" aria-hidden="true"></i>
                        </Box>
                      </Link>
                      <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="green.800"
                          _hover={{ borderColor: "white", bg: "green.500" }}
                        >
                          <i className="fa fa-credit-card" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

                  {type == "USING" ?
                    (<>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="red.800"
                          _hover={{ borderColor: "white", bg: "red.500" }}
                        >
                          <i className="fa fa-ban" aria-hidden="true"></i>
                        </Box>
                      </Link>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="blue.800"
                          _hover={{ borderColor: "white", bg: "blue.500" }}
                        >
                          <i className="fa fa-comments" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

                  {type == "EMPTY" ?
                    (<>
                      <Link style={{ minWidth: "26px", textAlign: "center" }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="red.800"
                          _hover={{ borderColor: "white", bg: "red.500" }}
                        >
                          <i className="fa fa-gavel" aria-hidden="true"></i>
                        </Box>
                      </Link>
                      <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="green.800"
                          _hover={{ borderColor: "white", bg: "green.500" }}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

                  {type == "REPAIR" ?
                    (<>
                      <Link style={{ minWidth: "26px", textAlign: "center", marginRight: "3px", }} to="/" >
                        <Box color="white" borderRadius={4} border="solid 1px" bg="green.800"
                          _hover={{ borderColor: "white", bg: "green.500" }}
                        >
                          <i className="fa fa-medkit" aria-hidden="true"></i>
                        </Box>
                      </Link>
                    </>) : (<></>)
                  }

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
