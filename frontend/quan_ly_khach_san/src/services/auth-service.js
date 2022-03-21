import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doLogin = (loginRequest) => {
    return httpCommon().post(`${URL_BASE}/auth/login`, loginRequest)
}

const doRegister = (registerRequest) => {
    return httpCommon().post(`${URL_BASE}/auth/register`, registerRequest)
}

export default {doLogin, doRegister}