import { View, Text, TextInput } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../screens/List";
import Memberdetails from "../screens/Memberdetails";
import Addmember from "../screens/Addmember";
import { useTheme } from "@react-navigation/native";
import Markattendance from "../screens/Markattendance";

const Stack = createNativeStackNavigator();
const MemberNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="People"
				component={List}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="Memberdetails" component={Memberdetails} />
			<Stack.Screen name="Addmember" component={Addmember} />
			<Stack.Screen name="Markattendance" component={Markattendance}/>
		</Stack.Navigator>
	);
};

export default MemberNavigator;
