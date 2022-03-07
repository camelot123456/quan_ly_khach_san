import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  Text,
  Image,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import { doLogout } from "../../../redux/actions/auth-action";
import { ACCESS_TOKEN, APP_NAME } from "../../../constants";

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
    Promise.all([dispatch(doLogout()), setAccessToken(null)]).then(() =>
      navigate("/auth/login")
    );
  };

  return (
    <Box bg="#EDF2F7" w="100%" p={2} boxShadow='lg'>
      <Flex alignItems="center">
        <Box>
          <Button colorScheme="teal" mr="4">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Button>
        </Box>
        <Spacer />
        <HStack>
          <Box ml="3" align="end">
            <Text fontWeight="bold">{jwtDecode(accessToken).claims.name}</Text>
            {jwtDecode(accessToken).claims.roles.map((role) => (
              <Badge ml="1" colorScheme="green" key={role}>
                <Text fontSize="8px">
                  {role.toString().substring("ROLE_".length)}
                </Text>
              </Badge>
            ))}
          </Box>
          <Menu isLazy>
            <MenuButton>
              <Avatar
                src={jwtDecode(accessToken).claims.avatarUrl}
                alt={jwtDecode(accessToken).claims.name}
                size="md"
              />
            </MenuButton>
            <MenuList>
              {/* MenuItems are not rendered unless Menu is open */}
              <MenuItem>Profile</MenuItem>
              <MenuItem>Setting</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Header;
