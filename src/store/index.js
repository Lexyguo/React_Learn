// import { applyMiddleware, combineReducers, createStore } from "redux";
import { applyMiddleware, createStore } from "redux";
import combineReducers from "../kredux/combineReducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise";
const initialState = 0;

const countReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case "ADD":
            return state + 1;

        case "MINUS":
            return state - 1;

        default:
            return state
    }
}

const store = createStore(
    combineReducers({ counter: countReducer }),
    applyMiddleware(thunk, logger, promise)
)

export default store;
