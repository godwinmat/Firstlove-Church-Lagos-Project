import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5555";

export const getAreas = createAsyncThunk("area/get-areas", async function () {
	try {
		const response = await axios.get(`${url}/area/get-areas`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const addArea = createAsyncThunk("area/add-area", async function (area) {
	try {
		const response = await axios.post(`${url}/area/add-area`, area);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});
