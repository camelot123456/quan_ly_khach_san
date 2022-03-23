import roomService from '../../services/room-service'
import roomTypes from '../types/room-type'

export const findAll = (pagedRequest) => async (dispatch) => {
    try {
        const roomResponse = await roomService.findAll(pagedRequest)

        dispatch({
            type: roomTypes.FIND_ALL_ACTION,
            payload: {
                paged: roomResponse.data.paged,
                rooms: roomResponse.data.rooms
            }
        })
    } catch (error) {
        dispatch({
            type: roomTypes.ERROR_FIND_ALL_ACTION,
            payload: {
                response: {
                    success: false,
                    message: error.message,
                }                                                                       
            }
        })
    }
}

export const doShowRoomsAdmin = (pagedRequest) => async (dispatch) => {
    try {
        const roomResponse = await roomService.doShowRoomsAdmin(pagedRequest)
        dispatch({
            type: roomTypes.SHOW_ROOMS_ACTION,
            payload: {
                paged: roomResponse.data.paged,
                rooms: roomResponse.data.rooms
            }
        })
    } catch (error) {
        
        dispatch({
            type: roomTypes.ERROR_SHOW_ROOMS_ACTION,
            payload: {
                response: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}

export const doShowRoomDetailAdmin = (apiRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomService.doShowRoomDetailAdmin(apiRequest)
        .then((response) => {
            dispatch({
                type: roomTypes.SHOW_ROOM_DETAILS_ACTION,
                payload: {
                    room: response.data.room,
                    services: response.data.services
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const doSaveRoom = (dataRequest) => dispatch => {
    return new Promise((resolve, reject) => {
        roomService.doSaveRoom(dataRequest)
        .then((response) => {
            resolve()
        })
        .catch((error) => {
            reject()
        })
    })
}

export const doUpdateRoom = (dataRequest) => dispatch => {
    return new Promise((resolve, reject) => {
        roomService.doUpdateRoom(dataRequest)
        .then((response) => {
            resolve()
        })
        .catch((error) => {
            reject()
        })
    })
}

export const doDeleteRoom = (dataRequest) => dispatch => {
    return new Promise((resolve, reject) => {
        roomService.doDeleteRoom(dataRequest)
        .then((response) => {
            resolve()
        })
        .catch((error) => {
            reject()
        })
    })
}

export const doCheckRoomEmpty = (apiRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomService.doCheckRoomEmpty(apiRequest)
        .then(res => {
            dispatch({
                type: roomTypes.CHECK_ROOM_EMPTY_ACTION,
                payload: {
                    rooms: res.data.rooms
                }
            })
            resolve()
        })
        .catch(err => reject(err))
    })
}
