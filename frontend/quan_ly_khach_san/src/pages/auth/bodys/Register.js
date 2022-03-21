import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  Alert,
  AlertIcon,
  toast,
  useToast,
} from "@chakra-ui/react";

import { doLogin, doRegister } from "../../../redux/actions/auth-action";
import { ACCESS_TOKEN } from "../../../constants";
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup'
import FormField from "../../FormField";

function Register() {
  const toast = useToast()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required("Trường này không được để trống."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
      .required("Trường này không được để trống."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {

        var data = { 
            name: values.name, 
            email: values.email, 
            password: values.confirmPassword, 
        }

        dispatch(doRegister(data))
        .then((res) => {
          navigate("/auth/login");
          toast({
            title: 'Thông báo',
            description: "Đăng ký thành công",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        })
        .catch((err) => {
            toast({
                title: 'Thông báo',
                description: "Đăng ký thất bại",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
        .finally(() => {});
      }}
    >
      {(formikProps) => {
        const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;
        return (
            <Box
              minWidth="24rem"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              shadow="2xl"
            >
            <Form>
              <VStack spacing={5} align="stretch">
                <Text fontSize="4xl" fontWeight="bold" align="center" marginY={4}>
                  Sign Up
                </Text>
                <FastField label="Name" id="name" name="name" placeholder="First name & Last name" component={FormField.InputField}/>
                <FastField label="Email" id="email" name="email" placeholder="Email" type="email" component={FormField.InputField}/>
                <FastField label="Password" id="password" name="password" placeholder="Password" type="password" component={FormField.InputField}/>
                <FastField label="Confirm Password" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" component={FormField.InputField}/>

                <Button colorScheme="blue" type="submit">
                  Sign Up
                </Button>

                <Box align="center" fontSize={14}>
                    <Link to="">Forgot Password ?</Link>
                </Box>
                
              </VStack>
             </Form>
            </Box>
        );
      }}
    </Formik>
  );
}

export default Register;
