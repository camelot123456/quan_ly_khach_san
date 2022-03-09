import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doCreateTransaction = (idReservation) => {
    return httpCommon().post(`${URL_BASE}/api/admin/transaction/payment`, idReservation)
}

export default {doCreateTransaction}