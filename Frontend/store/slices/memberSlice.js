import { createSlice } from "@reduxjs/toolkit";
import { registerMember } from "../reducers/memberReducers";

export default memberSlice = createSlice({
	name: "member",
	initialState: {
		registermemberloading: false,
	},
	extraReducers: {
		[registerMember.pending]: (state, actions) => {
			state.registerMemberLoading = true;
		},
		[registerMember.fulfilled]: (state, actions) => {
			state.registerMemberLoading = false;
		},
		[registerMember.rejected]: (state, actions) => {
			console.log("rejected");
		},
	},
});
