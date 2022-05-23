import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { convertBooleanStringToBoolean } from "../../components/utility";

// const url = "http://192.168.4.126:5060";
const url = "http://localhost:5060";
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/flclimages/image/upload";

export const loginUser = createAsyncThunk(
	"user/login",
	async function (loginData) {
		try {
			const response = await axios.post(`${url}/user/login`, loginData);
			return response.data;
		} catch (error) {
			console.log(error)
		}
	}
);
export const initUser = createAsyncThunk(
	"user/init-user",
	async (_, thunkApi) => {
		try {
			const loggedIn = convertBooleanStringToBoolean(await SecureStore.getItemAsync(
				"isBacentaLeaderLoggedIn"
			))
			const username = await SecureStore.getItemAsync(
				"bacentaLeaderUsername"
			);
			
			if (loggedIn) {
				return {loggedIn, username}
			} else {
				return {loggedIn, username};
			}
		} catch (error) {
			console.log(error); 
		}
	}
);
export const logoutUser = createAsyncThunk("user/logout", async () => {
	try {
		await SecureStore.setItemAsync("isBacentaLeaderLoggedIn", "false");
	} catch (error) {
		console.log(error);
	}
});
export const updateLogin = (state, { payload }) => {
	if (payload) {
		state.loggedIn = payload;
	} else {
		state.loggedIn = payload;
	}
};
export const registerBacentaLeader = createAsyncThunk(
	"user/register-bacenta-leader",
	async function (registerData) {
		try {
			const response = await axios.post(
				`${url}/user/register-bacenta-leader`,
				registerData
			);
			return response.status;
		} catch (error) {
			return { data: "", message: "error" };
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
			return "error";
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
			if (response.status === 400) {
				console.log(response.data);
			} else {
				return response.data
			}
		} catch (error) {
			return "error";
		}
	}
);

export const registerMember = createAsyncThunk("user/register-member", async function (userData) {
	try {
		const imageData = new FormData()
		imageData.append("file", userData.image)
		imageData.append("upload_preset", userData.preset)
		const uploadResponse = await fetch(cloudinaryUrl, {
			method: "post",
			body: imageData
		})
		const { secure_url } = await uploadResponse.json()
		userData = {
			firstname: userData.firstname,
			lastname: userData.lastname,
			phonenumber: userData.phonenumber,
			whatsappnumber: userData.whatsappnumber,
			address: userData.address,
			dateofbirth: userData.dateofbirth,
			image: secure_url
		}
		const response = await axios.post(`${url}/user/register-member`, userData)
		if (response.status === 200) {
			return response.data
		} else {
			console.log(response.data)
		}
	} catch (error) {
		console.log(error)
	}
})

export const fetchUser = createAsyncThunk("user", async function (username) {
	try {
		const response = await axios.post(`${url}/user`, {username})
		if (response.status === 200) {
			return response.data
		} else {
			console.log("error")
			console.log(response.data)
		}
	} catch (error) {
		console.log(error)
	}
})