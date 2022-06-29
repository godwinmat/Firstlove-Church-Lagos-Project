import bcrypt from "bcrypt";
import User from "../models/user.js";
import validator from "validator";
import BacentaLeader from "../models/bacenta-leader.js";
import Member from "../models/member.js";
import Attendance from "../models/attendance.js";

export const registerBacentaLeaderController = async (req, res) => {
	const {
		logindetails: { username, email, phonenumber, area, password },
		userdetails,
	} = req.body;
	const saltRounds = 10;

	const hashedPassword = bcrypt.hashSync(password, saltRounds);

	const user = User({
		username,
		email,
		phonenumber,
		password: hashedPassword,
		userid: userdetails.userid,
	});

	try {
		await user.save();

		// const result = BacentaLeader({
		// 	email,
		// 	area,
		// 	userid: userdetails.userid,
		// 	role: [...userdetails.role, "Bacenta Leader"]
		// });

		await Member.findOneAndUpdate(
			{ userid: userdetails.userid },
			{ $push: { roles: "Bacenta Leader" } },
			{ upsert: true }
		);

		const attendance = Attendance({
			fullname: userdetails.fullname,
			userid: userdetails.userid
		});
		// await result.save();
		await attendance.save()
		res.status(200).send(`User ${username} added successfully.`);
	} catch (error) {
		console.log(error);
	}
};

export const checkIfUserExist = async (req, res) => {
	const { fullname } = req.body;

	// await MasterData.createIndex({firstname: "text"})
	try {
		const result = await Member.find({
			fullname: { $regex: fullname, $options: "i" },
		});
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
	}
};

export const loginController = async (req, res) => {
	const { userorphone, password } = req.body;

	if (userorphone === "firstlovechurchlagos" && password === "flcladministrator") {
		res.send({
			message: "admin login successful."
		});
		return
	}

	// There's likely to be an error if there's duplicate phonenumber

	const validate = validator.isAlpha(userorphone, "en-US", { ignore: "s" });

	if (validate) {
		const query = {
			username: userorphone,
		};

		try {
			const result = await User.findOne(query, [
				"username",
				"password",
				"userid",
			]);

			if (!result) {
				res.send({ data: "", message: "incorrect username." });
				return;
			}
			const passwordCheck = bcrypt.compareSync(password, result.password);

			if (passwordCheck) {
				res.send({
					data: result.username,
					message: "login successful.",
					userid: result.userid,
				});
			} else {
				res.send({ data: "", message: "incorrect password." });
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		const query = {
			phonenumber: userorphone,
		};
		try {
			const result = await User.findOne(query, [
				"username",
				"password",
				"userid",
			]);

			if (!result) {
				res.send({ data: "", message: "incorrect phone number." });
				return;
			}
			const passwordCheck = bcrypt.compareSync(password, result.password);
			if (passwordCheck) {
				res.send({
					data: result.username,
					message: "login successful.",
					userid: result.userid,
				});
			} else {
				res.send({ data: "", message: "incorrect password." });
			}
		} catch (error) {
			console.log(error);
		}
	}
};

export const verifyUsername = async (req, res) => {
	const { username } = req.body;

	const query = {
		username: username,
	};
	try {
		const cursorCount = await User.find(query).count();
		if (cursorCount > 0) {
			res.send("username already exists.");
		} else {
			res.send("username doesn't exist.");
		}
	} catch (error) {
		console.log(error);
	}
};

export const verifyPhone = async (req, res) => {
	const { phonenumber } = req.body;

	const query = {
		phonenumber: phonenumber,
	};
	try {
		const cursorCount = await User.find(query).count();
		if (cursorCount > 0) {
			res.send("phonenumber already exists.");
		} else {
			res.send("phonenumber doesn't exist.");
		}
	} catch (error) {
		console.log(error);
	}
};

export const verifyEmail = async (req, res) => {
	const { email } = req.body;

	const query = {
		email,
	};
	try {
		const cursorCount = await User.find(query).count();
		if (cursorCount > 0) {
			res.send("email already exists.");
		} else {
			res.send("email doesn't exist.");
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchUser = async (req, res) => {
	const { userid } = req.body;
	const query = {
		userid: userid,
	};

	try {
		const details = await Member.findOne(query);
		if (details) {
			res.status(200).send(details);
		} else {
			res.send("user does not exist.")
		}
	} catch (error) {
		console.log(error);
	}
};
