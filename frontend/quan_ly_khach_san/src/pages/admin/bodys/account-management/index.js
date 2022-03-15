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
import CustomerNoAccountList from "./CustomerNoAccountList";
import { ErrorBoundary } from "../../../ErrorBoundary ";
import InternalList from "./InternalList";

function AccountTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Heading py={4}>Quản lý tài khoản</Heading>
      <Divider />
      <Tabs
        py={4}
        variant="soft-rounded"
        colorScheme="green"
        index={+searchParams.get("tab1") || 0}
      >
        <TabList>
          <Link to="/admin/accounts?tab1=0">
            <Tab>Thành viên nội bộ</Tab>
          </Link>
          <Link to="/admin/accounts?tab1=1">
            <Tab>Khách có tài khoản</Tab>
          </Link>
          <Link to="/admin/accounts?tab1=2">
            <Tab>Khách không tài khoản</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ErrorBoundary>
              <InternalList />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel>
            <ErrorBoundary>
              <CustomerNoAccountList />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default AccountTab;
