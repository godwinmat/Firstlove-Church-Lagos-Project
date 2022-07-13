import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5555";

export const getAttendanceGraph = createAsyncThunk(
	"attendance/get-attendance-graph",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/attendance/get-attendance-graph`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const addAttendance = createAsyncThunk(
	"attendance/add-attendance",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/attendance/add-attendance`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getLastSundayAttendance = createAsyncThunk(
	"attendance/get-last-sunday-attendance",
	async function (data) {
		try {
			const response = await axios.post(
				`${url}/attendance/get-last-sunday-attendance`,
				data
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);
