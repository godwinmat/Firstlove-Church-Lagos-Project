import { View, Text, StatusBar } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Graph from "../screens/Graph";
import List from "../screens/List";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TabNavigator = ({ navigation }) => {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				headerTitle: "",
				tabBarLabelStyle: {
					fontSize: 13,
					paddingBottom: 3,
				},
				tabBarActiveTintColor: "#ff0000",
				tabBarStyle: {
					height: 50,
					width: 330,
					marginBottom: 15,
					borderRadius: 20,
					alignSelf: "center"
				},
				tabBarIconStyle: {
					marginTop: 3,
					
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name="home"
							size={focused?22:18}
							color={focused ? color : "black"}
							style={{
							}}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="Graph"
				component={Graph}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name="stats-chart"
							size={focused?22:18}
							color={focused ? color : "black"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="List"
				component={List}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name="people"
							size={focused?28:24}
							color={focused ? color : "black"}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
