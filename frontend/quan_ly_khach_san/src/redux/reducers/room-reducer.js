import roomTypes from "../types/room-type";

const initialState = {
  room: {},
  roomsState: [],
  rooms: [],
  paged: {},
  pagedState: {}
};

const roomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case roomTypes.FIND_ALL_ACTION:
      var rooms = {...state.rooms}
      var paged = {...state.paged}
      rooms = payload.rooms
      paged = payload.paged
      return {
        ...state,
        rooms: rooms,
        paged: paged
      };
    
    case roomTypes.ERROR_FIND_ALL_ACTION:
      var rooms = {...state.rooms}
      var paged = {...state.paged}
      rooms = []
      paged = {}
      return {
        ...state,
        rooms: rooms,
        paged: paged
      };


    case roomTypes.SHOW_ROOMS_ACTION:
      var roomsState = {...state.roomsState}
      var pagedState = {...state.pagedState}
      roomsState = payload.rooms
      pagedState = payload.paged
      return {
        ...state,
        roomsState: roomsState,
        pagedState: pagedState
      };
    
    case roomTypes.ERROR_SHOW_ROOMS_ACTION:
      var roomsState = {...state.roomsState}
      var pagedState = {...state.pagedState}
      roomsState = []
      pagedState = {}
      return {
        ...state,
        roomsState: roomsState,
        pagedState: pagedState
      };

    case roomTypes.SHOW_ROOM_DETAILS_ACTION:
      var room = {...state.room}
      var services = {...state.services}
      room = payload.room
      services = payload.services
      return {
        ...state,
        room: room,
        services: services
      };
    
    case roomTypes.ERROR_SHOW_ROOM_DETAILS_ACTION:
      var room = {...state.room}
      var services = {...state.services}
      room = {}
      services = []
      return {
        ...state,
        room: room,
        services: services
      };

    case roomTypes.CHECK_ROOM_EMPTY_ACTION:
      var rooms = {...state.rooms}
      rooms = payload.rooms
      return {
        ...state,
        rooms: rooms
      };

    case roomTypes.ERROR_CHECK_ROOM_EMPTY_ACTION:
      var rooms = {...state.rooms}
      rooms = []
      return {
        ...state,
        rooms: rooms
      };

    default:
      return state;
  }
};

export default roomReducer;
