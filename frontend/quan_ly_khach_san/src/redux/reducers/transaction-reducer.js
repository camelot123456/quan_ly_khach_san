import transactionTypes from "../types/transaction-type";

const initialState = {
  apiResponse: {},
  transaction: {},
  transactions: [],
  transactionsCustomer: [],
  paged: {}
};

const transactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case transactionTypes.GET_TRANSACTIONS_LIST:
      return {
        ...state,
        paged: payload.paged,
        transactions: payload.transactions,
      };
    case transactionTypes.CREATE_TRANSACTION_PAYMENT_ACTION:
      return {
        ...state,
        apiResponse: payload.apiResponse,
        transaction: payload.transaction,
      };
    case transactionTypes.GET_TRANSACTIONS_LIST_FOR_CUSTOMER:
      var transactionsCustomer = {...state.transactionsCustomer}
      transactionsCustomer = payload.transactionsCustomer
      return {
        ...state,
        transactionsCustomer
      };
    case transactionTypes.ERROR_ACTION:
      return { 
          ...state, 
          apiResponse: payload.apiResponse,
          transactions: payload.transactions,
        };
    case transactionTypes.FIND_BY_ID_TRANSACTION:
      var transaction = {...state.transaction}
      transaction = payload.transaction
      return { 
          ...state, 
          transaction,
        };
    default:
      return state;
  }
};

export default transactionReducer;
