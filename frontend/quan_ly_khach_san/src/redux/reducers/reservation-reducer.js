import reservationTypes from "../types/reservation-type";

const initialState = {
  reservation: {},
  reservationTransaction: {
    reservation: {},
    rooms: [],
    services: [],
  },
  reservations: [],
  rooms: [],
  services: [],
};

const reservationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case reservationTypes.CREATE_RESERVATION_ACTION:
      var rooms = { ...state.rooms };
      var services = { ...state.services };
      rooms = [];
      services = [];
      return {
        ...state,
        rooms: rooms,
        services: services,
      };

    case reservationTypes.ERROR_CREATE_RESERVATION_ACTION:
      var rooms = { ...state.rooms };
      var services = { ...state.services };
      rooms = [];
      services = [];
      return {
        ...state,
        rooms: rooms,
        services: services,
      };

    case reservationTypes.CANCEL_BY_ID_ACTION:
      return {
        ...state,
      };

    case reservationTypes.ERROR_CANCEL_BY_ID_ACTION:
      return {
        ...state,
      };

    case reservationTypes.FIND_FOR_TRANSACTION_ACTION:
      var reservationTransaction = { ...state.reservationTransaction };
      reservationTransaction = payload.reservationTransaction;
      return {
        ...state,
        reservationTransaction: reservationTransaction,
      };

    case reservationTypes.ERROR_FIND_FOR_TRANSACTION_ACTION:
      return {
        ...state,
      };

    case reservationTypes.SET_ROOMS_ID_ACTION:
      var rooms = [...state.rooms];
      if (rooms.every((room) => room != payload)) {
        rooms.push(payload);
      } else if (rooms.some((room) => room == payload)) {
        rooms.splice(rooms.indexOf(payload), 1);
      }
      return {
        ...state,
        rooms: rooms,
      };

    case reservationTypes.SET_SERVICES_ACTION:
      var services = [...state.services];
      if (services.some((service) => service.id == payload.id)) {
        services.forEach((service, index) => {
          if (service.id == payload.id) {
            if (payload.quantity == "0") {
              services.splice(index, 1);
            } else {
              services.splice(index, 1, payload);
            }
          }
        });
      } else {
        services.push(payload);
      }
      return {
        ...state,
        services: services,
      };

    case reservationTypes.ERROR_ACTION:
      var apiResponseNew = { ...state.apiResponse };
      apiResponseNew = payload.apiResponse;
      return {
        ...state,
        apiResponse: apiResponseNew,
      };

    case reservationTypes.RESET_RESERVATION_ROOM:
      var rooms = { ...state.rooms };
      var services = { ...state.services };
      services = [];
      rooms = [];
      return {
        ...state,
        rooms: rooms,
        services: services,
      };
    default:
      return state;
  }
};

export default reservationReducer;
