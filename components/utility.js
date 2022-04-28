import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export const FormInput = ({
	placeholder,
	styles,
	keyboardType,
	value,
	onChangeText,
	onChange,
	editable,
	error,
}) => {
	const [focus, setFocus] = useState(false);

	const colorFunc = () => {
		let color;
		if (!focus && !error) {
			color = "grey";
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
		<View style={{ marginBottom: 15 }}>
			<TextInput
				placeholder={placeholder}
				keyboardType={keyboardType}
				value={value}
				style={{
					borderWidth: 1,
					borderColor: colorFunc(),
					borderRadius: 10,
					width: 280,
					height: 45,
					padding: 10,
					color: "black",
					fontSize: 19,
					...styles,
				}}
				onFocus={() => {
					setFocus(true);
				}}
				onBlur={() => {
					setFocus(false);
				}}
				onChangeText={onChangeText}
				onChange={onChange}
				editable={editable}
			/>
			{error ? <Error error={error} /> : null}
		</View>
	);
};

export const CustomButton = ({
	label,
	styles,
	onPress,
	labelStyle,
	disabled,
}) => {
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
				borderColor: "grey",
				paddingHorizontal: 10,
				...styles,
				backgroundColor: disabled ? "#ff8080" : styles.backgroundColor,
			}}
			disabled={disabled}
		>
			<Text style={{ color: "#000", fontWeight: "bold", ...labelStyle }}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export const Error = ({ error }) => {
	return (
		<View>
			<Text style={{ color: "red", fontSize: 13 }}>{error}</Text>
		</View>
	);
};
