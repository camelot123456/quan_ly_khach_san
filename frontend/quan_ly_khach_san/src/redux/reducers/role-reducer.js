import roleType from "../types/role-type";

const initialState = {
    role: {},
    roles: []
}

const roleReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case roleType.SHOW_ROLE_LIST_BY_CODE:
            var roles = {...state.roles}
            roles = payload.roles
            return {
                ...state,
                roles: roles
            }
    
        default:
            return state
    }
}

export default roleReducer