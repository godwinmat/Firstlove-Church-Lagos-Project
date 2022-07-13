import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import styles from "./constants/styles";

const LargeText = ({ children, style }) => {
	const { colors, dark } = useTheme();
	return (
		<Text
			style={[
				styles.textBold,
				{
					color: colors.text,
					fontSize: 25,
					textAlign: "center",
					...style,
				},
			]}
		>
			{children}
		</Text>
	);
};

export default LargeText;
