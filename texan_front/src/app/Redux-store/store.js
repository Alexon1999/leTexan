import { configureStore } from "@reduxjs/toolkit";

import RootReducer from "../Redux-reducers/RootReducer";

export default configureStore({
  reducer: RootReducer,
});
