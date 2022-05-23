import { configureStore } from "@reduxjs/toolkit";
import { userSlices } from "./slices/index";

const store = configureStore({
	reducer: {
		users: userSlices.reducer
	},
});

export const userActions = userSlices.actions

export default store;
