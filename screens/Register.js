import {
	View,
	Text,
	Dimensions,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useCallback } from "react";
import validator from "validator";

import { AntDesign } from "@expo/vector-icons";
import { showToastWithGravity } from "../components/utility";

import { useDispatch } from "react-redux";
import {
	registerBacentaLeader,
	verifyUsername,
	verifyPhone,
	verifyEmail,
	checkIfUserExist,
} from "../store/reducers/userReducers";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import RegisterMain from "../components/RegisterMain";

const Register = ({ navigation }) => {
	const { colors, dark } = useTheme();
	const dispatch = useDispatch();
	const [disableButton, setDisableButton] = useState(true);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [modalAreaVisible, setModalAreaVisible] = useState(false);
	const [query, setQuery] = useState([]);
	const [dropDownValue, setDropDownValue] = useState("");
	const [isEmpty, setIsEmpty] = useState("");
	const [userDetails, setUserDetails] = useState({ fullname: "" });
	const [registerData, setRegisterData] = useState({
		username: "",
		email: "",
		password: "",
		confirmpassword: "",
	});

	const onChange = async (val) => {
		if (val !== "") {
			setIsEmpty(val);
			const result = await dispatch(
				checkIfUserExist({ fullname: val })
			).unwrap();
			if (result !== []) {
				setQuery(result);
				return;
			}
		}
		setQuery([]);
	};

	const [error, setError] = useState({
		username: {
			state: false,
			message: "",
		},
		email: {
			state: false,
			message: "",
		},
		phonenumber: {
			state: false,
			message: "",
		},
		password: {
			state: false,
			message: "",
		},
		confirmpassword: {
			state: false,
			message: "",
		},
	});

	const onSubmit = async () => {
		const result = await dispatch(
			registerBacentaLeader({
				logindetails: {
					username: registerData.username,
					phonenumber: phoneNumber,
					area: dropDownValue,
					email: registerData.email,
					password: registerData.password,
				},
				userdetails: userDetails,
			})
		).unwrap();
		showToastWithGravity(result);
		navigation.navigate("Login");
	};

	useFocusEffect(
		useCallback(() => {
			return () => {
				setRegisterData({
					username: "",
					email: "",
					phonenumber: "",
					password: "",
					confirmpassword: "",
				});
			};
		}, [])
	);

	const changeSubmitButtonState = () => {
		if (
			!error.username.state &&
			registerData.username.length > 0 &&
			phoneNumber.length > 0 &&
			!error.password.state &&
			registerData.password.length > 0 &&
			!error.confirmpassword.state &&
			registerData.confirmpassword.length > 0
		) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	};

	useEffect(() => {
		if (
			validator.equals(
				registerData.password,
				registerData.confirmpassword
			)
		) {
			setError((prevState) => ({
				...prevState,
				confirmpassword: { state: false, message: "" },
			}));
		} else {
			if (validator.isEmpty(registerData.confirmpassword)) {
				setError((prevState) => ({
					...prevState,
					confirmpassword: { state: false, message: "" },
				}));
			} else {
				setError((prevState) => ({
					...prevState,
					confirmpassword: {
						state: true,
						message: "Passwords must be equal.",
					},
				}));
			}
		}
	}, [registerData.password]);

	useEffect(() => {
		setTimeout(changeSubmitButtonState, 1000);
	}, [error]);

	const onChangeText = (name) => {
		return (val) => {
			val = val.trim();
			setRegisterData((prevState) => {
				return { ...prevState, [name]: val };
			});

			validateInput(name, val);
		};
	};

	const validateInput = async (name, val) => {
		switch (name) {
			case "username":
				if (
					validator.isAlpha(val, "en-US", {
						ignore: "s",
					})
				) {
					if (1 <= val.length && val.length < 5) {
						setError((prevState) => ({
							...prevState,
							username: {
								state: true,
								message: "Username must at least 5 characters.",
							},
						}));
					} else {
						const result = await dispatch(
							verifyUsername({
								username: val,
							})
						).unwrap();
						if (result === "username already exists.") {
							setError((prevState) => ({
								...prevState,
								username: {
									state: true,
									message: "Username is taken already.",
								},
							}));
						} else {
							setError((prevState) => ({
								...prevState,
								username: { state: false, message: "" },
							}));
						}
					}
				} else {
					setError((prevState) => ({
						...prevState,
						username: {
							state: true,
							message: "Username can only be alphabets.",
						},
					}));
				}
				if (validator.isEmpty(val)) {
					setError((prevState) => ({
						...prevState,
						username: {
							state: true,
							message: "Username is required.",
						},
					}));
				}
				break;
			case "email":
				if (validator.isEmail(val)) {
					const result = await dispatch(
						verifyEmail({
							email: val,
						})
					).unwrap();
					if (result === "email already exists.") {
						setError((prevState) => ({
							...prevState,
							email: {
								state: true,
								message: "Email address is already taken.",
							},
						}));
					} else {
						setError((prevState) => ({
							...prevState,
							email: { state: false, message: "" },
						}));
					}
				} else {
					setError((prevState) => ({
						...prevState,
						email: {
							state: true,
							message: "Invalid email address.",
						},
					}));
				}
				if (validator.isEmpty(val)) {
					setError((prevState) => ({
						...prevState,
						email: {
							state: true,
							message: "Email is required.",
						},
					}));
				}
				break;
			case "password":
				if (
					validator.isStrongPassword(val, {
						minLength: 8,
						minSymbols: 0,
					})
				) {
					setError((prevState) => ({
						...prevState,
						password: { state: false, message: "" },
					}));
				} else {
					setError((prevState) => ({
						...prevState,
						password: {
							state: true,
							message:
								"Password must contain at least 8 characters, an uppercase letter, a lowercase letter and a number.",
						},
					}));
				}
				if (validator.isEmpty(val)) {
					setError((prevState) => ({
						...prevState,
						password: {
							state: true,
							message: "Password is required.",
						},
						confirmpassword: { state: false, message: "" },
					}));
					setRegisterData((prevState) => ({
						...prevState,
						confirmpassword: "",
					}));
				}
				break;
			case "confirmpassword":
				if (validator.equals(val, registerData.password)) {
					setError((prevState) => ({
						...prevState,
						confirmpassword: { state: false, message: "" },
					}));
				} else {
					setError((prevState) => ({
						...prevState,
						confirmpassword: {
							state: true,
							message: "Passwords must be equal.",
						},
					}));
				}
				break;
			default:
				break;
		}
		if (!validator.isEmpty(phoneNumber)) {
			if (validator.isMobilePhone(phoneNumber, "en-NG")) {
				const result = await dispatch(
					verifyPhone({
						phonenumber: phoneNumber,
					})
				).unwrap();
				if (result === "phonenumber already exists.") {
					setError((prevState) => ({
						...prevState,
						phonenumber: {
							state: true,
							message: "Phone number is already taken.",
						},
					}));
				} else {
					setError((prevState) => ({
						...prevState,
						phonenumber: { state: false, message: "" },
					}));
				}
			} else {
				setError((prevState) => ({
					...prevState,
					phonenumber: {
						state: true,
						message: "Phone number must be correct.",
					},
				}));
			}
		}
	};

	const { width, height } = Dimensions.get("screen");

	return (
		<SafeAreaView
			style={{
				position: "relative",
				width,
				height,
				backgroundColor: "rgba(0, 0, 0, 1)",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Image
				source={require("../assets/images/flclogo3.jpg")}
				resizeMode={"cover"}
				style={{
					position: "absolute",
					width,
					height: 300,
				}}
			/>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(255,255,255,0.85)",
					position: "absolute",
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
					paddingHorizontal: 35,
					paddingVertical: 30,
				}}
			>
				<View
					style={{
						marginVertical: 20,
						backgroundColor: "#ced4da",
						width: 36,
						height: 36,
						borderRadius: 18,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AntDesign
						name="close"
						size={18}
						color="black"
						onPress={() => navigation.goBack()}
					/>
				</View>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					styles={{
						flex: 1,
						backgroundColor: "#fff",
						alignItems: "center",
					}}
				>
					<RegisterMain
						registerData={registerData}
						error={error}
						onChange={onChange}
						onChangeText={onChangeText}
						onSubmit={onSubmit}
						disableButton={disableButton}
						setDisableButton={setDisableButton}
						phoneNumber={phoneNumber}
						setPhoneNumber={setPhoneNumber}
						userDetails={userDetails}
						setUserDetails={setUserDetails}
						modalAreaVisible={modalAreaVisible}
						setModalAreaVisible={setModalAreaVisible}
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						query={query}
						setQuery={setQuery}
						dropDownValue={dropDownValue}
						setDropDownValue={setDropDownValue}
						isEmpty={isEmpty}
						setIsEmpty={setIsEmpty}
					/>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

export default Register;

const styles = StyleSheet.create({
	input: {
		marginBottom: 5,
	},
});
