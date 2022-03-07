import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doFindAccountByIdEmailPhoneNum = (keyword) => {
    return httpCommon().get(`${URL_BASE}/api/admin/accounts?keyword=${keyword}`)
}

export default {doFindAccountByIdEmailPhoneNum}