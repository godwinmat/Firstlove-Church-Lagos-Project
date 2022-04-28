import { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { FormInput, CustomButton } from "../components/utility";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import validator from "validator";
import { Feather } from "@expo/vector-icons";

export default Form = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		phonenumber: "",
		whatsappnumber: "",
		address: "",
		dateofbirth: "",
		image: null,
	});
	const [openPicker, setOpenPicker] = useState(false);
	const [error, setError] = useState({
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
	});
	const [disableButton, setDisableButton] = useState(true);

	const onDateChange = (e, d) => {
		setOpenPicker(false);
		setFormData({
			...formData,
			dateofbirth: `${d.getDate()}-${
				d.getMonth() + 1
			}-${d.getFullYear()}`,
		});
		changeSubmitButtonState();
	};

	const changeSubmitButtonState = () => {
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
			formData.dateofbirth.length > 0 &&
			formData.image !== null
		) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	};

	useEffect(() => {
		changeSubmitButtonState();
	}, [formData]);

	const onChangeText = (name) => {
		return (val) => {
			setFormData({ ...formData, [name]: val });
			validateInput(name, val);
		};
	};

	const validateInput = (name, val) => {
		console.log(val);
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
					// setFirstNameError("First name is required.");
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
							state: true,
							message: "Phone number is required.",
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
							state: true,
							message: "Whatsapp number is required.",
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
			default:
				break;
		}
	};

	const onSubmit = () => {
		// console.log(formData);
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			console.log(result);
			setFormData({ ...formData, image: result.uri });
		}
	};

	const takeImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
		});

		if (!result.cancelled) {
			setFormData({ ...formData, image: result.uri });
		}
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar
				backgroundColor="white"
				barStyle="dark-content"
				animated
			/>
			<KeyboardAvoidingView style={styles.container}>
				<Image
					style={{
						width: 300,
						height: 170,
						marginVertical: 20,
					}}
					resizeMode={"cover"}
					source={require("../assets/flclogo2.jpg")}
				/>
				<Text
					style={{
						fontSize: 30,
					}}
				>
					Contact Information
				</Text>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.background}>
						<FormInput
							placeholder={"First Name"}
							onChangeText={onChangeText("firstname")}
							error={error.firstname.message}
						/>
						<FormInput
							placeholder={"Last Name"}
							onChangeText={onChangeText("lastname")}
							error={error.lastname.message}
						/>
						<FormInput
							placeholder={"Phone Number"}
							keyboardType="phone-pad"
							onChangeText={onChangeText("phonenumber")}
							error={error.phonenumber.message}
						/>
						<FormInput
							placeholder={"Whatsapp Number"}
							keyboardType="phone-pad"
							onChangeText={onChangeText("whatsappnumber")}
							error={error.whatsappnumber.message}
						/>
						<FormInput
							placeholder={"Address"}
							onChangeText={onChangeText("address")}
							error={error.address.message}
						/>
						{formData.dateofbirth ? (
							<View
								style={{
									flexDirection: "row",
									height: 45,
									width: 280,
									borderRadius: 10,
									justifyContent: "space-between",
									marginBottom: 15,
								}}
							>
								<FormInput
									placeholder="Date of Birth"
									value={formData.dateofbirth}
									styles={{
										width: 120,
										textAlign: "center",
									}}
									editable={false}
									onChangeText={onChangeText}
								/>
								<CustomButton
									label="CLEAR"
									onPress={() =>
										setFormData({
											...formData,
											dateofbirth: "",
										})
									}
									styles={{ width: 120 }}
									labelStyle={{ fontSize: 18 }}
								/>
							</View>
						) : (
							<CustomButton
								label="Choose Date of Birth"
								onPress={() => setOpenPicker(true)}
								styles={{
									width: 280,
									height: 45,
									marginBottom: 10,
								}}
								labelStyle={{ fontSize: 18 }}
							/>
						)}

						{openPicker && (
							<DateTimePicker
								testID="dateTimePicker"
								onChange={onDateChange}
								value={new Date()}
								mode="date"
							/>
						)}
						<View
							style={{
								width: 280,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center"
							}}
						>
							<CustomButton
								label="Pick an Image"
								styles={{
									width: 120,
									height: 35,
									backgroundColor: "transparent",
									borderWidth: 1,
									borderColor: "#e60000",
								}}
								labelStyle={{
									fontSize: 18,
									color: "#000",
								}}
								onPress={pickImage}
							/>
							{formData.image && <Feather
								name="check-circle"
								size={17}
								color="#e60000"
							/>}
							<CustomButton
								label="Take a Picture"
								styles={{
									width: 120,
									height: 35,
									backgroundColor: "transparent",
									borderWidth: 1,
									borderColor: "#e60000",
								}}
								labelStyle={{
									fontSize: 18,
									color: "#000",
								}}
								onPress={takeImage}
							/>
						</View>
						<CustomButton
							label="Submit"
							styles={{
								width: 280,
								height: 40,
								marginTop: 20,
								backgroundColor: "#f50f0f",
								borderWidth: 0,
							}}
							labelStyle={{
								fontSize: 20,
								fontWeight: "bold",
								color: "white",
							}}
							onPress={onSubmit}
							disabled={disableButton}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	background: {
		width: "100%",
		alignItems: "center",
		paddingVertical: 20,
	},
});
