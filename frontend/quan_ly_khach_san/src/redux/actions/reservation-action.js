import reservationTypes from '../types/reservation-type'
import reservationService from '../../services/reservation-service'

export const doCreateReservation = (apiRequest) => async (dispatch) => {
    try {
        const reservationResponse = await reservationService.doCreateReservation(apiRequest)
        dispatch({
            type: reservationTypes.CREATE_RESERVATION_ACTION,
            payload: {
                apiResponse: reservationResponse.data.apiResponse
            }
        })
    } catch (error) {
        dispatch({
            type: reservationTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}

export const doCancelById = (dataRequest) => async (dispatch) => {
    try {
        
        const reservationResponse = await reservationService.doCancelById(dataRequest)
        dispatch({
            type: reservationTypes.CANCEL_BY_ID_ACTION,
            payload: {
                apiResponse: reservationResponse.data.apiResponse
            }
        })
    } catch (error) {
        dispatch({
            type: reservationTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}

export const doSetRoomsId = (idRoom) => {
    return {
        type: reservationTypes.SET_ROOMS_ID_ACTION,
        payload: idRoom
    }
}

export const doSetServices = (service) => {
    return {
        type: reservationTypes.SET_SERVICES_ACTION,
        payload: service
    }
}