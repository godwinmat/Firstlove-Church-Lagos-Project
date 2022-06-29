import { View, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Error  from "./CustomError";

const { width, height } = Dimensions.get("screen");

export default FormInput = ({
	placeholder,
	styles,
	keyboardType,
	defaultValue,
	onChangeText,
	editable,
	error,
	secureTextEntry,
}) => {
	const { colors, dark } = useTheme();
	const [focus, setFocus] = useState(false);

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
			<TextInput
				placeholder={placeholder}
				keyboardType={keyboardType}
				defaultValue={defaultValue}
				secureTextEntry={secureTextEntry}
				style={{
					fontFamily: "PTSans_400Regular",
					borderWidth: 1,
					borderColor: colorFunc(),
					borderRadius: 10,
					width: 280,
					height: 45,
					padding: 10,
					fontSize: 19,
					color: colors.text,
					...styles,
				}}
				onFocus={() => {
					setFocus(true);
				}}
				onBlur={() => {
					setFocus(false);
				}}
				onChangeText={onChangeText}
				editable={editable}
				placeholderTextColor={colors.lowerText}
			/>
			{error ? <Error error={error} /> : null}
		</View>
	);
};
