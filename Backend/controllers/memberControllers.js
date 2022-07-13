import BacentaLeader from "../models/bacenta-leader.js";
import Member from "../models/member.js";
import { returnDetails, uniqueArray } from "../utility.js";
import { v4 } from "uuid";

export const registerMember = async (req, res) => {
	const {
		firstname,
		lastname,
		phonenumber,
		whatsappnumber,
		gender,
		address,
		dateofbirth,
		image,
		area,
	} = req.body;

	const [day, month, year] = dateofbirth.split("-");

	const userid = v4();

	const user = Member({
		firstname,
		lastname,
		fullname: `${firstname} ${lastname}`,
		phonenumber,
		whatsappnumber,
		gender,
		address,
		dateofbirth: {
			day: Number(day),
			month: Number(month),
			year: Number(year),
		},
		image,
		area,
		userid,
		roles: ["Member"],
	});

	try {
		await user.save();
		res.status(200).send(
			`User ${firstname} ${lastname} added successfully.`
		);
	} catch (error) {
		console.log(error);
	}
};

export const checkIfBacentaMemberExist = async (req, res) => {
	const { fullname, bacentaleader } = req.body;

	// await MasterData.createIndex({firstname: "text"})
	try {
		var result = await Member.find({
			fullname: { $regex: fullname },
			roles: ["Member"],
		});
		var { people } = await Member.findOne(
			{
				fullname: bacentaleader,
			},
			"people"
		);
		people = await returnDetails(people, Member);
		const newArray = uniqueArray(result, people, "userid");
		res.status(200).send(newArray);
	} catch (error) {
		console.log(error);
	}
};

export const getBacentaMembers = async (req, res) => {
	const { userid } = req.body;
	const query = {
		userid,
	};
	try {
		const { people } = await Member.findOne(query, "people");
		var details = [];
		for (const id of people) {
			const response = await Member.findOne({ userid: id });
			details.push(response);
		}
		res.status(200).send(details);
	} catch (error) {
		console.log(error);
	}
};

export const getBacentaMemberCount = async (req, res) => {
	const { userid } = req.body;
	const query = {
		userid,
	};
	try {
		const { people } = await Member.findOne(query, "people");
		const response = people.length;
		res.status(200).send({ count: response });
	} catch (error) {
		console.log(error);
	}
};

export const addBacentaMember = async (req, res) => {
	const { memberid, leaderid, isbacentaleader } = req.body;
	try {
		const { people } = await Member.findOne(
			{
				userid: leaderid,
			},
			"people"
		);
		var exists = false;
		people.forEach((id) => {
			if (id === memberid) {
				exists = true;
			}
		});
		if (exists) {
			res.status(200).send("Member already exists.");
		} else {
			await Member.findOneAndUpdate(
				{ userid: leaderid },
				{ $push: { people: memberid } },
				{ upsert: true }
			);
			res.status(200).send("Member added successfully");
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteBacentaMember = async (req, res) => {
	const { memberid, leaderid } = req.body;
	try {
		await Member.updateOne(
			{ userid: leaderid },
			{
				$pull: {
					people: memberid,
				},
			}
		);
		res.status(200).send("Member deleted successfully");
	} catch (error) {
		console.log(error);
	}
};

export const getBacentaMembersForAttendance = async (req, res) => {
	const { userid } = req.body;
	const query = {
		userid,
	};
	try {
		const { people } = await Member.findOne(query, "people");
		var ids = [...people];

		for (const id of people) {
			const { people } = await Member.findOne({ userid: id }, "people");
			ids.push(...people);
		}
		const response = await returnDetails(ids, Member);

		res.status(200).send(response);
	} catch (error) {
		console.log(error);
	}
};
