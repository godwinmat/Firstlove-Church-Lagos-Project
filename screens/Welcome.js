import {
	View,
	StyleSheet,
	Dimensions,
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
import WelcomeText from "../components/WelcomeText";
import WelcomeBackground from "../components/WelcomeBackground";

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
				<WelcomeBackground />
				<WelcomeText styles={styles} navigation={navigation} />
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
