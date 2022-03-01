import roomService from '../../services/room-service'
import roomTypes from '../types/room-type'

export const doShowRooms = () => async (dispatch) => {
    try {
        const roomResponse = await roomService.doShowRooms()

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