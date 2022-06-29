import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const WelcomeText = ({ styles, navigation }) => {
	const { width, height } = Dimensions.get("screen");
    
	return (
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
				A church of Young and Vibrant people full of First Love for the
				Lord.
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
					navigation.navigate("Register");
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
						color: "#eb1d1d",
						textDecorationLine: "underline",
					}}
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					{" "}
					Log in
				</Text>
			</Text>
		</View>
	);
};

export default WelcomeText;
