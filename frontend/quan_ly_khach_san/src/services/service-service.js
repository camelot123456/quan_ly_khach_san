import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doFindAll = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/services/room-reservation`)
}

const showServiceList = (pagedRequest) => {
    console.log(pagedRequest)
    return httpCommon().get(`${URL_BASE}/api/admin/services/page/${pagedRequest.currentPage}?sizePage=${pagedRequest.sizePage}&sortField=${pagedRequest.sortField}&sortDir=${pagedRequest.sortDir}&keyword=${pagedRequest.keyword}`)
}

export default {doFindAll, showServiceList}