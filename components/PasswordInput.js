import { View, TextInput } from "react-native";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import Error  from "./CustomError";

export default PasswordInput = ({
	placeholder,
	styles,
	defaultValue,
	onChangeText,
	error,
}) => {
	const [focus, setFocus] = useState(false);
	const [revealPassword, setRevealPassword] = useState(false);
	const { colors, dark } = useTheme();

	useFocusEffect(
		useCallback(() => {
			return () => {
				setRevealPassword(false);
			};
		}, [])
	);

	const colorFunc = () => {
		let color;
		if (!focus && !error) {
			color = colors.border;
		} else if (!focus && error) {
			color = "red";
		} else if (focus && error) {
			color = "red";
		} else if (focus && !error) {
			color = "green";
		}
		return color;
	};

	return (
		<View style={{ marginBottom: 10 }}>
			<View
				style={{
					borderWidth: 1,
					borderColor: colorFunc(),
					borderRadius: 10,
					width: 280,
					height: 45,
					...styles,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TextInput
					style={{
						fontFamily: "PTSans_400Regular",
						width: 230,
						padding: 10,
						color: "black",
						fontSize: 19,
					}}
					placeholder={placeholder}
					defaultValue={defaultValue}
					secureTextEntry={revealPassword ? false : true}
					onFocus={() => {
						setFocus(true);
					}}
					onBlur={() => {
						setFocus(false);
					}}
					onChangeText={onChangeText}
				/>
				{revealPassword ? (
					<Ionicons
						name="eye-off-outline"
						size={24}
						color="black"
						style={{
							paddingRight: 15,
						}}
						onPress={() => setRevealPassword(!revealPassword)}
					/>
				) : (
					<Ionicons
						name="eye-outline"
						size={24}
						color="black"
						style={{
							paddingRight: 15,
						}}
						onPress={() => setRevealPassword(!revealPassword)}
					/>
				)}
			</View>
			{error ? <Error error={error} /> : null}
		</View>
	);
};
