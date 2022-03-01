import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import roomReducer from "./room-reducer";

const rootReducer = combineReducers({
    authReducer,
    roomReducer
})

export default rootReducer