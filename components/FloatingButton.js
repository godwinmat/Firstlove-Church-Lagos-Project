import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Styles from "./constants/styles";

const FloatingButton = ({styles, label, labelStyles, iconStyles, IconType, iconName, iconColor, iconSize, onPress}) => {
	const {colors, dark} = useTheme()
    return (
		<TouchableOpacity
			style={{
				position: "absolute",
				bottom: 20,
				right: 20,
				backgroundColor: colors.primary,
				padding: 10,
				borderRadius: 25,
				zIndex: 20,
				elevation: 5,
                shadowColor: colors.shadow,
                ...styles
			}}
			onPress={onPress}
		>
			{
            IconType
            ? <IconType name={iconName} color={iconColor? iconColor:"white"} size={iconSize? iconSize:30} style={iconStyles} />
            : null
            }
            {label ?  <Text style={[Styles.textBold , labelStyles]}>{ label}</Text> : null}
		</TouchableOpacity>
	);
};

export default FloatingButton;
