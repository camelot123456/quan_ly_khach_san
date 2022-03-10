import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Divider,
} from "@chakra-ui/react";
import RoomState from "./RoomState";
import RoomtypeList from "./RoomtypeList";
import { Link, useSearchParams } from "react-router-dom";

function RoomTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Heading py={4}>Quản lý đặt phòng</Heading>
      <Divider />
      <Tabs
        py={4}
        variant="soft-rounded"
        colorScheme="green"
        index={+searchParams.get("tab1") || 0}
      >
        <TabList>
          <Link to="/admin/rooms?tab1=0&tab2=0">
            <Tab>Quản lý đặt phòng</Tab>
          </Link>
          <Link to="/admin/rooms?tab1=1">
            <Tab>Quản lý phòng</Tab>
          </Link>
          <Link to="/admin/rooms?tab1=2">
            <Tab>Quản lý loại phòng</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RoomState />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <RoomtypeList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default RoomTab;
