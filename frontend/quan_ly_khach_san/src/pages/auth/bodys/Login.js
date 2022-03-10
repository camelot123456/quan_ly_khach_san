import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  VStack,
  StackDivider,
  Text,
  Checkbox,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react";

import { doLogin } from "../../../redux/actions/auth-action";
import { ACCESS_TOKEN } from "../../../constants";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(doLogin({ email, password }))
    navigate("/home")
    
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="2xl"
    >
      <VStack spacing={5} align="stretch">
        <Text fontSize="4xl" fontWeight="bold" align="center" marginY={4}>
          Log In
        </Text>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Checkbox>Remember Me</Checkbox>

        <Button colorScheme="blue" onClick={(e) => handleLogin(e)}>
          Login
        </Button>

        <HStack>
          <Divider orientation="horizontal" />
          <Text>Or</Text>
          <Divider orientation="horizontal" />
        </HStack>

        <HStack>
          <Button
            minWidth="150px"
            marginRight="auto"
            colorScheme="facebook"
            leftIcon={
              <i
                className="fa fa-facebook"
                aria-hidden="true"
                style={{ marginTop: "4px" }}
              ></i>
            }
          >
            Facebook
          </Button>
          <Button
            minWidth="150px"
            colorScheme="red"
            leftIcon={
              <i
                className="fa fa-google"
                aria-hidden="true"
                style={{ marginTop: "4px" }}
              ></i>
            }
          >
            Google
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Login;
