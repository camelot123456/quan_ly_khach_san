import roleService from "../../services/role-service";
import roleTypes from "../../redux/types/role-type";

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