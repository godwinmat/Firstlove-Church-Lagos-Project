import { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToastWithGravity } from "../components/utility";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import validator from "validator";
import { Feather, AntDesign } from "@expo/vector-icons";
import { registerMember } from "../store/reducers/memberReducers";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import { memberSelector, userSelector } from "../store/selectors";
import FormInput from "../components/FormInput";
import DropDown from "../components/DropDown";
import CustomButton from "../components/CustomButton";
import NavBar from "../components/NavBar";

const Form = ({ navigation }) => {
	const dispatch = useDispatch();
	const member = useSelector(memberSelector);
	const [gender, setGender] = useState("");
	const [area, setArea] = useState("");
	const [isLeader, setIsLeader] = useState("");
	const { colors, dark } = useTheme();
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		phonenumber: "",
		whatsappnumber: "",
		address: "",
		dateofbirth: "",
		image: null,
		preset: "flclimages",
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
			formData.image !== null &&
			gender !== "" &&
			isLeader !== "" &&
			area !== ""
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
			default:
				break;
		}
	};

	const onSubmit = async () => {
		setDisableButton(true);
		const result = await dispatch(
			registerMember({ ...formData, area, gender, isLeader })
		).unwrap();
		setArea("");
		setGender("");
		setIsLeader("");
		setFormData({
			...formData,
			firstname: "",
			lastname: "",
			phonenumber: "",
			whatsappnumber: "",
			address: "",
			dateofbirth: "",
			image: null,
		});
		showToastWithGravity(result);
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
			base64: true,
		});

		if (!result.cancelled) {
			const imgExtension = result.uri.split(".")[-1];
			const image = `data:image/${imgExtension};base64,${result.base64}`;
			setFormData({ ...formData, image });
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
		<SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
			<NavBar navigation={navigation} navLabel="Register A Member" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "none"}
				style={{
					alignItems: "center",
					marginTop: 50,
				}}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps={"handled"}
					style={{}}
				>
					<View
						style={{
							width: "100%",
							paddingVertical: 20,
						}}
					>
						<FormInput
							placeholder={"First Name*"}
							onChangeText={onChangeText("firstname")}
							error={error.firstname.message}
							defaultValue={formData.firstname}
						/>
						<FormInput
							placeholder={"Last Name*"}
							onChangeText={onChangeText("lastname")}
							error={error.lastname.message}
							defaultValue={formData.lastname}
						/>
						<FormInput
							placeholder={"Phone Number"}
							keyboardType="phone-pad"
							onChangeText={onChangeText("phonenumber")}
							error={error.phonenumber.message}
							defaultValue={formData.phonenumber}
						/>
						<FormInput
							placeholder={"Whatsapp Number"}
							keyboardType="phone-pad"
							onChangeText={onChangeText("whatsappnumber")}
							error={error.whatsappnumber.message}
							defaultValue={formData.whatsappnumber}
						/>
						<DropDown
							placeholder={"Gender*"}
							data={[
								{ _id: "male", name: "Male" },
								{ _id: "female", name: "Female" },
							]}
							setValue={setGender}
							value={gender}
						/>

						<FormInput
							placeholder={"Address*"}
							onChangeText={onChangeText("address")}
							error={error.address.message}
							defaultValue={formData.address}
						/>
						<DropDown
							placeholder={"Area*"}
							setValue={setArea}
							value={area}
						/>
						<DropDown
							placeholder={"Are you a leader?*"}
							data={[
								{ _id: "yes", name: "Yes" },
								{ _id: "no", name: "No" },
							]}
							setValue={setIsLeader}
							value={isLeader}
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
									defaultValue={formData.dateofbirth}
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
								labelStyle={{ fontSize: 19 }}
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
								alignItems: "center",
							}}
						>
							<CustomButton
								label="Pick an Image"
								styles={{
									width: 125,
									height: 40,
									backgroundColor: "transparent",
									borderWidth: 1,
								}}
								labelStyle={{
									fontSize: 19,
								}}
								onPress={pickImage}
							/>
							{formData.image && (
								<Feather
									name="check-circle"
									size={17}
									color={colors.primary}
								/>
							)}
							<CustomButton
								label="Take a Picture"
								styles={{
									width: 125,
									height: 40,
									backgroundColor: "transparent",
									borderWidth: 1,
								}}
								labelStyle={{
									fontSize: 19,
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
								backgroundColor: colors.primary,
								borderWidth: 0,
							}}
							labelStyle={{
								fontSize: 21,
							}}
							onPress={onSubmit}
							disabled={disableButton}
							animating={member.registermemberloading}
						/>
					</View>
					{/* <Image source={{ uri: formData.image }} resizeMode={"cover"} style={{
						width: 50,
						height: 50
					}} /> */}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Form;
