import reservationTypes from '../types/reservation-type'
import reservationService from '../../services/reservation-service'

export const doCreateReservation = (apiRequest) => async (dispatch) => {
    try {
        await reservationService.doCreateReservation(apiRequest)
        dispatch({
            type: reservationTypes.CREATE_RESERVATION_ACTION,
            payload: {
                apiResponse: {
                    success: true,
                    message: "Đã tạo phiếu đặt phòng thành công.",
                },
                rooms: [],
                services: []
            }
        })
    } catch (error) {
        dispatch({
            type: reservationTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: "Thêm phiếu đặt phòng thất bại.",
                }
            }
        })
    }
}

export const doCancelById = (dataRequest) => async (dispatch) => {
    try {
        
        await reservationService.doCancelById(dataRequest)
        dispatch({
            type: reservationTypes.CANCEL_BY_ID_ACTION,
            payload: {
                apiResponse: {
                    success: true,
                    message: 'Đã hủy thành công phiếu đặt phòng này.'
                }
            }
        })
    } catch (error) {
        dispatch({
            type: reservationTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: 'Hủy thất bại phiếu đặt phòng này.'
                }
            }
        })
    }
}

export const doFindForTransaction = (idReservation) => async (dispatch) => {
    try {
        const reservationResponse = await reservationService.doFindForTransaction(idReservation)
        dispatch({
            type: reservationTypes.FIND_FOR_TRANSACTION_ACTION,
            payload: {
                reservation: reservationResponse.data
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