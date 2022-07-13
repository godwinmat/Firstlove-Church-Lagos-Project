import { createSlice } from "@reduxjs/toolkit";
import {
	loginUser,
	logoutUser,
	updateLogin,
	initUser,
	fetchUser,
	updateProfile,
} from "../reducers/userReducers";
import * as SecureStore from "expo-secure-store";

export default userSlice = createSlice({
	name: "user",
	initialState: {
		loggedin: false,
		username: "",
		firstname: "",
		lastname: "",
		phonenumber: "",
		whatsappnumber: "",
		email: "",
		area: "",
		gender: "",
		address: "",
		userid: "",
		dateofbirth: {
			day: null,
			month: null,
			year: null,
		},
		image: "",
		roles: [],
		isAdmin: false,
	},
	reducers: {
		// updateLogin,
	},
	extraReducers: {
		[loginUser.fulfilled]: (state, { payload }) => {
			if (payload.message === "login successful.") {
				state.loggedIn = true;
				state.username = payload.data;
				state.userid = payload.userid;
				const setLogIn = async () => {
					try {
						await SecureStore.setItemAsync(
							"isBacentaLeaderLoggedIn",
							"true"
						);
						await SecureStore.setItemAsync(
							"bacentaLeaderUsername",
							payload.data
						);
						await SecureStore.setItemAsync(
							"bacentaLeaderId",
							payload.userid
						);
					} catch (error) {
						console.log(error);
					}
				};
				setLogIn();
			} else if (payload.message === "admin login successful.") {
				state.loggedIn = true;
				state.userid = "firstlovechurchlagosadministrator";
				state.isAdmin = true;
				const setAdminLogIn = async () => {
					try {
						await SecureStore.setItemAsync(
							"isAdminLoggedIn",
							"true"
						);
						await SecureStore.setItemAsync(
							"adminId",
							"firstlovechurchlagosadministrator"
						);
					} catch (error) {
						console.log(error);
					}
				};
				setAdminLogIn();
			}
		},
		[logoutUser.fulfilled]: (state, { payload }) => {
			state.loggedIn = false;
			state.username = "";
			state.userid = "";
			state.firstname = "";
			state.lastname = "";
			state.phonenumber = "";
			state.whatsappnumber = "";
			state.email = "";
			state.area = "";
			state.address = "";
			state.dateofbirth.day = "";
			state.dateofbirth.month = "";
			state.dateofbirth.year = "";
			state.image = "";
			state.gender = "";
		},
		[initUser.fulfilled]: (state, { payload }) => {
			if (payload.isAdmin) {
				state.isAdmin = true;
				state.userid = payload.adminId;
				state.loggedIn = true;
				state.username = payload.adminUsername;
			} else {
				state.loggedIn = payload.loggedIn;
				state.username = payload.username;
				state.userid = payload.userid;
			}
		},
		[fetchUser.fulfilled]: (state, { payload }) => {
			if (payload !== "error") {
				state.firstname = payload.firstname;
				state.lastname = payload.lastname;
				state.phonenumber = payload.phonenumber;
				state.whatsappnumber = payload.whatsappnumber;
				state.email = payload.email;
				state.area = payload.area;
				state.address = payload.address;
				state.dateofbirth.day = payload.dateofbirth.day;
				state.dateofbirth.month = payload.dateofbirth.month;
				state.dateofbirth.year = payload.dateofbirth.year;
				state.image = payload.image;
				state.gender = payload.gender;
				state.roles = payload.roles;
			}
		},
		[updateProfile.fulfilled]: (state, { payload: { data, message } }) => {
			state.firstname = data.firstname;
			state.lastname = data.lastname;
			state.phonenumber = data.phonenumber;
			state.whatsappnumber = data.whatsappnumber;
			state.email = data.email;
			state.area = data.area;
			state.address = data.address;
			state.dateofbirth.day = data.dateofbirth.day;
			state.dateofbirth.month = data.dateofbirth.month;
			state.dateofbirth.year = data.dateofbirth.year;
			state.image = data.image;
			state.gender = data.gender;
			state.roles = data.roles;
		},
	},
});
