import roomtypeTypes from "../types/roomtype-type";

const initialState = {
  apiResponse: null,
  roomtypes: [],
  paged: {},
  roomtype: {},
};

const roomtypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case roomtypeTypes.SHOW_ROOMTYPE_LIST_ACTION:
      return {
        ...state,
        apiResponse: payload.apiResponse,
        roomtypes: payload.roomtypes,
        paged: payload.paged,
      };
    case roomtypeTypes.FIND_ROOMTYPE_BY_ID_ACTION:
      return {
        ...state,
        apiResponse: payload.apiResponse,
        roomtype: payload.roomtype,
      };
    case roomtypeTypes.SHOW_ROOMTYPE_BY_AVATAR_STATE_LIST_ACTION:
      return {
        ...state,
        apiResponse: payload.apiResponse,
        roomtypes: payload.roomtypes,
      };
    default:
      return state;
  }
};

export default roomtypeReducer;
