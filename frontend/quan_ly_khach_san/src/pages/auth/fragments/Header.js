import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Flex, Spacer, Box, Heading, Button } from "@chakra-ui/react";

function Header() {
  const appName = "SE379 Hotel";

  return (
    <Box bg="#EDF2F7" w="100%" p={4}>
      <Flex>
        <Box p="2">
          <Heading size="md">
            <Link to="/home">{appName}</Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="teal" mr="4">
            Sign Up
          </Button>
          <Link to="/auth/login">
            <Button colorScheme="teal">Log in</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
