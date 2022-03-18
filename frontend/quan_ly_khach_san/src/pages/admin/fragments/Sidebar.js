import React from "react";
import { Box, Flex, Spacer, Text, Heading, Divider } from "@chakra-ui/react";
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

      <Box className="btn-admmin-sidebar-link">
        <Text>Dashboard</Text>
      </Box>

      <Link to="/admin/rooms">
        <Box className="btn-admmin-sidebar-link">
          <Text>Quản lý đặt phòng</Text>
        </Box>
      </Link>

      <Link to="/admin/transactions">
        <Box className="btn-admmin-sidebar-link">
          <Text>Quản lý hóa đơn</Text>
        </Box>
      </Link>

      <Link to="/admin/customers">
        <Box className="btn-admmin-sidebar-link">
          <Text>Quản lý khách hàng</Text>
        </Box>
      </Link>

      <Link to="/admin/internals">
        <Box className="btn-admmin-sidebar-link">
          <Text>Quản lý nội bộ</Text>
        </Box>
      </Link>

      <Box className="btn-admmin-sidebar-link">
        <Text>Quản lý dịch vụ</Text>
      </Box>
    </Flex>
  );
}

export default Sidebar;
