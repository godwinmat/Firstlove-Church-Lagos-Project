import validator from "validator";

export const validateInput = (name, val, error, setError) => {
	switch (name) {
		case "firstname":
			if (validator.isAlpha(val, "en-US")) {
				setError({
					...error,
					firstname: { state: false, message: "" },
				});
			} else {
				setError({
					...error,
					firstname: {
						state: true,
						message: "First name can only contain alphabets.",
					},
				});
			}
			if (validator.isEmpty(val)) {
				setError({
					...error,
					firstname: {
						state: true,
						message: "First name is required.",
					},
				});
			}
			break;
		case "lastname":
			if (validator.isAlpha(val, "en-US")) {
				setError({
					...error,
					lastname: { state: false, message: "" },
				});
			} else {
				setError({
					...error,
					lastname: {
						state: true,
						message: "Last name can only contain alphabets.",
					},
				});
			}
			if (validator.isEmpty(val)) {
				setError({
					...error,
					lastname: {
						state: true,
						message: "Last name is required.",
					},
				});
			}
			break;
		case "phonenumber":
			if (validator.isMobilePhone(val, "en-NG")) {
				setError({
					...error,
					phonenumber: { state: false, message: "" },
				});
			} else {
				setError({
					...error,
					phonenumber: {
						state: true,
						message: "Phone number must be correct.",
					},
				});
			}
			if (validator.isEmpty(val)) {
				setError({
					...error,
					phonenumber: {
						state: false,
						message: "",
					},
				});
			}
			break;
		case "whatsappnumber":
			if (validator.isMobilePhone(val, "en-NG")) {
				setError({
					...error,
					whatsappnumber: { state: false, message: "" },
				});
			} else {
				setError({
					...error,
					whatsappnumber: {
						state: true,
						message: "Whatsapp number must be correct.",
					},
				});
			}
			if (validator.isEmpty(val)) {
				setError({
					...error,
					whatsappnumber: {
						state: false,
						message: "",
					},
				});
			}
			break;
		case "address":
			if (validator.isAlphanumeric(val, "en-US")) {
				setError({
					...error,
					address: { state: false, message: "" },
				});
			} else if (validator.isEmpty(val)) {
				setError({
					...error,
					address: {
						state: true,
						message: "Address is required.",
					},
				});
			}
			break;
		case "email":
			if (validator.isEmail(val)) {
				setError({
					...error,
					email: { state: false, message: "" },
				});
			} else {
				setError({
					...error,
					email: {
						state: true,
						message: "Email must be correct.",
					},
				});
			}
			if (validator.isEmpty(val)) {
				setError({
					...error,
					email: {
						state: true,
						message: "Email is required.",
					},
				});
			}
			break;
		default:
			break;
	}
};

export const changeSubmitButtonState = (error, formData, setDisableButton) => {
	if (
		!error.firstname.state &&
		formData.firstname.length > 0 &&
		!error.lastname.state &&
		formData.lastname.length > 0 &&
		!error.phonenumber.state &&
		formData.phonenumber.length > 0 &&
		!error.whatsappnumber.state &&
		formData.whatsappnumber.length > 0 &&
		!error.address.state &&
		formData.address.length > 0 &&
		!error.email.state &&
		formData.email.length > 0 &&
		formData.image !== null &&
		formData.area !== "" &&
		formData.gender !== ""
	) {
		setDisableButton(false);
	} else {
		setDisableButton(true);
	}
};
