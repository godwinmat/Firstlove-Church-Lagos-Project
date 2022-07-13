import { Dimensions, ToastAndroid } from "react-native";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";

const { width, height } = Dimensions.get("screen");

export const convertBooleanStringToBoolean = (value) => {
	if (value == "true") {
		return true;
	} else {
		return false;
	}
};

export const Timeout = (time) => {
	let controller = new AbortController();
	setTimeout(() => controller.abort(), time * 1000);
	return controller;
};

export const showToastWithGravity = (message) => {
	ToastAndroid.showWithGravity(
		message,
		ToastAndroid.LONG,
		ToastAndroid.BOTTOM
	);
};
