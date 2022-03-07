import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Divider} from "@chakra-ui/react";
import RoomState from "./RoomState";
import RoomtypeList from "./RoomtypeList";

function RoomTab() {
  return (
    <>
      <Heading py={4}>Quản lý đặt phòng</Heading>
      <Divider />
      <Tabs py={4} variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Quản lý đặt phòng</Tab>
          <Tab>Quản lý phòng</Tab>
          <Tab>Quản lý loại phòng</Tab>
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
