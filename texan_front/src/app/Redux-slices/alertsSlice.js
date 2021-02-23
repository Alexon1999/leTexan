import { createSlice } from "@reduxjs/toolkit";

// *  Writing the Slices

//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    addAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      state.forEach((alert, i) => {
        if (alert.id === action.payload.id) {
          state.splice(i, 1);
        }
      });
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const { addAlert, removeAlert } = alertsSlice.actions;

export const selectAlerts = (state) => state.alerts;

// + the generated reducer function
export default alertsSlice.reducer;
