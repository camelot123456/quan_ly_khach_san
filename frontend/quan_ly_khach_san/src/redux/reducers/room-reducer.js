import roomTypes from "../types/room-type";

const initialState = {
  apiResponse: null,
  roomsChecked: [],
  rooms: [],
  room: {},
  pagedInfo: {},
  servicesInvoice: [],
};

const roomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case roomTypes.SHOW_ROOMS_ACTION:
      return {
        ...state,
        rooms: payload.rooms,
        pagedInfo: payload.paged,
        apiResponse: payload.apiResponse,
      };
    case roomTypes.SHOW_ROOM_DETAILS_ACTION:
      return {
        ...state,
        room: payload.room,
        servicesInvoice: payload.servicesInvoice,
      };
    case roomTypes.CHECK_ROOM_EMPTY_ACTION:
      return {
        ...state,
        roomsChecked: payload.roomsChecked,
        apiResponse: payload.apiResponse,
      };
    case roomTypes.ERROR_ACTION:
      return {
        ...state,
        rooms: payload.rooms,
        apiResponse: payload.apiResponse,
      };

    default:
      return state;
  }
};

export default roomReducer;
