import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './reducers'

const composeEnhencer = applyMiddleware(thunk)

const store = createStore(
    rootReducer,
    // composeWithDevTools(composeEnhencer)
    applyMiddleware(thunk)
)

export default store