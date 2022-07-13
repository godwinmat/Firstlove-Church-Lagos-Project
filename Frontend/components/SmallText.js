import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import styles from "./constants/styles";

const SmallText = ({ children, style }) => {
	const { colors, dark } = useTheme();
	return (
		<Text
			style={[
				styles.textLight,
				{
					color: colors.text,
					fontSize: 18,
					textAlign: "center",
					...style,
				},
			]}
		>
			{children}
		</Text>
	);
};

export default SmallText;
