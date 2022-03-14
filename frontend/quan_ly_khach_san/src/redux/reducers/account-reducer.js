import accountType from "../types/account-type";

const initialState = {
    account: {},
    accounts: [],
    paged: {}
}

const accountReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        
        case accountType.FIND_BY_ID_EMAIL_PHONENUM_ACCOUNT:
            var account = {...state.account}
            account = payload.account
            return {
                ...state,
                account: payload.account
            }

        case accountType.SHOW_PAGE_BY_TYPE:
            var accounts = {...state.accounts}
            var paged = {...state.paged}
            accounts = payload.accounts
            paged = payload.paged
            return {
                ...state,
                paged: paged,
                accounts: accounts
            }

        default:
            return state
    }
}

export default accountReducer