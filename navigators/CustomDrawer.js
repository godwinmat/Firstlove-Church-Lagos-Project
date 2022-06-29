import { View, Text, Image, Alert } from "react-native";
import React from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { logoutUser } from "../store/reducers/userReducers";

const CustomDrawer = (props) => {
	const user = useSelector((state) => state["user"]);
	const { colors, dark } = useTheme();
	const dispatch = useDispatch();

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View
					style={{
						width: "90%",
						margin: 20,
						borderBottomWidth: 1.5,
						paddingBottom: 20,
						borderBottomColor: colors.border,
						alignSelf: "center",
					}}
				>
					<View
						style={{
							width: 100,
							height: 100,
							borderRadius: 50,
							marginTop: 30,
							marginBottom: 10,
						}}
					>
						{user.image ? (
							<Image
								source={{ uri: user.image }}
								resizeMode="cover"
								style={{
									width: "100%",
									height: "100%",
									borderRadius: 50,
								}}
							/>
						) : null}
					</View>
					<Text
						style={{
							color: colors.text,
							fontFamily: "PTSans_700Bold",
							fontSize: 24,
						}}
					>
						{user.firstname} {user.lastname}
					</Text>
					<Text
						style={{
							color: colors.lowerText,
							fontFamily: "PTSans_400Regular",
							fontSize: 19,
						}}
					>
						{user.username}
					</Text>
					<Text
						style={{
							color: colors.lowerText,
							fontFamily: "PTSans_400Regular",
							fontSize: 12,
						}}
					>
						{user.phonenumber}
					</Text>
				</View>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<View>
				<TouchableOpacity
					onPress={() => {
						Alert.alert(
							"Logout",
							"Are you sure you want to logout?",
							[
								{
									text: "No",
									style: "cancel",
								},
								{
									text: "Yes",
									style: "default",
									onPress: () => dispatch(logoutUser()),
								},
							],
							{ cancelable: true }
						);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							width: "90%",
							marginLeft: 20,
							alignItems: "center",
							marginVertical: 7,
							borderTopWidth: 1.5,
							borderTopColor: colors.border,
							paddingVertical: 10,
						}}
					>
						<Ionicons
							name="exit-outline"
							size={24}
							color={colors.text}
						/>
						<Text
							style={{
								color: colors.text,
								fontFamily: "PTSans_400Regular",
								fontSize: 18,
								paddingLeft: 18,
							}}
						>
							Log Out
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CustomDrawer;
