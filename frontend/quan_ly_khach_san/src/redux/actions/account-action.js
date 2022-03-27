import accountType from '../types/account-type'
import accountService from '../../services/account-service'

export const doFindByIdEmailPhoneNum = (keyword) => (dispatch ) => {
    return new Promise((resolve, reject) => {
        accountService.doFindAccountByIdEmailPhoneNum(keyword)
        .then(res => {
            dispatch({
                type: accountType.FIND_BY_ID_EMAIL_PHONENUM_ACCOUNT,
                payload: {
                    account: res.data
                }
            })
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const showPagedByType = (pagedRequest) => (dispatch ) => {
    return new Promise((resolve, reject) => {
        accountService.showPagedByType(pagedRequest)
        .then(res => {
            if (pagedRequest.type == 'customer_no_account') {
                dispatch({
                    type: accountType.SHOW_CUSTOMER_NO_ACCOUNT,
                    payload: {
                        accountCustomerNoAccountArr: res.data.accounts,
                        pagedCustomerNoAccount: res.data.paged
                    }
                })
            } else if (pagedRequest.type == 'customer_account') {
                dispatch({
                    type: accountType.SHOW_CUSTOMER_ACCOUNT,
                    payload: {
                        accountCustomerAccountArr: res.data.accounts,
                        pagedCustomerAccount: res.data.paged
                    }
                })
            } else if (pagedRequest.type == 'internal_account') {
                dispatch({
                    type: accountType.SHOW_INTERNAL_ACCOUNT,
                    payload: {
                        accountInternalArr: res.data.accounts,
                        pagedInternal: res.data.paged
                    }
                })
            } else {
                dispatch({
                    type: accountType.SHOW_ACCOUNT_ALL,
                    payload: {
                        accountAllArr: res.data.accounts,
                        pagedAll: res.data.paged
                    }
                })
            }
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const doCreateAccountInternal = (dataRequest) => (dispatch ) => {
    return new Promise((resolve, reject) => {
        accountService.doCreateAccountInternal(dataRequest)
        .then(res => {
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const doUpdateCustomer = (dataRequest) => (dispatch ) => {
    return new Promise((resolve, reject) => {
        accountService.doUpdateCustomer(dataRequest)
        .then(res => {
            dispatch({
                type: accountType.DO_UPDATE_CUSTOMER
            })
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const doDeleteCustomer = (dataRequest) => (dispatch ) => {
    return new Promise((resolve, reject) => {
        accountService.doDeleteCustomer(dataRequest)
        .then(res => {
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const showMyAccountByIdAccount = (idAccount) => (dispatch ) => {
    return new Promise((resolve, reject) => {
        accountService.showMyAccountByIdAccount(idAccount)
        .then(res => {
            dispatch({
                type: accountType.SHOW_MY_ACCOUNT,
                payload: {
                    myAccount: res.data.account,
                    myAccountTransaction: res.data.transactions,
                    myAccountReservation: res.data.reservations
                }
            })
            resolve()
        })
        .catch(err => {
            reject()
        })
    })
}

export const doDeleteAccountById = (pagedRequest) => (dispatch) => {
    // return new Promise((resolve, reject) => {
    //     accountService.showPagedByType(pagedRequest)
    //     .then(res => {
    //         dispatch({
    //             type: accountType.SHOW_PAGE_BY_TYPE,
    //             payload: {
    //                 accounts: res.data.accounts,
    //                 paged: res.data.paged
    //             }
    //         })
    //         resolve()
    //     })
    //     .catch(err => {
    //         reject()
    //     })
    // })
}