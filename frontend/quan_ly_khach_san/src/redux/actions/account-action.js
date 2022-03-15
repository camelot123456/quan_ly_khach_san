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
            dispatch({
                type: accountType.SHOW_PAGE_BY_TYPE,
                payload: {
                    accounts: res.data.accounts,
                    paged: res.data.paged
                }
            })
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