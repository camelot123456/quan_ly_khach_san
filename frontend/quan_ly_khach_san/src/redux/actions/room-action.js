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

export const doShowRoomDetailAdmin = (apiRequest) => async (dispatch) => {
    try {
        const roomResponse = await roomService.doShowRoomDetailAdmin(apiRequest)

        dispatch({
            type: roomTypes.SHOW_ROOM_DETAILS_ACTION,
            payload: {
                room: roomResponse.data.room,
                services: roomResponse.data.services
            }
        })
    } catch (error) {
        dispatch({
            type: roomTypes.ERROR_SHOW_ROOM_DETAILS_ACTION,
            payload: {
                response: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
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

export const doCheckRoomEmpty = (apiRequest) => async (dispatch) => {
    try {
        const roomsResponse = await roomService.doCheckRoomEmpty(apiRequest)
        dispatch({
            type: roomTypes.CHECK_ROOM_EMPTY_ACTION,
            payload: {
                rooms: roomsResponse.data.rooms
            }
        })
    } catch (error) {
        dispatch({
            type: roomTypes.ERROR_CHECK_ROOM_EMPTY_ACTION,
            payload: {
                response: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}
