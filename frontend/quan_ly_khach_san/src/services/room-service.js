import {httpCommon} from '../commons/http-common'
import { URL_BASE } from '../constants'

const doShowRooms = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/rooms`)
}

export default {doShowRooms}