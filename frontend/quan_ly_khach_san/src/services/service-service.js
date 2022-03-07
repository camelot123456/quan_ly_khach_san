import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doFindAll = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/services/room-reservation`)
}

export default {doFindAll}