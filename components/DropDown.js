import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getAreas } from "../store/reducers/areaReducers.js";

export default DropDown = ({
	data = [],
	styles,
	placeholder,
	setValue,
	value,
}) => {
	const { colors, dark } = useTheme();
	const [dropDownValue, setDropDownValue] = useState("");
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const [query, setQuery] = useState(data);

	const getData = async () => {
		const result = await dispatch(getAreas()).unwrap();
		if (result !== []) {
			setQuery(result);
			return;
		}
	};

	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					setVisible(!visible);
					data.length > 0 ? null : getData();
				}}
			>
				<View
					style={{
						borderWidth: 1,
						borderColor: colors.border,
						borderRadius: 10,
						width: 280,
						height: 45,
						padding: 10,
						color: "black",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 10,
						...styles,
					}}
				>
					{dropDownValue === "" ? (
						<Text
							style={{
								fontFamily: "PTSans_400Regular",
								fontSize: 18,
								color: "grey",
							}}
						>
							{placeholder}
						</Text>
					) : (
						<Text
							style={{
								fontFamily: "PTSans_400Regular",
								fontSize: 18,
								color: colors.text,
							}}
						>
							{value}
						</Text>
					)}
					<AntDesign name="caretdown" color={"grey"} size={12} />
				</View>
			</TouchableOpacity>
			<View
				style={{
					position: "relative",
					display: visible ? "flex" : "none",
				}}
			>
				<ScrollView
					style={{
						maxHeight: 140,
						width: 280,
						backgroundColor: colors.card,
						borderRadius: 10,
						zIndex: 20,
						shadowColor: colors.shadow,
						shadowOpacity: 0.2,
						shadowOffset: {
							width: 0,
							height: 50,
						},
						shadowRadius: 7.68,
						position: "absolute",
					}}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps={"handled"}
				>
					{query?.map((item) => (
						<TouchableOpacity
							key={item._id}
							style={{
								height: 35,
								paddingVertical: 8,
								paddingLeft: 10,
							}}
							onPress={() => {
								setDropDownValue(item.name);
								setValue(item.name);
								setVisible(false);
							}}
						>
							<Text
								style={{
									color: colors.text,
									fontFamily: "PTSans_400Regular",
									fontSize: 17,
								}}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	);
};
