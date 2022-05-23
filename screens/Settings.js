import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser } from "../store/reducers/userReducers";
import { useDispatch } from "react-redux";

const Settings = () => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView>
			<Text>Settings</Text>

			<Button
				title="Logout"
				onPress={() => {
					dispatch(logoutUser());
				}}
			/>
		</SafeAreaView>
	);
};

export default Settings;
