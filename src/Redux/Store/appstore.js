import { configureStore } from "@reduxjs/toolkit";
import { MainReducer } from "../Reducers/ParentReducer/MainReducer";

const appstore = configureStore({
    reducer : MainReducer
});
export default appstore;