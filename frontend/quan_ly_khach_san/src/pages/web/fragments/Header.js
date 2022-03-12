import React, { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  Badge,
  Avatar,
} from "@chakra-ui/react";

import { ACCESS_TOKEN, APP_NAME } from "../../../constants";
import { doLogout } from "../../../redux/actions/auth-action";
import { parseJwt } from "../../../commons/jwt-common";

function Header() {
  const [auth, setAuth] = useState(false)
  const ref = useRef('');

  const accessToken = useSelector((state => state.authReducer.authResponse))

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (parseJwt(accessToken)) {
      ref.current = parseJwt(accessToken)
      setAuth(true)
    }
  }, [auth]);

  const handleLogout = () => {
    setAuth(false)
    dispatch(doLogout())
  };

  return (
    <Box bg="#EDF2F7" w="100%" p={4}>
      <Flex>
        <HStack spacing="24px">
          <Heading size="sm">
            <Link to="/home" style={{ fontSize: "24px" }}>
              {APP_NAME}
            </Link>
          </Heading>
          <Heading size="sm">
            <Link to="/web/rooms">Phòng</Link>
          </Heading>
          <Heading size="sm">
            <Link to="/web/services">Dịch vụ</Link>
          </Heading>
          <Heading size="sm">
            <Link to="/admin">Admin</Link>
          </Heading>
        </HStack>
        <Spacer />
        {auth ? (
          <Menu isLazy>
            <MenuButton>
              <HStack>
                <Box ml="3" align="end">
                  <Text fontWeight="bold">
                    {ref.current.claims.name}
                  </Text>
                  {ref.current.claims.roles.map((role, index) => (
                    <Badge ml="1" colorScheme="green" key={index}>
                      <Text fontSize="xs">
                        {role.toString().substring("ROLE_".length)}
                      </Text>
                    </Badge>
                  ))}
                </Box>
                <Avatar
                  src={ref.current.claims.avatarUrl}
                  alt={ref.current.claims.name}
                  size="md"
                />
              </HStack>
            </MenuButton>
            <MenuList>
              {/* MenuItems are not rendered unless Menu is open */}
              <MenuItem>Profile</MenuItem>
              <MenuItem>Setting</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box>
            <Button colorScheme="teal" mr="4">
              Sign Up
            </Button>
            <Link to="/auth/login">
              <Button colorScheme="teal">Log in</Button>
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
