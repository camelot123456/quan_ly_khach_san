import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doShowRoomtypeList = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/roomtypes`)
}

const doFindRoomtypeById = (idRoomtype) => {
    return httpCommon().get(`${URL_BASE}/api/admin/roomtypes/${idRoomtype}`)
}

const doShowRoomtypeByAvatarStateList = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/roomtypes/avatar-state`)
}

export default {doShowRoomtypeList, doFindRoomtypeById, doShowRoomtypeByAvatarStateList}