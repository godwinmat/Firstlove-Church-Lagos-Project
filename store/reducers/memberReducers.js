import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToastWithGravity } from "../../components/utility";
// const url = "http://192.168.233.126:5555";
const url = "http://localhost:5555";
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/flclimages/image/upload";

export const registerMember = createAsyncThunk(
	"member/register-member",
	async function (userData) {
		try {
			const imageData = new FormData();
			imageData.append("file", userData.image);
			imageData.append("upload_preset", userData.preset);
			const uploadResponse = await fetch(cloudinaryUrl, {
				method: "post",
				body: imageData,
				// signal: Timeout(10).signal,
			});
			const { secure_url } = await uploadResponse.json();
			userData = {
				firstname: userData.firstname,
				lastname: userData.lastname,
				phonenumber: userData.phonenumber,
				whatsappnumber: userData.whatsappnumber,
				address: userData.address,
				dateofbirth: userData.dateofbirth,
				image: secure_url,
				area: userData.area,
				gender: userData.gender,
				isleader: userData.isLeader,
			};
			const response = await axios.post(
				`${url}/member/register-member`,
				userData
			);
			return response.data;
		} catch (error) {
			showToastWithGravity(
				"Could not connect to server, please check your internet connection."
			);
			console.log(error);
		}
	}
);

export const checkIfBacentaMemberExist = createAsyncThunk(
	"member/check-if-bacenta-member-exist",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/member/check-if-bacenta-member-exist`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const addBacentaMember = createAsyncThunk(
	"member/add-bacenta-member",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/member/add-bacenta-member`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getBacentaMembers = createAsyncThunk(
	"member/get-bacenta-members",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/member/get-bacenta-members`,
				data
			);
			return response.data;
		} catch (error) {
			showToastWithGravity(
				"Could not connect to server, please check your internet connection."
			);
			console.log(error);
		}
	}
);

export const getBacentaMemberCount = createAsyncThunk(
	"member/get-bacenta-member-count",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/member/get-bacenta-member-count`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const deleteBacentaMember = createAsyncThunk(
	"member/delete-bacenta-member",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/member/delete-bacenta-member`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getBacentaMembersForAttendance = createAsyncThunk(
	"member/get-bacenta-members-for-attendance",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/member/get-bacenta-members-for-attendance`,
				data
			);
			return response.data;
		} catch (error) {
			showToastWithGravity(
				"Could not connect to server, please check your internet connection."
			);
			console.log(error);
		}
	}
);
