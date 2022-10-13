import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/toDoSlice"
// import {persistStore,persisitReducer} from "redux-persist";
// import storage from "redux-persist/lib/storage"
// import persistReducer from "redux-persist/es/persistReducer";

// const persistConfig={
//     key : "root",
//     storage
// }
// persistReducer(persistConfig)
//store
export const store = configureStore({
    reducer: todosReducer
});
  