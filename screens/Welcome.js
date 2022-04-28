import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image,
	StatusBar,
	Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import {
	useFonts,
	Lato_400Regular,
	Lato_700Bold,
} from "@expo-google-fonts/lato";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import { AntDesign } from "@expo/vector-icons";
import { FormInput } from "../components/utility";

const Welcome = ({ navigation }) => {
	const [loginModal, setLoginModal] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);
	const [forgottenPasswordModal, setForgottenPasswordModal] = useState(false);
	let [fontsLoaded] = useFonts({
		Lato_400Regular,
		Lato_700Bold,
		PTSans_400Regular,
		PTSans_700Bold,
	});

	const { width, height } = Dimensions.get("screen");

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<SafeAreaView>
			<StatusBar
				barStyle="light-content"
				backgroundColor={"black"}
				translucent
				animated
			/>
			{/* Register Modal */}
			<Modal
				animationType="slide"
				transparent
				visible={registerModal}
				onRequestClose={() => {
					setRegisterModal(false);
				}}
			>
				<View
					style={{
						width: width * 0.98,
						height: height * 0.955,
						backgroundColor: "rgba(0, 0, 0, 1)",
						position: "absolute",
						bottom: 0,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						alignSelf: "center",
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
								onPress={() => setRegisterModal(false)}
							/>
						</View>

						<Text
							style={{
								fontFamily: "Lato_700Bold",
								fontSize: 35,
								paddingBottom: 40,
								color: "#343a40",
							}}
						>
							Register a new {"\n"}Bacenta Account{"\n"}and Start
							Bussing!
						</Text>
						<FormInput
							placeholder={"Username"}
							styles={styles.input}
						/>
						<FormInput
							placeholder={"Phone Number"}
							styles={styles.input}
						/>
						<FormInput
							placeholder={"Password"}
							styles={styles.input}
						/>
						<FormInput
							placeholder={"Confirm Password"}
							styles={styles.input}
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
									backgroundColor: "#eb1d1d",
									width: 50,
									height: 50,
									borderRadius: 25,
									justifyContent: "center",
									alignItems: "center",
								}}
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
								paddingTop: 20,
							}}
							onPress={() => {
								setRegisterModal(false);
								setLoginModal(true);
							}}
						>
							Login
						</Text>
					</View>
				</View>
			</Modal>
			{/* Login Modal */}
			<Modal
				animationType="slide"
				transparent
				visible={loginModal}
				onRequestClose={() => {
					setLoginModal(false);
				}}
			>
				<View
					style={{
						width: width * 0.98,
						height: height * 0.955,
						backgroundColor: "rgba(0, 0, 0, 1)",
						position: "absolute",
						bottom: 0,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						alignSelf: "center",
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
								onPress={() => setLoginModal(false)}
							/>
						</View>

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
						/>
						<FormInput
							placeholder={"Password"}
							styles={styles.input}
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
									backgroundColor: "#eb1d1d",
									width: 50,
									height: 50,
									borderRadius: 25,
									justifyContent: "center",
									alignItems: "center",
								}}
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
									setLoginModal(false);
									setRegisterModal(true);
								}}
							>
								Register
							</Text>
							<Text
								style={{
									fontFamily: "Lato_400Regular",
									fontSize: 16,
									textDecorationLine: "underline",
									paddingTop: 20,
								}}
								onPress={() => {
									setLoginModal(false);
									setForgottenPasswordModal(true);
								}}
							>
								Forgot password?
							</Text>
						</View>
					</View>
				</View>
			</Modal>
			{/* Forgotten Password Modal */}
			<Modal
				animationType="slide"
				transparent
				visible={forgottenPasswordModal}
				onRequestClose={() => {
					setForgottenPasswordModal(false);
				}}
			>
				<View
					style={{
						width: width * 0.98,
						height: height * 0.955,
						backgroundColor: "rgba(0, 0, 0, 1)",
						position: "absolute",
						bottom: 0,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						alignSelf: "center",
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
								onPress={() => setForgottenPasswordModal(false)}
							/>
						</View>

						<Text
							style={{
								fontFamily: "Lato_700Bold",
								fontSize: 35,
								paddingBottom: 60,
								color: "#343a40",
							}}
						>
							Forgotten{"\n"}Password?
						</Text>
						<FormInput
							placeholder={"Phone Number"}
							styles={styles.input}
						/>
						<FormInput
							placeholder={"New password"}
							styles={styles.input}
						/>
						<FormInput
							placeholder={"Confirm new password"}
							styles={styles.input}
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
								Reset
							</Text>
							<TouchableOpacity
								style={{
									backgroundColor: "#eb1d1d",
									width: 50,
									height: 50,
									borderRadius: 25,
									justifyContent: "center",
									alignItems: "center",
								}}
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
								paddingTop: 20,
							}}
							onPress={() => {
								setForgottenPasswordModal(false);
								setLoginModal(true);
							}}
						>
							Login
						</Text>
					</View>
				</View>
			</Modal>

			<View style={{ height, width, backgroundColor: "black" }}>
				<View style={{ width: "100%", height: height / 2 - 50 }}>
					<Image
						style={{
							width,
							height,
						}}
						blurRadius={1}
						resizeMode={"cover"}
						source={require("../assets/images/img4.jpg")}
					/>
				</View>
				<View style={styles.welcometextContainer}>
					<Text style={styles.welcometext}>Welcome</Text>
					<Text style={styles.welcometext}>to the First Love</Text>
					<Text style={styles.welcometext}>Church Lagos</Text>
					<Text
						style={{
							paddingTop: 15,
							paddingBottom: 40,
							fontFamily: "PTSans_400Regular",
							fontSize: 17,
							color: "white",
						}}
					>
						The firstlove church is a church of young and vibrant
						people full of first love for the Lord.
					</Text>
					<TouchableOpacity
						style={{
							width: width * 0.8,
							height: 43,
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 20,
							backgroundColor: "white",
							alignSelf: "center",
						}}
						onPress={() => {
							setRegisterModal(true);
						}}
					>
						<Text
							style={{
								fontFamily: "PTSans_400Regular",
								fontSize: 18,
								color: "red",
							}}
						>
							Register now
						</Text>
					</TouchableOpacity>
					<Text
						style={{
							fontFamily: "PTSans_400Regular",
							paddingVertical: 25,
							alignSelf: "center",
							color: "white",
							fontSize: 16,
						}}
					>
						Already a bacenta leader?
						<Text
							style={{
								color: "white",
							}}
							onPress={() => setLoginModal(true)}
						>
							{" "}
							Log in
						</Text>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Welcome;

const styles = StyleSheet.create({
	welcometextContainer: {
		paddingHorizontal: 15,
	},
	welcometext: {
		fontFamily: "PTSans_700Bold",
		fontSize: 46,
		color: "white",
	},
	input: {
		marginBottom: 5,
	},
});
