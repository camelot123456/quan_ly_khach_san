import roleService from "../../services/role-service";
import roleTypes from "../../redux/types/role-type";

export const showRoles = () => dispatch => {
    return new Promise((resolve, reject) => {
        roleService.showRoles()
        .then((res) => {
            dispatch({
                type: roleTypes.SHOW_ROLE_LIST_ACTION,
                payload: {
                    roles: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const showRoleByCode = (code) => dispatch => {
    return new Promise((resolve, reject) => {
        roleService.showRoleByCode(code)
        .then((res) => {
            dispatch({
                type: roleTypes.SHOW_ROLE_LIST_BY_CODE,
                payload: {
                    roles: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const showRoleByIdAccount = (idAccount) => dispatch => {
    return new Promise((resolve, reject) => {
        roleService.showRoleByIdAccount(idAccount)
        .then((res) => {
            dispatch({
                type: roleTypes.SHOW_ROLE_LIST_BY_ID_ACCOUNT,
                payload: {
                    rolesActive: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}