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

export const doCreateRoomtype = (dataRequest) => async (dispatch) => {
    try {
        await roomtypeService.doCreateRoomtype(dataRequest);
        dispatch({
            type: roomtypeTypes.CREATE_ROOMTYPE_ACTION,
            payload: {
                apiResponse: {
                    success: true,
                    message: "Thêm mới loại phòng thành công."
                },
                roomtype: dataRequest
            }
        })
    } catch (error) {
        dispatch({
            type: roomtypeTypes.ERROR_ACTION,
            payload: {
                message: "Thêm mới loại phòng thất bại.",
                success: false
            }
        })
    }
}

export const doUpdateRoomtype = (dataRequest) => async (dispatch) => {
    try {
        await roomtypeService.doUpdateRoomtype(dataRequest);
        dispatch({
            type: roomtypeTypes.UPDATE_ROOMTYPE_ACTION,
            payload: {
                apiResponse: {
                    success: true,
                    message: "Cập nhập loại phòng thành công."
                },
                roomtype: dataRequest
            }
        })
    } catch (error) {
        dispatch({
            type: roomtypeTypes.ERROR_ACTION,
            payload: {
                message: "Cập nhập loại phòng thất bại.",
                success: false
            }
        })
    }
}

export const doDeleteRoomtypeById = (idRoomtype) => async (dispatch) => {
    try {
        await roomtypeService.doDeleteRoomtypeById(idRoomtype);
        dispatch({
            type: roomtypeTypes.DELETE_ROOMTYPE_BY_ID_ACTION,
            payload: {
                apiResponse: {
                    success: true,
                    message: "Xóa loại phòng thành công."
                },
                roomtype: {
                    id: idRoomtype
                }
            }
        })
    } catch (error) {
        dispatch({
            type: roomtypeTypes.ERROR_ACTION,
            payload: {
                message: "Xóa loại phòng thất bại.",
                success: false
            }
        })
    }
}