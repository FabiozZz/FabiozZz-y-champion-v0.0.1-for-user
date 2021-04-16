import {combineReducers, createStore} from "redux";
import {userReducer} from "../reducers/userRedicer";

const rootReducer = combineReducers({
    user: userReducer
});

export const store = createStore(rootReducer);
window.store = store;