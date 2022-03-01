import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "../fragments/Header";
import Sidebar from "../fragments/Sidebar";

function AdminLayout() {
  return (
    <>
      <Flex height="100vh">
        <Sidebar />
        <Flex flexDirection="column" justifyContent="top" width="85%">
          <Header />
          <Box p={4}>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default AdminLayout;
