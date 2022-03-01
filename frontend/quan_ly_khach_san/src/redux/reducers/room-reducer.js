import roomTypes from "../types/room-type";

const initialState = {
    apiResponse: null,
    rooms: [],
    pagedInfo: {}
}

const roomReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case roomTypes.SHOW_ROOMS_ACTION:
            return {
                ...state,
                rooms: payload.rooms,
                pagedInfo: payload.paged,
                apiResponse: payload.apiResponse
            }
        default:
            return state;
    }
}

export default roomReducer