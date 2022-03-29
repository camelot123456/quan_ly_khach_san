import {httpCommon, httpFormDataCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doFindAll = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/services/room-reservation`)
}

const showServiceList = (pagedRequest) => {
    return httpCommon().get(`${URL_BASE}/api/admin/services/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`)
}

const doCreateService = (payload) => {
    return httpFormDataCommon().post(`${URL_BASE}/api/admin/services/create`, payload)
}

const doDeleteService = (payload) => {
    return httpCommon().delete(`${URL_BASE}/api/admin/services/delete`, {data: payload})
}

export default {doFindAll, showServiceList, doCreateService, doDeleteService}