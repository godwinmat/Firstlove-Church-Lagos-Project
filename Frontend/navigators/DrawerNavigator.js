import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Form from "../screens/Form";
import Settings from "../screens/Settings";
import { useTheme } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";
import CustomDrawer from "./CustomDrawer";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({ navigation }) => {

	const { colors, dark } = useTheme();

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawer {...props} />}
			useLegacyImplementation={true}
		>
			<Drawer.Screen
				name="Home"
				component={HomeNavigator}
				options={{
					headerShown: false,
					drawerIcon: ({ focused, color }) => (
						<AntDesign name="home" size={24} color={focused ? color : colors.text} />
					),
					drawerLabel: ({focused, color}) => {
						return <Text style={{
							color: focused ? color : colors.text,
							fontFamily: "PTSans_400Regular",
							fontSize: 18,
							marginLeft: -15,
						}}>Home</Text>
					}
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					drawerIcon: ({ focused, color }) => (
						<Ionicons name="person-outline" size={24} color={focused ? color : colors.text} />
					),
					drawerLabel: ({focused, color}) => {
						return <Text style={{
							color: focused ? color : colors.text,
							fontFamily: "PTSans_400Regular",
							fontSize: 18,
							marginLeft: -15,
						}}>Profile</Text>
					}
				}}
			/>
			<Drawer.Screen
				name="Add Member"
				component={Form}
				options={{
					headerShown: false,
					drawerIcon: ({ focused, color }) => (
						<AntDesign name="adduser" size={24} color={focused ? color : colors.text} />
					),
					drawerLabel: ({focused, color}) => {
						return <Text style={{
							color: focused ? color : colors.text,
							fontFamily: "PTSans_400Regular",
							fontSize: 18,
							marginLeft: -15,
						}}>Add Member</Text>
					}
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: false, drawerIcon: ({ focused, color }) => (
					<AntDesign name="setting" size={24} color={focused ? color : colors.text} />
				), drawerLabel: ({focused, color}) => {
					return <Text style={{
						color: focused ? color : colors.text,
						fontFamily: "PTSans_400Regular",
						fontSize: 18,
						marginLeft: -15,
					}}>Settings</Text>
				} }}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
