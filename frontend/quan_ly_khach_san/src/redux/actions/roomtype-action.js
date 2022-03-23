import roomtypeService from "../../services/roomtype-service";
import roomtypeTypes from '../types/roomtype-type'

export const doShowRoomtypeList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomtypeService.doShowRoomtypeList()
        .then((res) => {
            dispatch({
                type: roomtypeTypes.SHOW_ROOMTYPE_LIST_ACTION,
                payload: {
                    roomtypes: res.data.roomtypes,
                    paged: res.data.paged,
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const doFindRoomtypeById = (idRoomtype) => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomtypeService.doFindRoomtypeById(idRoomtype)
        .then((res) => {
            dispatch({
                type: roomtypeTypes.FIND_ROOMTYPE_BY_ID_ACTION,
                payload: {
                    roomtype: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const doShowRoomtypeByAvatarStateList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomtypeService.doShowRoomtypeByAvatarStateList()
        .then((res) => {
            dispatch({
                type: roomtypeTypes.SHOW_ROOMTYPE_BY_AVATAR_STATE_LIST_ACTION,
                payload: {
                    roomtypes: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const doCreateRoomtype = (dataRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomtypeService.doCreateRoomtype(dataRequest)
        .then((res) => {
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const doUpdateRoomtype = (dataRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        roomtypeService.doUpdateRoomtype(dataRequest)
        .then((res) => {
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const doDeleteRoomtypeById = (idRoomtype) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        roomtypeService.doDeleteRoomtypeById(idRoomtype)
        .then((res) => {
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}


export const showRoomtypePublic = (pagedRequest) => (dispatch) => {
    
    return new Promise((resolve, reject) => {
        roomtypeService.showRoomtypePublic(pagedRequest)
        .then((res) => {
            dispatch({
                type: roomtypeTypes.SHOW_ROOMTYPE_PUBLIC,
                payload: {
                    roomtypes: res.data.roomTypes,
                    paged: res.data.paged,
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}