import {
	View,
	Text,
	Dimensions,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useCallback } from "react";
import validator from "validator";

import { AntDesign } from "@expo/vector-icons";
import { FormInput, PasswordInput } from "../components/utility";

import { useDispatch } from "react-redux";
import {
	registerBacentaLeader,
	verifyUsername,
	verifyPhone,
} from "../store/reducers/userReducers";
import { useFocusEffect } from "@react-navigation/native";

const Register = ({ navigation }) => {
	const dispatch = useDispatch();
	const [disableButton, setDisableButton] = useState(true);
	const [registerData, setRegisterData] = useState({
		username: "",
		phonenumber: "",
		password: "",
		confirmpassword: "",
	});

	const [error, setError] = useState({
		username: {
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
				username: registerData.username,
				phonenumber: registerData.phonenumber,
				password: registerData.password,
			})
		).unwrap();
		if (result === "error") {
			console.log("error");
			return;
		}
		navigation.navigate("Login");
	};

	useFocusEffect(
		useCallback(() => {
			return () => {
				setRegisterData({
					username: "",
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
			!error.phonenumber.state &&
			registerData.phonenumber.length > 0 &&
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
						if (result === "error") {
							console.log("error");
						} else if (result === "username already exists.") {
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
			case "phonenumber":
				if (validator.isMobilePhone(val, "en-NG")) {
					const result = await dispatch(
						verifyPhone({
							phonenumber: val,
						})
					).unwrap();
					if (result === "error") {
						console.log("error");
					} else if (result === "phonenumber already exists.") {
						setError((prevState) => ({
							...prevState,
							phonenumber: {
								state: true,
								message: "Phone number is taken already.",
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
				if (validator.isEmpty(val)) {
					setError((prevState) => ({
						...prevState,
						phonenumber: {
							state: true,
							message: "Phone number is required.",
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
						marginVertical: 40,
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
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text
							style={{
								fontFamily: "Lato_700Bold",
								fontSize: 35,
								paddingBottom: 40,
								color: "#343a40",
							}}
						>
							Register a new {"\n"}Bacenta Account{"\n"}and Start
							Busing!
						</Text>
						<View>
							<FormInput
								placeholder={"Username"}
								styles={styles.input}
								onChangeText={onChangeText("username")}
								error={error.username.message}
								defaultValue={registerData.username}
							/>
							<FormInput
								placeholder={"Phone Number"}
								styles={styles.input}
								keyboardType="phone-pad"
								onChangeText={onChangeText("phonenumber")}
								error={error.phonenumber.message}
								defaultValue={registerData.phonenumber}
							/>
							<PasswordInput
								placeholder={"Password"}
								styles={styles.input}
								onChangeText={onChangeText("password")}
								error={error.password.message}
								defaultValue={registerData.password}
							/>
							<PasswordInput
								placeholder={"Confirm Password"}
								styles={styles.input}
								onChangeText={onChangeText("confirmpassword")}
								error={error.confirmpassword.message}
								defaultValue={registerData.confirmpassword}
							/>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									marginVertical: 20,
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontFamily: "Lato_700Bold",
										fontSize: 25,
										color: "#343a40",
									}}
								>
									Register
								</Text>
								<TouchableOpacity
									style={{
										backgroundColor: disableButton
											? "#eee"
											: "#eb1d1d",
										width: 50,
										height: 50,
										borderRadius: 25,
										justifyContent: "center",
										alignItems: "center",
									}}
									disabled={disableButton}
									onPress={() => onSubmit()}
								>
									<AntDesign
										name="right"
										size={25}
										color="#f8f9fa"
									/>
								</TouchableOpacity>
							</View>
							<Text
								style={{
									fontFamily: "Lato_400Regular",
									fontSize: 16,
									textDecorationLine: "underline",
									paddingVertical: 20,
								}}
								onPress={() => {
									navigation.navigate("Login");
								}}
							>
								Login
							</Text>
						</View>
					</ScrollView>
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
