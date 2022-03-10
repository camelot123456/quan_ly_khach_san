import transactionTypes from "../types/transaction-type";

const initialState = {
  apiResponse: {},
  transaction: {},
  transactions: [],
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
    case transactionTypes.ERROR_ACTION:
      return { 
          ...state, 
          apiResponse: payload.apiResponse
        };
    default:
      return state;
  }
};

export default transactionReducer;
