import authTypes from "../types/auth-type";
import authService from "../../services/auth-service";
import { ACCESS_TOKEN } from "../../constants";

export const doLogin = (authRequest) => (dispatch) => {
  return new Promise((resolve, reject) => {
    authService.doLogin(authRequest)
    .then(res => {
      console.log(res.data)
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken.accessToken)
      dispatch({
        type: authTypes.LOGIN_ACTION,
        payload: {
          authResponse: res.data.accessToken
        }
      })
      resolve()
    })
    .catch(err => {
      reject()
    })
  })
};

export const doRegister = (authRequest) => (dispatch) => {
  return new Promise((resolve, reject) => {
    authService.doRegister(authRequest)
    .then(res => {
      resolve()
    })
    .catch(err => {
      reject()
    })
  })
};

export const doLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  return {
    type: authTypes.LOGOUT_ACTION
  };
};
