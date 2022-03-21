import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants'

const showRoles = () => {
    return httpCommon().get(`${URL_BASE}/api/admin/roles`)
}


const showRoleByCode = (code) => {
    return httpCommon().get(`${URL_BASE}/api/admin/roles/roleByCode?code=${code}`)
}

const showRoleByIdAccount = (idAccount) => {
    return httpCommon().get(`${URL_BASE}/api/admin/roles/roleByIdAccount?idAccount=${idAccount}`)
}

export default {showRoles, showRoleByCode, showRoleByIdAccount}