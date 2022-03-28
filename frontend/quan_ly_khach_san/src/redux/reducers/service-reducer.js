import serviceTypes from "../types/service-type";

const initialState = {
    services: [],
    service: {},
    paged: {}
}

const serviceReducer = (state = initialState, { type, payload}) => {

    switch (type) {
        case serviceTypes.FIND_ALL_ACTION:
            var services = {...state.services}
            services = payload.services
            return {
                ...state,
                services
            }
        case serviceTypes.FIND_ALL_SERVICES_LIST:
            var services = {...state.services}
            var paged = {...state.paged}
            services = payload.services
            paged = payload.paged
            return {
                ...state,
                services,
                paged
            }
        default:
            return state;
    }

}

export default serviceReducer;