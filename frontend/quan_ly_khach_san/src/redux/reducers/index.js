import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import roomReducer from "./room-reducer";
import roomtypeReducer from "./roomtype-reducer";
import serviceReducer from "./service-reducer";
import accountReducer from "./account-reducer";
import reservationReducer from "./reservation-reducer";
import transactionReducer from "./transaction-reducer"
import roomtypePhotoReducer from "./roomtypePhoto-reducer"
import roleReducer from "./role-reducer"

const rootReducer = combineReducers({
    authReducer,
    roomReducer,
    roomtypeReducer,
    serviceReducer,
    accountReducer,
    reservationReducer,
    transactionReducer,
    roomtypePhotoReducer,
    roleReducer
})

export default rootReducer