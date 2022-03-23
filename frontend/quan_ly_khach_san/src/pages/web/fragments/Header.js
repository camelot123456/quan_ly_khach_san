import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
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
import jwtDecode from "jwt-decode";

function Header() {

  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(ACCESS_TOKEN)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setAccessToken(accessToken);
  }, []);

  const handleLogout = () => {
    dispatch(doLogout())
    navigate("/auth/login")
    setAccessToken(null)
  };

  return (
    <Box bg="#EDF2F7" w="100%" p={2}>
      <Flex>
        <HStack spacing="24px">
          <Heading size="sm">
            <Link to="/home" style={{ fontSize: "24px" }}>
              {APP_NAME}
            </Link>
          </Heading>
          <Heading size="sm">
            <Link to="/services">Dịch vụ</Link>
          </Heading>
        </HStack>
        <Spacer />
        {accessToken ? (
          <Menu isLazy>
            <MenuButton>
              <HStack>
                <Box ml="3" align="end">
                  <Text fontWeight="bold">
                    {jwtDecode(accessToken).claims.name}
                  </Text>
                  {jwtDecode(accessToken).claims.roles.map((role, index) => (
                    <Badge ml="1" colorScheme="green" key={index}>
                      <Text fontSize="8px">
                        {role.toString().substring("ROLE_".length)}
                      </Text>
                    </Badge>
                  ))}
                </Box>
                <Avatar
                  src={jwtDecode(accessToken).claims.avatarUrl}
                  alt={jwtDecode(accessToken).claims.name}
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
            <Link to="/auth/register">
              <Button colorScheme="teal" mr="4">Sign Up</Button>
            </Link>
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
