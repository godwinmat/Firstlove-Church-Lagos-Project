import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TextInput } from "react-native";
import NavBar from "./NavBar";
import SmallText from "./SmallText";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import styles from "./constants/styles";
import sizes from "./constants/sizes";

const PeopleHeaderComponent = ({ maleCount, femaleCount, data }) => {
	const { width, height } = Dimensions.get("screen");
	const { colors, dark } = useTheme();

	return (
		<View style={{ width }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginVertical: 10,
					paddingHorizontal: 25,
				}}
			>
				<SmallText
					style={{
						textAlign: "left",
						color: colors.lowerText,
					}}
				>
					{data.length} {data.length > 1 ? "People" : "Person"}
					{"  "}
					{data.length > 1 ? (
						<Fontisto
							name="persons"
							size={20}
							color={colors.lowerText}
						/>
					) : (
						<Fontisto
							name="person"
							size={20}
							color={colors.lowerText}
						/>
					)}
				</SmallText>
				<SmallText
					style={{
						textAlign: "left",
						color: colors.lowerText,
					}}
				>
					{maleCount} Male{" "}
					<Fontisto name="male" size={20} color={colors.lowerText} />
				</SmallText>
				<SmallText
					style={{
						textAlign: "left",
						color: colors.lowerText,
					}}
				>
					{femaleCount} Female{" "}
					<Fontisto
						name="female"
						size={20}
						color={colors.lowerText}
						style={{ marginHorizontal: 40 }}
					/>
				</SmallText>
			</View>
		</View>
	);
};

export default PeopleHeaderComponent;
