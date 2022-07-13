import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
// import cloudinary from "../../cloudinaryconfig";
import {
	convertBooleanStringToBoolean,
	showToastWithGravity,
} from "../../components/utility";

// const url = "http://192.168.233.126:5555";
const url = "http://localhost:5555";
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/flclimages/image/upload";

export const loginUser = createAsyncThunk(
	"user/login",
	async function (loginData) {
		try {
			const response = await axios.post(`${url}/user/login`, loginData);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);
export const initUser = createAsyncThunk(
	"user/init-user",
	async (_, thunkApi) => {
		try {
			const adminLoggedIn = convertBooleanStringToBoolean(
				await SecureStore.getItemAsync("isAdminLoggedIn")
			);
			if (adminLoggedIn) {
				const adminId = await SecureStore.getItemAsync("adminId");
				const adminUsername = await SecureStore.getItemAsync(
					"adminUsername"
				);
				return {
					isAdmin: true,
					adminId,
					adminUsername,
				};
			} else {
				const loggedIn = convertBooleanStringToBoolean(
					await SecureStore.getItemAsync("isBacentaLeaderLoggedIn")
				);
				const username = await SecureStore.getItemAsync(
					"bacentaLeaderUsername"
				);
				const userid = await SecureStore.getItemAsync(
					"bacentaLeaderId"
				);
				return {
					loggedIn,
					username,
					userid,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
);
export const logoutUser = createAsyncThunk(
	"user/logout",
	async (_, thunkApi) => {
		try {
			if (thunkApi.getState().user.isAdmin) {
				await SecureStore.setItemAsync("isAdminLoggedIn", "false");
				await SecureStore.setItemAsync("adminId", "");
				await SecureStore.setItemAsync("adminUsername", "");
			}
			await SecureStore.setItemAsync("isBacentaLeaderLoggedIn", "false");
			await SecureStore.setItemAsync("bacentaLeaderUsername", "");
			await SecureStore.setItemAsync("bacentaLeaderId", "");
		} catch (error) {
			console.log(error);
		}
	}
);
// export const updateLogin = (state, { payload }) => {
// 	if (payload) {
// 		state.loggedIn = payload;
// 	} else {
// 		state.loggedIn = payload;
// 	}
// };
export const registerBacentaLeader = createAsyncThunk(
	"user/register-bacenta-leader",
	async function (registerData) {
		try {
			const response = await axios.post(
				`${url}/user/register-bacenta-leader`,
				registerData
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const verifyUsername = createAsyncThunk(
	"user/verify-username",
	async function (username) {
		try {
			const response = await axios.post(
				`${url}/user/verify-username`,
				username
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const verifyPhone = createAsyncThunk(
	"user/verify-phonenumber",
	async function (phonenumber) {
		try {
			const response = await axios.post(
				`${url}/user/verify-phonenumber`,
				phonenumber
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const verifyEmail = createAsyncThunk(
	"user/verify-email",
	async function (data) {
		try {
			const response = await axios.post(`${url}/user/verify-email`, data);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const fetchUser = createAsyncThunk(
	"user",
	async function (data, thunkApi) {
		try {
			const response = await axios.post(`${url}/user`, data);
			if (response.data !== "user does not exist.") {
				return response.data;
			}
			thunkApi.dispatch(logoutUser());
		} catch (error) {
			showToastWithGravity(
				"Could not connect to server, please check your internet connection and try again."
			);
			console.log(error);
		}
	}
);

export const checkIfUserExist = createAsyncThunk(
	"user/check-if-user-exist",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/user/check-if-user-exist`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateProfile = createAsyncThunk(
	"user/update-profile",
	async function ({ formData, publicId }) {
		try {
			if (formData.dateofbirth) {
				const [day, month, year] = formData.dateofbirth.split("-");
				formData.dateofbirth = {
					day: Number(day),
					month: Number(month),
					year: Number(year),
				};
			}

			if (formData.image) {
				const {
					data: { timestamp, signature, api_key },
				} = await axios.post(`${url}/user/sign-upload`, {
					publicId: publicId,
				});

				const imageData = new FormData();
				imageData.append("file", formData.image);

				const uploadResponse = await fetch(
					cloudinaryUrl +
						`?api_key=${api_key}&timestamp=${timestamp}&public_id=${publicId}&invalidate=true&signature=${signature}`,
					{
						method: "POST",
						body: imageData,
					}
				);
				const { secure_url } = await uploadResponse.json();
				formData.image = secure_url;
			}

			const response = await axios.post(
				`${url}/user/update-profile`,
				formData
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);
