import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import Profile from "../screens/Profile";
import Editprofile from "../screens/Editprofile";
import { StatusBar, TouchableOpacity, View } from "react-native";
import SmallText from "../components/SmallText";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const ProfileNavigator = () => {
	const { colors, dark } = useTheme();
	return (
		<Stack.Navigator
			screenOptions={{
				animation: "slide_from_right",
			}}
		>
			{/* <Stack.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
				}}
			/> */}
			<Stack.Screen
				name="Edit Profile"
				component={Editprofile}
				options={{
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerShadowVisible: false,
					headerTitleStyle: {
						fontFamily: "PTSans_400Regular",
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export default ProfileNavigator;
