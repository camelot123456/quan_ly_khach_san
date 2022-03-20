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
import CustomerAccountList from "./CustomerAccountList";
import { ErrorBoundary } from "../../../ErrorBoundary ";

function AccountTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Heading py={4}>Quản lý khách hàng</Heading>
      <Divider />
      <Tabs
        py={4}
        variant="soft-rounded"
        colorScheme="green"
        index={+searchParams.get("tab1") || 0}
      >
        <TabList>
          <Link to="/admin/customers?tab1=0">
            <Tab>Khách có tài khoản</Tab>
          </Link>
          <Link to="/admin/customers?tab1=1">
            <Tab>Khách không tài khoản</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ErrorBoundary>
              <CustomerAccountList />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel>
              <CustomerNoAccountList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default AccountTab;
