export const uniqueArray = (first, second, compareWith) => {
	let iterationCount = 0;
	const list = [];
	if (first.length === 0 && second.length === 0) {
		return list;
	} else if (first.length === 0 && second.length !== 0) {
		return first;
	} else if (first.length !== 0 && second.length === 0) {
		return first;
	} else if (first.length !== 0 && second.length !== 0) {
		for (let i of first) {
			for (let j of second) {
				iterationCount++;
				if (i[compareWith] === j[compareWith]) {
					break;
				}
				if (iterationCount === second.length) list.push(i);
			}
		}
	}
	return list;
};

export const returnDetails = async (ids, model) => {
	var response = [];
	for (const id of ids) {
		const details = await model.findOne({ userid: id });
		response.push(details);
	}
	return response;
};
