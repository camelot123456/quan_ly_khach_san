import transactionTypes from "../types/transaction-type";

const initialState = {
  apiResponse: {},
  transaction: {},
  transactions: [],
};

const transactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
