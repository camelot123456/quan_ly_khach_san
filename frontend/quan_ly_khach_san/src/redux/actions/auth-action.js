import authTypes from "../types/auth-type";
import authService from "../../services/auth-service";
import { ACCESS_TOKEN } from "../../constants";

export const doLogin = (authRequest) => async (dispatch) => {
  try {
    const authResponse = await authService.doLogin(authRequest);
    Promise.resolve(
      localStorage.setItem(ACCESS_TOKEN, authResponse.data.accessToken),

      dispatch({
        type: authTypes.LOGIN_ACTION,
        payload: {
          apiResponse: {
            success: true,
            message: "Successfully.",
          },
          authResponse: authResponse.data,
        },
      })
    );
  } catch (error) {
    dispatch({
      type: authTypes.ERROR_ACTION,
      payload: {
        success: false,
        message: error.message,
      },
    });
  }
};

export const doLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  return {
    type: authTypes.LOGOUT_ACTION,
    payload: {
      apiResponse: null,
      authResponse: null,
    },
  };
};
