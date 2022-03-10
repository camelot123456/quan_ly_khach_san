import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const getTransactions = (pagedRequest) => {
    return httpCommon().get(`${URL_BASE}/api/admin/transactions/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`)
}

const doCreateTransaction = (idReservation) => {
    return httpCommon().post(`${URL_BASE}/api/admin/transactions/payment`, idReservation)
}

export default {getTransactions, doCreateTransaction}