import { View, TextInput, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import SmallText from "./SmallText";
import PopupMenu from "./PopupMenu";
import sizes from "./constants/sizes";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomError from "./CustomError";
import { Controller } from "react-hook-form";

const InputUnderline = ({
	placeholder,
	placeholderTextColor,
	keyboardType,
	underlineColor,
	selectionColor,
	style,
	containerStyle,
	isDropDown,
	isCalendar,
	dropDownItems = [],
	setDate,
	control,
	name,
	rules,
}) => {
	const { colors, dark } = useTheme();

	const [borderBottomColor, setBorderBottomColor] = useState(
		colors.lowerText
	);
	const [borderWidth, setBorderWidth] = useState(1);
	const [openPicker, setOpenPicker] = useState(false);

	const onDateChange = (e, d) => {
		setOpenPicker(false);
		setDate(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
	};
	return (
		<View>
			<View
				style={{
					borderBottomWidth: borderWidth,
					borderBottomColor: borderBottomColor,
					height: 33,
					fontSize: 15,
					paddingVertical: 5,
					...containerStyle,
					width:
						isDropDown || isCalendar
							? 150
							: containerStyle.width || 200,
				}}
			>
				{isDropDown && (
					<Controller
						control={control}
						name={name}
						render={({ field: { value } }) => (
							<PopupMenu
								items={dropDownItems}
								menuContainerStyle={{
									width: 150,
									maxHeight: 120,
								}}
								menuWrapperStyle={{
									backgroundColor: colors.card,
								}}
								triggerWrapperStyles={{
									width: 150,
								}}
								itemContainerStyle={{
									justifyContent: "center",
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										height: 30,
									}}
								>
									{value ? (
										<SmallText>{value}</SmallText>
									) : (
										<SmallText
											style={{
												color: placeholderTextColor,
											}}
										>
											{placeholder}
										</SmallText>
									)}
									<AntDesign
										name="caretdown"
										color={
											placeholderTextColor ||
											colors.lowerText
										}
										size={10}
										style={{
											paddingRight: 10,
										}}
									/>
								</View>
							</PopupMenu>
						)}
					/>
				)}

				{isCalendar && (
					<Controller
						control={control}
						name={name}
						render={({ field: { value } }) => (
							<TouchableHighlight
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									height: 30,
								}}
								underlayColor={colors.border}
								onPress={() => setOpenPicker(true)}
							>
								<>
									{value ? (
										<SmallText>{value}</SmallText>
									) : (
										<SmallText
											style={{
												color: placeholderTextColor,
											}}
										>
											{placeholder}
										</SmallText>
									)}
									<AntDesign
										name="calendar"
										color={
											placeholderTextColor ||
											colors.lowerText
										}
										size={sizes.smaller}
										style={{
											paddingRight: 10,
										}}
									/>
								</>
							</TouchableHighlight>
						)}
					/>
				)}

				{openPicker && (
					<DateTimePicker
						testID="dateTimePicker"
						onChange={onDateChange}
						value={new Date()}
						mode="date"
						accentColor="red"
						textColor={colors.text}
						themeVariant={dark ? "dark" : "light"}
						dateFormat="shortdate"
					/>
				)}

				{!isDropDown && !isCalendar && (
					<Controller
						control={control}
						name={name}
						rules={rules}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<>
								<TextInput
									placeholder={placeholder}
									placeholderTextColor={placeholderTextColor}
									selectionColor={selectionColor}
									keyboardType={keyboardType}
									onChangeText={onChange}
									onFocus={() => {
										setBorderBottomColor(underlineColor);
										setBorderWidth(2);
									}}
									onBlur={() => {
										setBorderBottomColor(colors.lowerText);
										setBorderWidth(1);
									}}
									// onBlur={onBlur}
									style={{
										height: 28,
										fontSize: 15,
										fontFamily: "PTSans_400Regular",
										...style,
									}}
									// defaultValue={value}
									value={value}
								/>

								{error && <CustomError error={error.message} />}
							</>
						)}
					/>
				)}
			</View>
			{/* {!isDropDown && !isCalendar && error && <View></View>} */}
		</View>
	);
};

export default InputUnderline;
