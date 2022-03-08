import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import roomReducer from "./room-reducer";
import roomtypeReducer from "./roomtype-reducer";
import serviceReducer from "./service-reducer";
import accountReducer from "./account-reducer";
import reservationReducer from "./reservation-reducer";

const rootReducer = combineReducers({
    authReducer,
    roomReducer,
    roomtypeReducer,
    serviceReducer,
    accountReducer,
    reservationReducer
})

export default rootReducer