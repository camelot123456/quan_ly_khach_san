import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const doShowRoles = () => {
    return httpCommon().get(`${URL_BASE}/api/roles`)
}

const showRoleByCode = (code) => {
    return httpCommon().get(`${URL_BASE}/api/admin/roles?code=${code}`)
}

export default {doShowRoles, showRoleByCode}