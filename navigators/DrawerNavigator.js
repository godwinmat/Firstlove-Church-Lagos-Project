import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../screens/Home";
import Form from "../screens/Form";
import Settings from "../screens/Settings"
import { useNavigation } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";


const DrawerNavigator = ({navigation}) => {
	const Drawer = createDrawerNavigator();

	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name="Dashboard"
				component={TabNavigator}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Form"
				component={Form}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
