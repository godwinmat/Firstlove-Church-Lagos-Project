import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	userid: {
		type: String,
		required: true,
	},
	attendance: [
		{
			date: {
				day: {
					type: Number,
					required: true,
				},
				month: {
					type: Number,
					required: true,
				},
				year: {
					type: Number,
					required: true,
				},
			},
			count: {
				type: Number,
				required: true,
			},
			list: {
				type: [],
				required: true,
			},
		},
	],
});

const Attendance = mongoose.model("attendance", AttendanceSchema);
export default Attendance;
