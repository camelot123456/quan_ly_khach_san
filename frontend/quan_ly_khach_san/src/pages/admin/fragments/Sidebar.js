import React from "react";
import { Box, Flex, Spacer, Text, Heading, Divider, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { APP_NAME } from "../../../constants";

function Sidebar() {
  return (
    <Flex flexDirection="column" width="15%" height="100vh" bg="#3e3e3e">

      <Box className="btn-admmin-sidebar-link">
        <Link to="/admin">
          <Heading as="h4" size="md" py={1}>
            {APP_NAME}
          </Heading>
        </Link>
      </Box>
      <Divider color="white" />

      <Link to="/admin/dashboard">
        <HStack className="btn-admmin-sidebar-link">
          <i className="fa fa-tachometer" aria-hidden="true"></i>
          <Text>Dashboard</Text>
        </HStack>
      </Link>

      <Link to="/admin/rooms">
        <HStack className="btn-admmin-sidebar-link">
          <i className="fa fa-bed" aria-hidden="true"></i>
          <Text>Quản lý đặt phòng</Text>
        </HStack>
      </Link>

      <Link to="/admin/transactions">
        <HStack className="btn-admmin-sidebar-link">
        <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
          <Text>Quản lý hóa đơn</Text>
        </HStack>
      </Link>

      <Link to="/admin/customers">
        <HStack className="btn-admmin-sidebar-link">
        <i className="fa fa-users" aria-hidden="true"></i>
          <Text>Quản lý khách hàng</Text>
        </HStack>
      </Link>

      <Link to="/admin/internals">
        <HStack className="btn-admmin-sidebar-link">
        <i className="fa fa-user-md" aria-hidden="true"></i>
          <Text>Quản lý nội bộ</Text>
        </HStack>
      </Link>

      <Link to="/admin/services">
        <HStack className="btn-admmin-sidebar-link">
          <i className="fa fa-diamond" aria-hidden="true"></i>
          <Text>Quản lý dịch vụ</Text>
        </HStack>
      </Link>
    </Flex>
  );
}

export default Sidebar;
