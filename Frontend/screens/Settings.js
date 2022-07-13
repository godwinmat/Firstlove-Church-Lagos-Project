import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import {useTheme } from "@react-navigation/native";
import NavBar from "../components/NavBar";

const Settings = ({navigation}) => {
	const dispatch = useDispatch();
	const {colors, dark} = useTheme()
	return (
		<SafeAreaView>
			<NavBar navigation={navigation} navLabel="Settings" />
		</SafeAreaView>
	);
};

export default Settings;
