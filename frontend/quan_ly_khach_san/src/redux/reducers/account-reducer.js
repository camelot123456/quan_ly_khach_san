import accountType from "../types/account-type";

const initialState = {
    accountCustomerNoAccount: {},
    accountCustomerNoAccountArr: [],
    pagedCustomerNoAccount: {},

    accountCustomerAccount: {},
    accountCustomerAccountArr: [],
    pagedCustomerAccount: {},

    accountInternal: {},
    accountInternalArr: [],
    pagedInternal: {},

    accountAll: {},
    accountAllArr: [],
    pagedAll: {},

    account: {},

    myAccount: {},
    myAccountTransaction: [],
    myAccountReservation: []

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

        case accountType.SHOW_CUSTOMER_NO_ACCOUNT:
            var accountCustomerNoAccountArr = {...state.accountCustomerNoAccountArr}
            var pagedCustomerNoAccount = {...state.pagedCustomerNoAccount}
            accountCustomerNoAccountArr = payload.accountCustomerNoAccountArr
            pagedCustomerNoAccount = payload.pagedCustomerNoAccount
            return {
                ...state,
                accountCustomerNoAccountArr: accountCustomerNoAccountArr,
                pagedCustomerNoAccount: pagedCustomerNoAccount
            }

        case accountType.SHOW_CUSTOMER_ACCOUNT:
            var accountCustomerAccountArr = {...state.accountCustomerAccountArr}
            var pagedCustomerAccount = {...state.pagedCustomerAccount}
            accountCustomerAccountArr = payload.accountCustomerAccountArr
            pagedCustomerAccount = payload.pagedCustomerAccount
            return {
                ...state,
                accountCustomerAccountArr: accountCustomerAccountArr,
                pagedCustomerAccount: pagedCustomerAccount
            }
        
        case accountType.SHOW_INTERNAL_ACCOUNT:
            var accountInternalArr = {...state.accountInternalArr}
            var pagedInternal = {...state.pagedInternal}
            accountInternalArr = payload.accountInternalArr
            pagedInternal = payload.pagedInternal
            return {
                ...state,
                accountInternalArr: accountInternalArr,
                pagedInternal: pagedInternal
            }

        case accountType.SHOW_ACCOUNT_ALL:
            var accountAllArr = {...state.accountAllArr}
            var pagedAll = {...state.pagedAll}
            accountAllArr = payload.accountAllArr
            pagedAll = payload.pagedAll
            return {
                ...state,
                accountAllArr: accountAllArr,
                pagedAll: pagedAll
            }

        case accountType.SHOW_MY_ACCOUNT:
            var myAccount = {...state.myAccount}
            var myAccountTransaction = {...state.myAccountTransaction}
            var myAccountReservation = {...state.myAccountReservation}
            myAccount = payload.myAccount
            myAccountTransaction = payload.myAccountTransaction
            myAccountReservation = payload.myAccountReservation
            return {
                ...state,
                myAccount,
                myAccountTransaction,
                myAccountReservation
            }

        default:
            return state
    }
}

export default accountReducer