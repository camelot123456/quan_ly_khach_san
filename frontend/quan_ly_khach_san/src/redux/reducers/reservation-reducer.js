import reservationTypes from "../types/reservation-type";

const initialState = {
  reservation: {},
  reservationTransaction: {
    reservation: {},
    rooms: [],
    services: []
  },
  reservations: [],
  rooms: [],
  services: [],
};

const reservationReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case reservationTypes.CREATE_RESERVATION_ACTION:
      var rooms = {...state.rooms}
      var services = {...state.services}
      rooms = []
      services = []
      return {
        ...state,
        rooms: rooms,
        services: services
      };

    case reservationTypes.ERROR_CREATE_RESERVATION_ACTION:
      var rooms = {...state.rooms}
      var services = {...state.services}
      rooms = []
      services = []
      return {
        ...state,
        rooms: rooms,
        services: services
      };

    case reservationTypes.CANCEL_BY_ID_ACTION:
      return {
        ...state
      };
    
    case reservationTypes.ERROR_CANCEL_BY_ID_ACTION:
      return {
        ...state
      };

    case reservationTypes.FIND_FOR_TRANSACTION_ACTION:
      var reservationTransaction = {...state.reservationTransaction}
      reservationTransaction = payload.reservation
      return {
        ...state,
        reservationTransaction: reservationTransaction,
      };

    case reservationTypes.ERROR_FIND_FOR_TRANSACTION_ACTION:
      return {
        ...state
      };

    case reservationTypes.SET_ROOMS_ID_ACTION:
      const stateRoomNew = { ...state };
      if (stateRoomNew.rooms.every((room) => room != payload)) {
        stateRoomNew.rooms.push(payload);
      } else if (stateRoomNew.rooms.some((room) => room == payload)) {
        stateRoomNew.rooms.splice(stateRoomNew.rooms.indexOf(payload), 1);
      }
      return stateRoomNew;

    case reservationTypes.SET_SERVICES_ACTION:
      const stateServiceNew = { ...state };
      if (
        stateServiceNew.services.every((service) => service.id != payload.id)
      ) {
        stateServiceNew.services.push(payload);
      } else if (
        stateServiceNew.services.some((service) => service.id == payload.id)
      ) {
        stateServiceNew.services.forEach((service, index) => {
          if (service.id == payload.id) {
            if (payload.quantity == 0) {
              stateServiceNew.services.splice(index, 1);
            } else {
              stateServiceNew.services.splice(index, 1, payload);
            }
          }
        });
      }
      return stateServiceNew;
    
      case reservationTypes.ERROR_ACTION:
        var apiResponseNew = {...state.apiResponse}
        apiResponseNew = payload.apiResponse
        return {
          ...state,
          apiResponse: apiResponseNew,
        }
    default:
      return state;
  }
};

export default reservationReducer;
