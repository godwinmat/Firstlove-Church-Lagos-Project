import { configureStore } from "@reduxjs/toolkit";
import { memberSlice, userSlice, attendanceSlice } from "./slices/index";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		member: memberSlice.reducer,
		attendance: attendanceSlice.reducer
	},
});

export const userActions = userSlice.actions
export const memberActions = memberSlice.actions
export const attendanceActions = attendanceSlice.actions

export default store;
