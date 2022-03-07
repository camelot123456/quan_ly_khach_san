import {httpCommon} from '../commons/http-common'
import { URL_BASE } from '../constants'

const doShowRoomsAdmin = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/rooms`)
}

const doShowRoomDetailAdmin = (apiRequest) => {
    return httpCommon().get(`${URL_BASE}/api/admin/rooms/${apiRequest.idRoom}?idTransaction=${apiRequest.idTransaction}`)
}

const doCheckRoomEmpty = (apiResponse) => {
    return httpCommon().post(`${URL_BASE}/api/admin/rooms/checked`, apiResponse)
}

export default {doShowRoomsAdmin, doShowRoomDetailAdmin, doCheckRoomEmpty}