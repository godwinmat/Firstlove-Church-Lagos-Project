import { View, Text, StatusBar, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Graph from "../screens/Graph";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import Profile from "../screens/Profile";
import { useSelector } from "react-redux";
import MemberNavigator from "./MemberNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();
const HomeNavigator = ({ navigation }) => {
	const user = useSelector((state) => state["user"]);

	const { colors, dark } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				headerTitle: "",
				tabBarShowLabel: false,
				tabBarActiveTintColor: "#ff0000",
				tabBarStyle: {
					height: 60,
					width: "100%",
					alignSelf: "center",
				},
				tabBarIconStyle: {
					marginTop: 15,
				},
			}}
		>
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View
							style={{
								alignItems: "center",
								marginBottom: 10,
							}}
						>
							<MaterialIcons
								name="dashboard"
								size={22}
								color={focused ? color : colors.text}
								style={{}}
							/>
							{/* <Text
								style={{
									color: focused
										? colors.primary
										: colors.text,
									fontFamily: "PTSans_400Regular",
									fontSize: 12,
								}}
							>
								Dashboard
							</Text> */}
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Graph"
				component={Graph}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View
							style={{
								alignItems: "center",
								marginBottom: 10,
							}}
						>
							<MaterialIcons
								name="bar-chart"
								size={22}
								color={focused ? color : colors.text}
							/>
							{/* <Text
								style={{
									color: focused
										? colors.primary
										: colors.text,
									fontFamily: "PTSans_400Regular",
									fontSize: 12,
								}}
							>
								Graph
							</Text> */}
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="List"
				component={MemberNavigator}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View
							style={{
								alignItems: "center",
								marginBottom: 10,
							}}
						>
							<MaterialIcons
								name="people"
								size={22}
								color={focused ? color : colors.text}
							/>
							{/* <Text
								style={{
									color: focused
										? colors.primary
										: colors.text,
									fontFamily: "PTSans_400Regular",
									fontSize: 12,
								}}
							>
								List
							</Text> */}
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<View
							style={{
								alignItems: "center",
								marginBottom: 10,
								borderRadius: 20,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{user.image ? (
								<Image
									source={{ uri: user.image }}
									resizeMode="cover"
									style={{
										width: 22,
										height: 22,
										borderRadius: 20,
									}}
								/>
							) : null}
							{/* <Text
								style={{
									color: focused
									? colors.primary
									: colors.text,
									fontFamily: "PTSans_400Regular",
									paddingTop: 2,
									fontSize: 12,
								}}
							>
								Profile
							</Text> */}
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;
