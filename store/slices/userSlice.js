import { createSlice } from "@reduxjs/toolkit";
import {
	loginUser,
	logoutUser,
	updateLogin,
	initUser,
	fetchUser,
} from "../reducers/userReducers";
import * as SecureStore from "expo-secure-store";

export default userSlice = createSlice({
	name: "user",
	initialState: {
		loggedIn: false,
		username: "",
		firstname: "",
		lastname: "",
		phonenumber: "",
		whatsappnumber: "",
		address: "",
		dateofbirth: "",
		image: "",
	},
	reducers: {
		updateLogin,
	},
	extraReducers: {
		[loginUser.fulfilled]: (state, { payload }) => {
			if (payload.message === "login successful.") {
				state.loggedIn = true;
				state.username = payload.data;
				const setLoggedIn = async () => {
					try {
						await SecureStore.setItemAsync(
							"isBacentaLeaderLoggedIn",
							"true"
						);
						await SecureStore.setItemAsync(
							"bacentaLeaderUsername",
							payload.data
						);
					} catch (error) {
						console.log(error);
					}
				};
				setLoggedIn();
			}
		},
		[logoutUser.fulfilled]: (state, { payload }) => {
			state.loggedIn = false;
			state.username = "";
		},
		[initUser.fulfilled]: (state, { payload }) => {
			if (payload) {
				state.loggedIn = payload.loggedIn;
				state.username = payload.username;
			} else {
				state.loggedIn = payload.loggedIn;
				state.username = payload.username;
			}
		},
		[fetchUser.fulfilled]: (
			state,
			{
				payload: {
					firstname,
					lastname,
					phonenumber,
					whatsappnumber,
					address,
					dateofbirth,
					image,
				},
			}
		) => {
			state.firstname = firstname;
			state.lastname = lastname;
			state.phonenumber = phonenumber;
			state.whatsappnumber = whatsappnumber;
			state.address = address;
			state.dateofbirth = dateofbirth;
			state.image = image;
		},
	},
});
