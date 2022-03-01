import authTypes from "../types/auth-type";

const initialState = {
  apiResponse: null,
  authResponse: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_ACTION:
      return {
        ...state,
        authResponse: payload.authResponse,
        apiResponse: payload.apiResponse,
      };
    case authTypes.ERROR_ACTION:
      return {
        ...state,
        authResponse: null,
        apiResponse: payload,
      };
    case authTypes.LOGOUT_ACTION:
      return {
        ...state,
        authResponse: payload.authResponse,
        apiResponse: payload.apiResponse,
      };
    default:
      return state;
  }
};

export default authReducer;
