import {
	View,
	Text,
	StyleSheet,
	TextInput,
	FlatList,
	TouchableOpacity,
	Dimensions,
	Image,
} from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addBacentaMember,
	checkIfBacentaMemberExist,
} from "../store/reducers/memberReducers";
import { showToastWithGravity } from "../components/utility";

const Addmember = ({ navigation, route: { params } }) => {
	const { colors, dark } = useTheme();
	const [defaultValue, setDefaultValue] = useState("");
	const [query, setQuery] = useState([]);
	const { width, height } = Dimensions.get("screen");
	const dispatch = useDispatch();
	const user = useSelector((state) => state["user"]);

	const onChangeText = async (val) => {
		if (val !== "") {
			setDefaultValue(val);
			const result = await dispatch(
				checkIfBacentaMemberExist({
					fullname: val,
					bacentaleader: `${user.firstname} ${user.lastname}`,
				})
			).unwrap();
			if (result !== []) {
				setQuery(result);
				return;
			}
		}
		setQuery([]);
	};

	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTitle: ({ children }) => {
				return (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							borderBottomWidth: 1.2,
							borderColor: "#999",
							width: 250,
							height: 39,
							paddingHorizontal: 5,
							backgroundColor: colors.background,
						}}
					>
						<TextInput
							style={{
								fontFamily: "PTSans_400Regular",
								fontSize: 18,
								width: 210,
								height: 35,
								color: colors.text,
							}}
							placeholder={"Search Member"}
							placeholderTextColor={colors.lowerText}
							autoFocus={true}
							defaultValue={defaultValue}
							onChangeText={onChangeText}
						/>
						<Ionicons
							name="close-circle"
							size={20}
							color="#999"
							onPress={() => {
								setDefaultValue("");
								setQuery([]);
							}}
						/>
					</View>
				);
			},
		});
	}, [colors, defaultValue]);
	return (
		<View style={{}}>
			<FlatList
				data={query}
				extraData={defaultValue}
				keyboardShouldPersistTaps={"handled"}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => {
					if (query.length === 0 && defaultValue.length > 1) {
						return (
							<View
								style={{
									alignItems: "center",
									marginTop: height * 0.3,
								}}
							>
								<Text
									style={[
										styles.textLight,
										{
											color: colors.text,
											fontSize: 20,
										},
									]}
								>
									No Result
								</Text>
							</View>
						);
					}
					return null;
				}}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View
						style={{
							width: "100%",
							height: 70,
							marginVertical: 1,
							flexDirection: "row",
							alignItems: "center",
							padding: 20,
							backgroundColor: colors.background,
							position: "relative",
						}}
					>
						<View>
							<Image
								source={{ uri: item.image }}
								style={{
									width: 40,
									height: 40,
									borderRadius: 20,
								}}
							/>
						</View>
						<View
							style={{
								marginHorizontal: 20,
								paddingVertical: 5,
							}}
						>
							<Text
								style={[
									styles.textLight,
									{
										color: colors.text,
										paddingVertical: 1,
										fontSize: 18,
									},
								]}
							>
								{item.fullname}
							</Text>
							<Text
								style={[
									styles.textLight,
									{
										color: colors.text,
										paddingVertical: 1,
										fontSize: 14,
									},
								]}
							>
								{item.area}
							</Text>
						</View>
						<TouchableOpacity
							style={{
								position: "absolute",
								right: 10,
								padding: 5,
								backgroundColor: colors.primary,
								borderRadius: 5,
							}}
							onPress={async () => {
								const response = await dispatch(
									addBacentaMember({
										memberid: item.userid,
										...params?.details,
									})
								).unwrap();
								showToastWithGravity(response);
								navigation.goBack();
							}}
						>
							<Text
								style={[
									styles.textLight,
									{
										color: "white",
										fontSize: 15,
									},
								]}
							>
								Add Member
							</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	textLight: {
		fontFamily: "PTSans_400Regular",
	},
	textBold: {
		fontFamily: "PTSans_700Bold",
	},
});

export default Addmember;
