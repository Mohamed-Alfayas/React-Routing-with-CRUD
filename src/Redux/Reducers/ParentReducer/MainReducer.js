import { combineReducers } from "@reduxjs/toolkit";
import FormReducer from "../ChildReducer/FormReducer";

export const MainReducer = combineReducers({
    FormReducer : FormReducer
})