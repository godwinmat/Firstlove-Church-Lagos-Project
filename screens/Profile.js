import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import Animated, { FadeIn } from "react-native-reanimated";

const Profile = ({ navigation }) => {
	const { colors, dark } = useTheme();
	return (
		<Animated.View>
			<NavBar navigation={navigation} navLabel="Profile" />
		</Animated.View>
	);
};

export default Profile;
