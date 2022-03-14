import roomtypeTypes from "../types/roomtype-type";

const initialState = {
  roomtypes: [],
  paged: {},
  roomtype: {},
};

const roomtypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case roomtypeTypes.SHOW_ROOMTYPE_LIST_ACTION:
      var roomtypes = {...state.roomtypes}
      var paged = {...state.paged}
      roomtypes = payload.roomtypes
      paged = payload.paged
      return {
        ...state,
        roomtypes: roomtypes ,
        paged: paged,
      };

    case roomtypeTypes.FIND_ROOMTYPE_BY_ID_ACTION:
      var roomtype = {...state.roomtypes}
      roomtype = payload.roomtype
      return {
        ...state,
        roomtype: payload.roomtype,
      };

    case roomtypeTypes.SHOW_ROOMTYPE_BY_AVATAR_STATE_LIST_ACTION:
      var roomtypes = {...state.roomtypes}
      roomtypes = payload.roomtypes
      return {
        ...state,
        roomtypes: roomtypes
      };
      
    default:
      return state;
  }
};

export default roomtypeReducer;
