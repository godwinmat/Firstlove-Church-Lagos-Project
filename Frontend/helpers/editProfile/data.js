import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors";

export const errorObj = {
	firstname: {
		state: false,
		message: "",
	},
	lastname: {
		state: false,
		message: "",
	},
	phonenumber: {
		state: false,
		message: "",
	},
	whatsappnumber: {
		state: false,
		message: "",
	},
	address: {
		state: false,
		message: "",
	},
	email: {
		state: false,
		message: "",
	},
};

export const formDataSource = () => {
	const user = useSelector(userSelector);

	return {
		firstname: user.firstname,
		lastname: user.lastname,
		phonenumber: user.phonenumber,
		whatsappnumber: user.whatsappnumber,
		address: user.address,
		email: user.email,
		area: user.area,
		gender: user.gender,
		dateofbirth: `${user.dateofbirth.day}-${user.dateofbirth.month}-${user.dateofbirth.year}`,
		image: user.image,
		preset: "flclimages",
	};
};
