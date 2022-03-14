import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doFindAccountByIdEmailPhoneNum = (keyword) => {
    return httpCommon().get(`${URL_BASE}/api/admin/accounts?keyword=${keyword}`)
}

const showPagedByType = (pagedRequest) => {
    return httpCommon().get(`${URL_BASE}/api/admin/accounts/${pagedRequest.type}/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`)
}

export default {doFindAccountByIdEmailPhoneNum, showPagedByType}