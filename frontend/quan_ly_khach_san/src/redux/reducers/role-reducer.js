import roleType from "../types/role-type";

const initialState = {
    role: {},
    roles: [],
    rolesActive: []
}

const roleReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case roleType.SHOW_ROLE_LIST_ACTION:
            var roles = {...state.roles}
            roles = payload.roles
            return {
                ...state,
                roles: roles
            }

        case roleType.SHOW_ROLE_LIST_BY_CODE:
            var roles = {...state.roles}
            roles = payload.roles
            return {
                ...state,
                roles: roles
            }

        case roleType.SHOW_ROLE_LIST_BY_ID_ACCOUNT:
            var rolesActive = {...state.rolesActive}
            rolesActive = payload.rolesActive
            return {
                ...state,
                rolesActive: rolesActive
            }
    
        default:
            return state
    }
}

export default roleReducer