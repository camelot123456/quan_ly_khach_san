import transactionService from "../../services/transaction-service";
import transactionTypes from "../types/transaction-type";

export const getTransactionsList = (pagedRequest) => async (dispatch) => {
    try {
        const apiResponse = await transactionService.getTransactions(pagedRequest)
        dispatch({
            type: transactionTypes.GET_TRANSACTIONS_LIST,
            payload: {
                paged: apiResponse.data.paged,
                transactions: apiResponse.data.transactions
            }
        })
    } catch (error) {
        dispatch({
            type: transactionTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}

export const doCreateTransactionPaymnet = (idReservation) => async (dispatch) => {
    try {
        const apiResponse = await transactionService.doCreateTransaction(idReservation)
        dispatch({
            type: transactionTypes.CREATE_TRANSACTION_PAYMENT_ACTION,
            payload: {
                apiResponse: apiResponse.data.apiResponse,
                transaction: apiResponse.data.transaction
            }
        })
    } catch (error) {
        dispatch({
            type: transactionTypes.ERROR_ACTION,
            payload: {
                apiResponse: {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}