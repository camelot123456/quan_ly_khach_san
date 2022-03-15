import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doFindAccountByIdEmailPhoneNum = (keyword) => {
    return httpCommon().get(`${URL_BASE}/api/admin/accounts?keyword=${keyword}`)
}

const showPagedByType = (pagedRequest) => {
    return httpCommon().get(`${URL_BASE}/api/admin/accounts/${pagedRequest.type}/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`)
}

const doUpdateCustomer = (dataRequest) => {
    return httpCommon().put(`${URL_BASE}/api/admin/accounts/updateCustomer`, dataRequest)
}

const doDeleteCustomer = (dataRequest) => {
    return httpCommon().delete(`${URL_BASE}/api/admin/accounts/deleteCustomer`, {data: dataRequest})
}

export default {doFindAccountByIdEmailPhoneNum, showPagedByType, doUpdateCustomer, doDeleteCustomer}