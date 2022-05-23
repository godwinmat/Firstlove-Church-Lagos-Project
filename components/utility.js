import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export const FormInput = ({
	placeholder,
	styles,
	keyboardType,
	defaultValue,
	onChangeText,
	editable,
	error,
	secureTextEntry,
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
				defaultValue={defaultValue}
				secureTextEntry={secureTextEntry}
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

export const PasswordInput = ({
	placeholder,
	styles,
	defaultValue,
	onChangeText,
	error,
}) => {
	const [focus, setFocus] = useState(false);
	const [revealPassword, setRevealPassword] = useState(false);

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

export const convertBooleanStringToBoolean = (value) => {
	if (value == "true") {
		return true;
	} else {
		return false;
	}
};

export const NavIcon = ({ name, size, style, onPress }) => {
	return (
		<Ionicons
			name={name}
			size={size}
			color="#ff0000"
			style={{
				position: "absolute",
				left: 20,
				top: StatusBar.currentHeight + 5,
				...style,
			}}
			onPress={onPress}
		/>
	);
};
