import transactionService from "../../services/transaction-service";
import transactionTypes from "../types/transaction-type";

export const getTransactionsList = (pagedRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        transactionService.getTransactions(pagedRequest)
        .then(res => {
            dispatch({
                type: transactionTypes.GET_TRANSACTIONS_LIST,
                payload: {
                    paged: res.data.paged,
                    transactions: res.data.transactions
                }
            })
            resolve()
        })
        .catch(err => {
            dispatch({
                type: transactionTypes.ERROR_ACTION
            })
            reject()
        })
    })
}

export const doCreateTransactionPaymnet = (idReservation) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        transactionService.doCreateTransaction(idReservation)
        .then((response) => {
            resolve()
        })
        .catch((error) => {
            reject()
        })
    })
}

export const doSoftDeleteById = (transaction) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        transactionService.doSoftDeleteById(transaction)
        .then((response) => {
            resolve()
        })
        .catch((error) => {
            reject()
        })
    })
}

export const doFindTransactionById = (idTransaction) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        transactionService.doFindTransactionById(idTransaction)
        .then((res) => {
            dispatch({
                type: transactionTypes.FIND_BY_ID_TRANSACTION,
                payload: {
                    transaction: res.data
                }
            })
            resolve()
        })
        .catch((error) => {
            reject()
        })
    })
}