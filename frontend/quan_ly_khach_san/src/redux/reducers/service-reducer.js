import serviceTypes from "../types/service-type";

const initialState = {
    services: [],
    service: {},
    apiResponse: {}
}

const serviceReducer = (state = initialState, { type, payload}) => {

    switch (type) {
        case serviceTypes.FIND_ALL_ACTION:
            return {
                ...state,
                services: payload.services,
                apiResponse: payload.apiResponse
            }
        default:
            return state;
    }

}

export default serviceReducer;