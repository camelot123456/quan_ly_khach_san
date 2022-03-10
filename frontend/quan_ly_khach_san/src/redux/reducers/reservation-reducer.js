import reservationTypes from "../types/reservation-type";

const initialState = {
  apiResponse: {},
  reservation: {},
  reservations: [],
  rooms: [],
  services: [],
};

const reservationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case reservationTypes.CREATE_RESERVATION_ACTION:
      return {
        ...state,
        apiResponse: payload.apiResponse,
      };

    case reservationTypes.CANCEL_BY_ID_ACTION:
      return {
        ...state,
        apiResponse: payload.apiResponse,
      };

    case reservationTypes.FIND_FOR_RESERVATION:
      return {
        ...state,
        reservation: payload.reservation,
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
    default:
      return state;
  }
};

export default reservationReducer;
