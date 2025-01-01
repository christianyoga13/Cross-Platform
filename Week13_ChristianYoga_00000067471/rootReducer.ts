import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./slice/counter.slice";

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;