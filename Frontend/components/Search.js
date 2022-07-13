import { View, TextInput } from "react-native";
import React from "react";
import sizes from "./constants/sizes";
import styles from "./constants/styles";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Search = ({ onChangeText }) => {
	const { colors, dark } = useTheme();
	return (
		<View
			style={{
				backgroundColor: colors.card,
				flexDirection: "row",
				borderRadius: 5,
				paddingVertical: 5,
				paddingHorizontal: 40,
				marginVertical: 10,
				alignItems: "center",
				width: "100%",
			}}
		>
			<Feather
				name="search"
				size={sizes.small}
				color={colors.lowerText}
			/>
			<TextInput
				style={[
					styles.textLight,
					{
						marginLeft: 10,
						fontSize: sizes.small,
						color: colors.text,
						width: "80%",
					},
				]}
				placeholder="Search"
				placeholderTextColor={colors.lowerText}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

export default Search;
