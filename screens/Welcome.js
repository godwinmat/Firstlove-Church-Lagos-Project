import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image,
	StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Lato_400Regular,
	Lato_700Bold,
} from "@expo-google-fonts/lato";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Welcome = ({ navigation }) => {
	const [appIsReady, setAppIsReady] = useState(false);

	const { width, height } = Dimensions.get("screen");

	useEffect(() => { 
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await Font.loadAsync({
					Lato_400Regular,
					Lato_700Bold,
					PTSans_400Regular,
					PTSans_700Bold,
				});
				await SplashScreen.hideAsync() 
			} catch (error) {
				console.log(error);
			} finally {
				setAppIsReady(true);
			}
		}
		prepare();
		return () => {
			setAppIsReady(false)
		}
	}, []);

	if (!appIsReady) {
		return null;
	}
	return (
		<SafeAreaView>
			<StatusBar
				barStyle="light-content"
				backgroundColor={"black"}
				translucent
				animated
			/>

			<View style={{ height, width, backgroundColor: "black" }} >
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
					<Image
						resizeMode="cover"
						source={require("../assets/images/flclogo5.png")}
						style={{
							position: "absolute",
							top: 10,
							width: 270,
							height: 270,
							left: width / 2 - 135,
						}}
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
						A church of Young and Vibrant people full of First Love
						for the Lord.
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
								// setLoginModal(true)
								navigation.navigate("Login");
							}}
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
});
