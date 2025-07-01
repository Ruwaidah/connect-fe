import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/usersSlice";
import messageReducer from "./reducers/messagesSlice"

const rootReducer = combineReducers({
  user: userReducer,
  messages : messageReducer
});

export default configureStore({
  reducer: rootReducer,
});
