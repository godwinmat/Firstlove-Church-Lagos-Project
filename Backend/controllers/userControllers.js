import bcrypt from "bcrypt";
import User from "../models/user.js";
import MasterData from "../models/master-data.js";
import validator from "validator";

export const registerBacentaLeaderController = async (req, res) => {
	const { username, phonenumber, password } = req.body;
	const saltRounds = 10;

	const hashedPassword = bcrypt.hashSync(password, saltRounds);

	const user = User({
		username,
		phonenumber,
		password: hashedPassword,
	});

	try {
		await user.save();
		res.send(`User ${username} added successfully.`);
	} catch (error) {
		res.send("Database error.");
	}
};

export const loginController = async (req, res) => {
	const { userorphone, password } = req.body;

	const validate = validator.isAlpha(userorphone, "en-US", { ignore: "s" });

	if (validate) {
		const query = {
			username: userorphone,
		};

		try {
			const result = await User.findOne(query, ["username", "password"]);

			if (!result) {
				res.send({ data: "", message: "incorrect username." });

				return;
			}
			const passwordCheck = bcrypt.compareSync(password, result.password);

			if (passwordCheck) {
				res.send({
					data: result.username,
					message: "login successful.",
				});
			} else {
				res.send({ data: "", message: "incorrect password." });
			}
		} catch (error) {
			res.send({ data: "", message: "database error." });
		}
	} else {
		const query = {
			phonenumber: userorphone,
		};
		try {
			const result = await User.findOne(query, ["username", "password"]);

			if (!result) {
				res.send({ data: "", message: "incorrect phone number." });
				return;
			}
			const passwordCheck = bcrypt.compareSync(password, result.password);
			if (passwordCheck) {
				res.send({
					data: result.username,
					message: "login successful.",
				});
			} else {
				res.send({ data: "", message: "incorrect password." });
			}
		} catch (error) {
			res.send({ data: "", message: "database error." });
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
		res.send("database error.");
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
		res.status(400).send("database error.");
	}
};

export const registerMember = async (req, res) => {
	const {
		firstname,
		lastname,
		phonenumber,
		whatsappnumber,
		address,
		dateofbirth,
		image,
	} = req.body;

	const user = MasterData({
		firstname,
		lastname,
		phonenumber,
		whatsappnumber,
		address,
		dateofbirth,
		image,
	});

	try {
		await user.save();
		res.status(200).send(`User ${firstname} ${lastname} added successfully.`);
	} catch (error) {
		res.status(400).send("Database error.");
	}
};

export const fetchUser = async (req, res) => {
	const {username} = req.body;
	const userQuery = {
		username: username
	};

	try {
		const result = await User.findOne(userQuery, "phonenumber");
		
		if (result) {
			const phoneQuery = {
				phonenumber: result.phonenumber,
			};
			const {
				firstname,
				lastname,
				phonenumber,
				whatsappnumber,
				address,
				dateofbirth,
				image,
			} = await MasterData.findOne(phoneQuery);

			res.status(200).send({
				firstname,
				lastname,
				phonenumber,
				whatsappnumber,
				address,
				dateofbirth,
				image,
			});
		}
	} catch (error) {
		console.log(error)
		// res.status(400).send(error);
	}
};