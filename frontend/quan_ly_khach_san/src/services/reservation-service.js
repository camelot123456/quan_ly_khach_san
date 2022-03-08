import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doCreateReservation = (apiRequest) => {
    return httpCommon().post(`${URL_BASE}/api/admin/reservations/create`, apiRequest)
}

export default {doCreateReservation}