import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { initUser } from "./store/reducers/userReducers";
import Login from "./screens/Login";
import Dashboard from "./screens/Home";
import Form from "./screens/Form";
import Welcome from "./screens/Welcome";
import Register from "./screens/Register";
import Forgottenpassword from "./screens/Forgottenpassword";
import TabNavigator from "./navigators/TabNavigator";
import DrawerNavigator from "./navigators/DrawerNavigator";

const Navigator = () => {
	const Stack = createNativeStackNavigator();
	const loggedIn = useSelector((state) => state["users"].loggedIn);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const init = async () => {
		try {
			await dispatch(initUser());
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
		return () => {
			setLoading(true);
		};
	}, [loggedIn]); 

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" color="red" animating={true} />
			</View>
		);
	}

	return (
		<Stack.Navigator initialRouteName={loggedIn ? "Drawer" : "Welcome"}>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}} 
			/>
			<Stack.Screen
				name="Drawer"
				component={DrawerNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Welcome"
				component={Welcome}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={Register}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Forgottenpassword"
				component={Forgottenpassword}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default Navigator;
