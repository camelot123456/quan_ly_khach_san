import React from "react";
import { Box, Flex, Spacer, Text, Heading, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { APP_NAME } from "../../../constants";

function Sidebar() {
  return (
    <Flex flexDirection="column" width="15%" height="100vh" bg="#3e3e3e">
      <Box
        w="100%"
        p={4}
        minHeight="64px"
        color="white"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        cursor="pointer"
        _hover={{ bg: "#EDF2F7", color: "#3e3e3e" }}
        _active={{ bg: "#3e3e3e", color: "#EDF2F7" }}
      >
        <Link to="/admin">
          <Heading as="h4" size="md">
            {APP_NAME}
          </Heading>
        </Link>
      </Box>
      <Divider color="white" />
      <Box
        w="100%"
        p={4}
        color="white"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        cursor="pointer"
        _hover={{ bg: "#EDF2F7", color: "#3e3e3e" }}
        _active={{ bg: "#3e3e3e", color: "#EDF2F7" }}
      >
        <Text>Dashboard</Text>
      </Box>
      <Link to="/admin/rooms">
        <Box
          w="100%"
          p={4}
          color="white"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          cursor="pointer"
          _hover={{ bg: "#EDF2F7", color: "#3e3e3e" }}
          _active={{ bg: "#3e3e3e", color: "#EDF2F7" }}
        >
          <Text>Quản lý đặt phòng</Text>
        </Box>
      </Link>
      <Link to="/admin/transactions">
        <Box
          w="100%"
          p={4}
          color="white"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          cursor="pointer"
          _hover={{ bg: "#EDF2F7", color: "#3e3e3e" }}
          _active={{ bg: "#3e3e3e", color: "#EDF2F7" }}
        >
          <Text>Quản lý hóa đơn</Text>
        </Box>
      </Link>
      <Box
        w="100%"
        p={4}
        color="white"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        cursor="pointer"
        _hover={{ bg: "#EDF2F7", color: "#3e3e3e" }}
        _active={{ bg: "#3e3e3e", color: "#EDF2F7" }}
      >
        <Text>Quản lý tài khoản</Text>
      </Box>
      <Box
        w="100%"
        p={4}
        color="white"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        cursor="pointer"
        _hover={{ bg: "#EDF2F7", color: "#3e3e3e" }}
        _active={{ bg: "#3e3e3e", color: "#EDF2F7" }}
      >
        <Text>Quản lý dịch vụ</Text>
      </Box>
    </Flex>
  );
}

export default Sidebar;
