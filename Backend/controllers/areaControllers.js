import Area from "../models/area.js";

export const getAreas = async (req, res) => {
	try {
		const result = await Area.find({}, "name");
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
	}
};

export const addArea = async (req, res) => {
	const { name } = req.body;
	const area = Area({
		name,
	});
	try {
		await area.save();
		res.status(200).send(`Area ${name} added successfully.`);
	} catch (error) {
		console.log(error);
	}
};

