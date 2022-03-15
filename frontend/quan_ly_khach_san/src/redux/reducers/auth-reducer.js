import authTypes from "../types/auth-type";

const initialState = {
  apiResponse: {},
  authResponse: {}
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN_ACTION:
      var authResponse = {...state.authResponse}
      authResponse = payload.authResponse
      return {
        ...state,
        authResponse: authResponse
      };

    case authTypes.ERROR_ACTION:
      return {
        ...state,
        authResponse: payload.authResponse,
        apiResponse: payload.authResponse,
      };
    case authTypes.LOGOUT_ACTION:
      var authResponse = {...state.authResponse}
      authResponse = {}
      return {
        ...state,
        authResponse: authResponse
      };
    default:
      return state;
  }
};

export default authReducer;
