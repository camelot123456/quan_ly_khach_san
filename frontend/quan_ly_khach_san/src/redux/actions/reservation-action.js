import reservationTypes from '../types/reservation-type'
import reservationService from '../../services/reservation-service'

export const doCreateReservation = (apiRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        reservationService.doCreateReservation(apiRequest)
        .then(res => {
            dispatch({
                type: reservationTypes.CREATE_RESERVATION_ACTION
            })
            resolve()
        })
        .catch(err => {
            dispatch({
                type: reservationTypes.ERROR_CREATE_RESERVATION_ACTION
            })
            reject()
        })
    })
}

export const doCancelById = (dataRequest) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        reservationService.doCancelById(dataRequest)
        .then(res => {
            dispatch({
                type: reservationTypes.CANCEL_BY_ID_ACTION
            })
            resolve()
        })
        .catch(err => {
            dispatch({
                type: reservationTypes.ERROR_CANCEL_BY_ID_ACTION
            })
            reject()
        })
    })
}

export const doFindForTransaction = (idReservation) => (dispatch) => {
    return new Promise((resolve, reject) => {
        reservationService.doFindForTransaction(idReservation)
        .then(res => {
            dispatch({
                type: reservationTypes.FIND_FOR_TRANSACTION_ACTION,
                payload: {
                    reservationTransaction: res.data
                }
            })
            resolve()
        })
        .catch(err => {
            reject()         
        })
    })
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