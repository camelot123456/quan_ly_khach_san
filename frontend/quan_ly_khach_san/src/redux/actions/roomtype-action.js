import roomtypeService from "../../services/roomtype-service";
import roomtypeTypes from '../types/roomtype-type'

export const doShowRoomtypeList = () => async (dispatch) => {
    try {
        const roomtypeResponse = await roomtypeService.doShowRoomtypeList();
        dispatch({
            type: roomtypeTypes.SHOW_ROOMTYPE_LIST_ACTION,
            payload: {
                roomtypes: roomtypeResponse.data.roomtypes,
                paged: roomtypeResponse.data.paged,
                apiResponse: {
                    success: true,
                    message: "Successfully."
                }
            }
        })
    } catch (error) {
        dispatch({
            type: roomtypeTypes.ERROR_ACTION,
            payload: {
                message: error.message,
                success: false
            }
        })
    }
}

export const doFindRoomtypeById = (idRoomtype) => async (dispatch) => {
    try {
        const roomtypeResponse = await roomtypeService.doFindRoomtypeById(idRoomtype);
        dispatch({
            type: roomtypeTypes.FIND_ROOMTYPE_BY_ID_ACTION,
            payload: {
                roomtype: roomtypeResponse.data.roomtype,
                apiResponse: {
                    success: true,
                    message: "Successfully."
                }
            }
        })
    } catch (error) {
        dispatch({
            type: roomtypeTypes.ERROR_ACTION,
            payload: {
                message: error.message,
                success: false
            }
        })
    }
}

export const doShowRoomtypeByAvatarStateList = () => async (dispatch) => {
    try {
        const roomtypeResponse = await roomtypeService.doShowRoomtypeByAvatarStateList();
        dispatch({
            type: roomtypeTypes.SHOW_ROOMTYPE_BY_AVATAR_STATE_LIST_ACTION,
            payload: {
                roomtypes: roomtypeResponse.data,
                apiResponse: {
                    success: true,
                    message: "Successfully."
                }
            }
        })
    } catch (error) {
        dispatch({
            type: roomtypeTypes.ERROR_ACTION,
            payload: {
                message: error.message,
                success: false
            }
        })
    }
}