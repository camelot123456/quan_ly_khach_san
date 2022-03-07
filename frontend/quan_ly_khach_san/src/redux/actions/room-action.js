import roomService from '../../services/room-service'
import roomTypes from '../types/room-type'

export const doShowRoomsAdmin = () => async (dispatch) => {
    try {
        const roomResponse = await roomService.doShowRoomsAdmin()

        dispatch({
            type: roomTypes.SHOW_ROOMS_ACTION,
            payload: {
                apiResponse: {
                    success: true,
                    message: "Successfully.",
                },
                paged: roomResponse.data.paged,
                rooms: roomResponse.data.rooms
            }
        })
    } catch (error) {
        dispatch({
            type: roomTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
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
                servicesInvoice: roomResponse.data.services
            }
        })
    } catch (error) {
        dispatch({
            type: roomTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                },
                room: {},
                services: []
            }
        })
    }
}

export const doCheckRoomEmpty = (apiRequest) => async (dispatch) => {
    try {
        const roomsResponse = await roomService.doCheckRoomEmpty(apiRequest)
        dispatch({
            type: roomTypes.CHECK_ROOM_EMPTY_ACTION,
            payload: {
                apiResponse: roomsResponse.data.apiResponse,
                roomsChecked: roomsResponse.data.rooms
            }
        })
    } catch (error) {
        dispatch({
            type: roomTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                },
                rooms: []
            }
        })
    }
}
