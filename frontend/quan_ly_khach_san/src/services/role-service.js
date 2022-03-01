import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doShowRoles = () => {
    return httpCommon().get(`${URL_BASE}/api/roles`)
}

export default {doShowRoles}