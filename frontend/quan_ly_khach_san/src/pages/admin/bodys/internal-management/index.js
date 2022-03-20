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
import { Link, useSearchParams } from "react-router-dom";
import { ErrorBoundary } from "../../../ErrorBoundary ";
import InternalList from "./InternalList";
import AccountAllList from "./AccountAll";

function InternalTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Heading py={4}>Quản lý nội bộ</Heading>
      <Divider />
      <Tabs
        py={4}
        variant="soft-rounded"
        colorScheme="green"
        index={+searchParams.get("tab1") || 0}
      >
        <TabList>
          <Link to="/admin/internals?tab1=0">
            <Tab>Quản lý nhân viên</Tab>
          </Link>
          <Link to="/admin/internals?tab1=1">
            <Tab>Quản lý tài khoản</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ErrorBoundary>
              <InternalList />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel>
              <AccountAllList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default InternalTab;
