import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { deleteBacentaMember } from "../store/reducers/memberReducers";
import FloatingButton from "../components/FloatingButton";
import { showToastWithGravity } from "../components/utility";

const Memberdetails = ({ navigation, route: { params } }) => {
	const { colors, dark } = useTheme();
	const user = useSelector((state) => state["user"]);

	const dispatch = useDispatch();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<FloatingButton
				IconType={AntDesign}
				iconName="plus"
				iconSize={30}
				onPress={() =>
					navigation.navigate("Addmember", {
						details: {
							leaderid: params?.item.userid,
						},
					})
				}
			/>
			<Text style={{ color: colors.text }}>
				Hey {params?.item.fullname}
			</Text>
			<TouchableOpacity
				style={{
					marginVertical: 30,
				}}
				onPress={async () => {
					const response = await dispatch(
						deleteBacentaMember({
							memberid: params?.item.userid,
							leaderid: user.userid,
						})
					).unwrap();

					showToastWithGravity(response);
					navigation.goBack();
				}}
			>
				<Text style={{ color: colors.text }}>Delete Member</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Memberdetails;
