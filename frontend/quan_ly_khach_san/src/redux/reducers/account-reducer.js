import accountType from "../types/account-type";

const initialState = {
    account: {},
    accounts: [],
    apiResponse: {}
}

const accountReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case accountType.FIND_BY_ID_EMAIL_PHONENUM_ACCOUNT:
            return {
                ...state,
                apiResponse: payload.apiResponse,
                account: payload.account
            }
        default:
            return state
    }
}

export default accountReducer