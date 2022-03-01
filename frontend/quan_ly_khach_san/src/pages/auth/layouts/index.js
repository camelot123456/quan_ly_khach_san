import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import { Flex, Spacer } from "@chakra-ui/react";

import Login from "../bodys/Login";
import Header from "../fragments/Header";

function AuthLayout() {
  return (
    <div>
      <Header />
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Outlet />
        </Flex>
    </div>
  );
}

export default AuthLayout;
