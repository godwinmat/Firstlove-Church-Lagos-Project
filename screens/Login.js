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

import { AntDesign } from "@expo/vector-icons";
import { FormInput, PasswordInput } from "../components/utility";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/reducers/userReducers";
import { useFocusEffect } from "@react-navigation/native";

const Login = ({ navigation }) => {

	const { width, height } = Dimensions.get("screen");
	const [disableButton, setDisableButton] = useState(true);
	const dispatch = useDispatch();

	const [loginData, setLoginData] = useState({
		userorphone: "",
		password: "",
	});

	const [error, setError] = useState({
		userorphone: {
			state: false,
			message: "",
		},
		password: {
			state: false,
			message: "",
		},
	});

	const changeSubmitButtonState = () => {
		if (loginData.userorphone.length > 0 && loginData.password.length > 0) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	};

	useFocusEffect(
		useCallback(() => {
			return () => {
				setLoginData({
					userorphone: "",
					password: "",
				});
			};
		}, [])
	);

	useEffect(() => {
		changeSubmitButtonState();
	}, [loginData]);

	const onChangeText = (name) => {
		return (val) => {
			setLoginData({ ...loginData, [name]: val });
		};
	};

	const onSubmit = async () => {
		const result = await dispatch(
			loginUser({
				userorphone: loginData.userorphone,
				password: loginData.password,
			})
		).unwrap();

		if (result.message === "error") {
			console.log("error");
		} else if (
			result.message === "incorrect username." ||
			result.message === "incorrect phone number."
		) {
			setError({
				userorphone: {
					state: true,
					message: "Incorrect username or phonenumber.",
				},
				password: { state: false, message: "" },
			});

			setLoginData({
				...loginData,
				password: "",
			});
		} else if (result.message === "incorrect password.") {
			setError((prevState) => ({
				...prevState,
				password: { state: true, message: "Incorrect password." },
			}));
			setLoginData({
				...loginData,
				password: "",
			});
		} else {
			setError({
				userorphone: { state: false, message: "" },
				password: { state: false, message: "" },
			});
		}
	};

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
					position: "absolute",
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					backgroundColor: "rgba(255,255,255,0.85)",
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
								paddingBottom: 60,
								color: "#343a40",
							}}
						>
							Welcome{"\n"}Back
						</Text>
						<FormInput
							placeholder={"Username or Phone Number"}
							styles={styles.input}
							onChangeText={onChangeText("userorphone")}
							error={error.userorphone.message}
							defaultValue={loginData.userorphone}
						/>
						<PasswordInput
							placeholder={"Password"}
							styles={styles.input}
							onChangeText={onChangeText("password")}
							error={error.password.message}
							defaultValue={loginData.password}
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
								Login
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
								onPress={onSubmit}
							>
								<AntDesign
									name="right"
									size={25}
									color="#f8f9fa"
								/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								style={{
									fontFamily: "Lato_400Regular",
									fontSize: 16,
									textDecorationLine: "underline",
									paddingTop: 20,
								}}
								onPress={() => {
									navigation.navigate("Register");
								}}
							>
								Register
							</Text>
							<Text
								style={{
									fontFamily: "Lato_400Regular",
									fontSize: 16,
									textDecorationLine: "underline",
									paddingVertical: 20,
								}}
								onPress={() => {
									navigation.navigate("Forgottenpassword");
								}}
							>
								Forgot password?
							</Text>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	input: {
		marginBottom: 5,
	},
});
