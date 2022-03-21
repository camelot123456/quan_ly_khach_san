import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { parseJwt } from "../../../commons/jwt-common";
import { ACCESS_TOKEN } from "../../../constants";

import Header from "../fragments/Header";
import Sidebar from "../fragments/Sidebar";

function AdminLayout() {
  const ref = useRef('')

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (parseJwt(accessToken)) {
    ref.current = parseJwt(accessToken)
  }
  
  return (
    <>
      {ref.current && ref.current.claims.roles.includes('ROLE_ACCOUNTANT', 'ROLE_BUSINESS', 'ROLE_RECEPTIONISTS', 'ROLE_DIRECTOR') ? (
        <Flex height="100vh">
          <Sidebar />
          <Flex flexDirection="column" justifyContent="top" width="85%">
            <Header />
            <Box p={4} overflow="auto">
              <Outlet />
            </Box>
          </Flex>
        </Flex>
      ) : (
        <>
          {ref.current ? <Navigate to="/error/403" /> : <Navigate to="/auth/login" />}
        </>
      )}
    </>
  );
}

export default AdminLayout;
