import Attendance from "../models/attendance.js";
import Member from "../models/member.js";

export const getAttendanceGraph = async (req, res) => {
	const { userid } = req.body;
	const query = {
		userid,
	};
	try {
		const { attendance } = await Attendance.findOne(query, "attendance");
		var graphList = [];
		for (const obj of attendance) {
			const list = [];
			const details = {
				date: obj.date,
				count: obj.count,
			};
			for (const id of obj.list) {
				const response = await Member.findOne({ userid: id });
				list.push(response);
			}
			details["list"] = list;
			graphList.push(details);
		}
		res.status(200).send(graphList);
	} catch (error) {
		console.log(error);
	}
};

export const getLastSundayAttendance = async (req, res) => {
	const { userid } = req.body;
	const query = {
		userid,
	};

	try {
		var { attendance } = await Attendance.findOne(query, "attendance");

		if (attendance.length !== 0) {
			var attendance = attendance[attendance.length - 1];
			var details = [];
			for (const id of attendance.list) {
				const response = await Member.findOne({ userid: id });
				details.push(response);
			}
			const response = {
				date: attendance.date,
				count: attendance.count,
				list: details,
			};
			res.send(response);
		} else {
			res.send("no attendance.");
		}
	} catch (error) {
		console.log(error);
	}
};

export const addAttendance = async (req, res) => {
	const { leaderid, attendancelist } = req.body;

	var date = new Date().toLocaleDateString().split("/");
	console.log(date);
	date = {
		day: Number(date[1]),
		month: Number(date[0]),
		year: Number(date[2]),
	};

	const attendance = {
		date,
		count: attendancelist.length,
		list: attendancelist,
	};

	try {
		await Attendance.findOneAndUpdate(
			{ userid: leaderid },
			{ $push: { attendance } },
			{ upsert: true }
		);
		res.send("Attendance added successfully.");
	} catch (error) {
		console.log(error);
	}
};
