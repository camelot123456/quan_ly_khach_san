import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doCreateReservation = (apiRequest) => {
    return httpCommon().post(`${URL_BASE}/api/admin/reservations/create`, apiRequest)
}

const doCancelById = (dataRequest) => {
    return httpCommon().delete(`${URL_BASE}/api/admin/reservations/delete`, {data: dataRequest})
}

const doPaymentById = (idReservation) => {
    return httpCommon().post(`${URL_BASE}/api/admin/reservations/payment`, idReservation)
}

export default { doCreateReservation, doCancelById }