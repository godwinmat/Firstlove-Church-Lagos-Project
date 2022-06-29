import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

export default CustomButton = ({
	label,
	styles,
	onPress,
	labelStyle,
	disabled,
	animating,
	spinnerColor,
}) => {
	const { colors, dark } = useTheme();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				borderRadius: 12,
				backgroundColor: "transparent",
				justifyContent: "center",
				alignItems: "center",
				padding: 5,
				borderWidth: 1,
				borderColor: colors.border,
				paddingHorizontal: 10,
				...styles,
				backgroundColor: disabled ? "#ff8080" : styles.backgroundColor,
			}}
			disabled={disabled}
		>
			{animating ? (
				<ActivityIndicator
					animating={animating}
					color={spinnerColor ? spinnerColor : "white"}
					size={"small"}
				/>
			) : (
				<Text
					style={{
						fontFamily: "PTSans_400Regular",
						color: colors.text,
						...labelStyle,
					}}
				>
					{label}
				</Text>
			)}
		</TouchableOpacity>
	);
};
