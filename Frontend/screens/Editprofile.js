import {
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Image,
	StatusBar,
	TouchableHighlight,
	Text,
} from "react-native";
import React, { useState, useEffect, useReducer } from "react";
import { useTheme } from "@react-navigation/native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Surface } from "react-native-paper";
import validator from "validator";

import sizes from "../components/constants/sizes";
import InputUnderline from "../components/InputUnderline";
import { getAreas } from "../store/reducers/areaReducers";
import { userSelector } from "../store/selectors";
import SmallText from "../components/SmallText";
import OverlaySelection from "../components/OverlaySelection";
import CustomModal from "../components/CustomModal";
import { formDataSource } from "../helpers/editProfile/data";
import { showToastWithGravity } from "../components/utility";
import { updateProfile } from "../store/reducers/userReducers";
import { Controller, useForm } from "react-hook-form";

const Editprofile = ({ navigation }) => {
	const { colors, dark } = useTheme();
	const [visible, setVisible] = useState(false);
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const { width, height } = Dimensions.get("screen");
	const [areas, setAreas] = useState([]);
	const { control, handleSubmit, setValue, watch } = useForm({
		defaultValues: formDataSource(),
	});

	const genderCallback = (name) => {
		setValue("gender", name);
	};
	const areaCallback = (name) => {
		setValue("area", name);
	};
	const genderItems = [
		{
			_id: "male",
			name: "Male",
			callback: genderCallback,
		},
		{
			_id: "female",
			name: "Female",
			callback: genderCallback,
		},
	];

	const getData = async () => {
		const result = await dispatch(getAreas()).unwrap();
		if (result !== []) {
			var list = [];
			result.forEach((item) => {
				list.push({
					...item,
					callback: areaCallback,
				});
			});
			setAreas(list);
			return;
		}
	};

	const onSubmit = async (data) => {
		const formData = {};
		const dob = `${user.dateofbirth.day}-${user.dateofbirth.month}-${user.dateofbirth.year}`;
		if (data.firstname !== user.firstname)
			formData.firstname = data.firstname;
		if (data.lastname !== user.lastname) formData.lastname = data.lastname;
		if (data.phonenumber !== user.phonenumber)
			formData.phonenumber = data.phonenumber;
		if (data.whatsappnumber !== user.whatsappnumber)
			formData.whatsappnumber = data.whatsappnumber;
		if (data.address !== user.address) formData.address = data.address;
		if (data.email !== user.email) formData.email = data.email;
		if (data.area !== user.area) formData.area = data.area;
		if (data.gender !== user.gender) formData.gender = data.gender;
		if (data.image !== user.image) formData.image = data.image;
		if (data.dateofbirth !== dob) formData.dateofbirth = data.dateofbirth;
		formData.userid = user.userid;
		const list = user.image.split("/");
		const publicId = list[list.length - 1].split(".")[0];
		const result = await dispatch(
			updateProfile({ formData, publicId })
		).unwrap();
		showToastWithGravity(result.message);
		navigation.goBack();
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
			setValue("image", image);
		}
	};

	const takeImage = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
			base64: true,
		});

		if (!result.cancelled) {
			// console.log(result.uri);
			const imgExtension = result.uri.split(".")[-1];
			const image = `data:image/${imgExtension};base64,${result.base64}`;
			setValue("image", image);
		}
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={handleSubmit(onSubmit)}>
					<SmallText
						style={{
							textTransform: "uppercase",
							color: colors.primary,
						}}
					>
						update
					</SmallText>
				</TouchableOpacity>
			),
		});
	}, []);

	useEffect(() => {
		getData();
	}, []);

	return (
		<ScrollView
			style={{
				width,
				height,
				marginBottom: 20,
			}}
			contentContainerStyle={{
				alignItems: "center",
				paddingBottom: 20,
			}}
			showsVerticalScrollIndicator={false}
		>
			<Surface
				elevation={10}
				style={{
					width: 80,
					height: 80,
					borderRadius: 40,
					marginVertical: 10,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Controller
					control={control}
					name="image"
					render={({ field: { value } }) => (
						<Image
							source={{ uri: value }}
							resizeMode="cover"
							style={{
								width: "100%",
								height: "100%",
								borderRadius: 40,
								marginVertical: 10,
							}}
						/>
					)}
				/>
			</Surface>

			<CustomModal
				onDismiss={() => setVisible(false)}
				visible={visible}
				modalWrapperStyle={{
					justifyContent: "center",
					alignItems: "center",
				}}
				contentContainerStyle={{
					position: "absolute",
					bottom: 50,

					width: 320,
					backgroundColor: dark ? "#333" : colors.background,
					borderRadius: 15,
				}}
			>
				<OverlaySelection
					colors={colors}
					dark={dark}
					closeModal={() => setVisible(false)}
					takeImage={takeImage}
					pickImage={pickImage}
				/>
			</CustomModal>
			<TouchableHighlight
				onPress={() => setVisible(true)}
				underlayColor={"rgba(255,0,0,0.1)"}
				style={{ borderRadius: 13, marginVertical: 5 }}
			>
				<View>
					<SmallText
						style={{
							textTransform: "uppercase",
							color: colors.primary,
							fontSize: sizes.smallest,
							paddingHorizontal: 13,
							paddingVertical: 7,
							backgroundColor: "rgba(255,0,0,0.2)",
							borderRadius: 15,
						}}
					>
						change photo
					</SmallText>
				</View>
			</TouchableHighlight>
			<View
				style={{
					marginVertical: 10,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<Ionicons
						name="person-outline"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						placeholder={"First name"}
						name="firstname"
						control={control}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"default"}
						style={{
							fontSize: sizes.smaller,
							width: 0.6 * width,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						rules={{
							required: "First name is required.",
							minLength: {
								value: 3,
								message:
									"Firstname cannot be below 3 characters.",
							},
							maxLength: {
								value: 15,
								message:
									"Firstname cannot be above 15 characters.",
							},
							validate: (value) => {
								if (!validator.isAlpha(value, "en-US")) {
									return "First name can only contain alphabets.";
								}
							},
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<Ionicons
						name="person-outline"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="lastname"
						control={control}
						placeholder={"Last name"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"default"}
						style={{
							fontSize: sizes.smaller,
							width: 0.7 * width,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						rules={{
							required: "Last name is required.",
							minLength: {
								value: 3,
								message:
									"Firstname cannot be below 3 characters.",
							},
							maxLength: {
								value: 15,
								message:
									"Firstname cannot be above 15 characters.",
							},
							validate: (value) => {
								if (!validator.isAlpha(value, "en-US")) {
									return "Last name can only contain alphabets.";
								}
							},
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<AntDesign
						name="phone"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="phonenumber"
						control={control}
						placeholder={"Phone number"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"phone-pad"}
						style={{
							fontSize: sizes.smaller,
							width: 0.7 * width,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						rules={{
							required: "Phone number is required.",
							validate: (value) => {
								if (!validator.isMobilePhone(value, "en-NG")) {
									return "Phone number must be correct.";
								}
							},
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<FontAwesome
						name="whatsapp"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="whatsappnumber"
						control={control}
						placeholder={"Whatsapp number"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"phone-pad"}
						style={{
							fontSize: sizes.smaller,
							width: 0.7 * width,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						rules={{
							required: "Whatsapp number is required.",
							validate: (value) => {
								if (!validator.isMobilePhone(value, "en-NG")) {
									return "Whatsapp number must be correct.";
								}
							},
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<AntDesign
						name="home"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="address"
						control={control}
						placeholder={"Home address"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"default"}
						style={{
							fontSize: sizes.smaller,
							width: 0.7 * width,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						rules={{
							required: "Address is required.",
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<AntDesign
						name="mail"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="email"
						control={control}
						placeholder={"Email address"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"email-address"}
						style={{
							fontSize: sizes.smaller,
							width: 0.7 * width,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						rules={{
							required: "Email address is required.",
							validate: (value) => {
								if (!validator.isEmail(value)) {
									return "Email address must be correct.";
								}
							},
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<FontAwesome
						name="birthday-cake"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="dateofbirth"
						control={control}
						placeholder={"Date of birth"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"email-address"}
						style={{
							fontSize: sizes.smaller,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						isCalendar
						dropDownItems={genderItems}
						setDate={(dateofbirth) => {
							setValue("dateofbirth", dateofbirth);
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<Ionicons
						name="location"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="area"
						control={control}
						placeholder={"Area"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"email-address"}
						style={{
							fontSize: sizes.smaller,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						isDropDown
						dropDownItems={areas}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 8,
					}}
				>
					<Ionicons
						name="person-outline"
						color={colors.text}
						size={sizes.big}
						style={{ paddingRight: 20 }}
					/>
					<InputUnderline
						name="gender"
						control={control}
						placeholder={"Gender"}
						placeholderTextColor={colors.lowerText}
						underlineColor={colors.primary}
						selectionColor={colors.primary}
						keyboardType={"email-address"}
						style={{
							fontSize: sizes.smaller,
							color: colors.text,
						}}
						containerStyle={{
							width: 0.7 * width,
						}}
						isDropDown
						dropDownItems={genderItems}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default Editprofile;
