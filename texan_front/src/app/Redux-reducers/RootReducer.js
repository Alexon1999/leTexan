import { combineReducers } from "@reduxjs/toolkit";

import basketsReducer from "../Redux-slices/basketsSlice";
import alertsReducer from "../Redux-slices/alertsSlice";
import adminReducer from "../Redux-slices/adminSlice";

export default combineReducers({
  baskets: basketsReducer,
  alerts: alertsReducer,
  admin: adminReducer,
});
