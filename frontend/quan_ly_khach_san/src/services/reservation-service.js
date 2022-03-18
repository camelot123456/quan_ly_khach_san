import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doCreateReservation = (apiRequest) => {
    return httpCommon().post(`${URL_BASE}/api/admin/reservations/create`, apiRequest)
}

const doCancelById = (dataRequest) => {
    return httpCommon().delete(`${URL_BASE}/api/admin/reservations/delete`, {data: dataRequest})
}

const doFindForTransaction = (idReservation) => {
    return httpCommon().get(`${URL_BASE}/api/admin/reservations/findForTransaction?idReservation=${idReservation}`)
}

const doCheckoutRoomReservation = (dataRequest) => {
    return httpCommon().delete(`${URL_BASE}/api/admin/reservations/checkout`, {data: dataRequest})
}

export default { doCreateReservation, doCancelById, doFindForTransaction , doCheckoutRoomReservation}