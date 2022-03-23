import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  Text,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import { doLogout } from "../../../redux/actions/auth-action";
import { ACCESS_TOKEN } from "../../../constants";

function Header() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(ACCESS_TOKEN)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setAccessToken(accessToken);
  }, []);

  const handleLogout = async () => {
    await dispatch(doLogout())
    navigate("/auth/login")
    setAccessToken(null)
  };

  console.log(jwtDecode(accessToken).claims)

  return (
    <Box bg="#EDF2F7" w="100%" p={2} boxShadow='lg'>
      <Flex alignItems="center">
        <Box>
          <Button colorScheme="teal" mr="4">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Button>
        </Box>
        <Spacer />


        <Menu isLazy >
          <MenuButton>
            <HStack>
              <Box ml="3" align="end">
                <Text fontWeight="bold">{jwtDecode(accessToken).claims.name}</Text>
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
          <MenuList style={{ margin: 0 }}>
            {/* MenuItems are not rendered unless Menu is open */}
            <MenuItem>Profile</MenuItem>
            <MenuItem>Setting</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
    </Flex>
    </Box >
  );
}

export default Header;
