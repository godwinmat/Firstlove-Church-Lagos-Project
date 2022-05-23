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
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { FormInput, PasswordInput } from "../components/utility";

const Forgottenpassword = ({ navigation }) => {
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
							Forgotten{"\n"}Password?
						</Text>
						<FormInput
							placeholder={"Phone Number"}
							styles={styles.input}
							keyboardType="phone-pad"
						/>
						<PasswordInput
							placeholder={"New password"}
							styles={styles.input}
							secureTextEntry={true}
						/>
						<PasswordInput
							placeholder={"Confirm new password"}
							styles={styles.input}
							secureTextEntry={true}
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
								paddingVertical: 20,
							}}
							onPress={() => {
								navigation.navigate("Login");
							}}
						>
							Login
						</Text>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

export default Forgottenpassword;

const styles = StyleSheet.create({
	input: {
		marginBottom: 5,
	},
});
