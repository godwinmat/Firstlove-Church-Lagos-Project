import { View, Text, Dimensions, TouchableHighlight } from "react-native";
import React from "react";

import SmallText from "./SmallText";
import sizes from "./constants/sizes";

const OverlaySelection = ({
	closeModal,
	colors,
	dark,
	takeImage,
	pickImage,
}) => {
	const { width, height } = Dimensions.get("screen");

	return (
		<View>
			<SmallText
				style={{
					textAlign: "left",
					fontSize: sizes.smaller,
					paddingTop: 20,
					paddingBottom: 10,
					paddingHorizontal: 15,
					color: colors.lowerText,
				}}
			>
				Change photo
			</SmallText>
			<>
				<TouchableHighlight
					style={{
						paddingHorizontal: 15,
					}}
					underlayColor={dark ? "#444" : "#ddd"}
					onPress={() => {
						closeModal();
						takeImage();
					}}
				>
					<View
						style={{
							marginVertical: 20,
						}}
					>
						<SmallText
							style={{
								textAlign: "left",
								color: colors.text,
							}}
						>
							Take photo
						</SmallText>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					style={{
						borderBottomLeftRadius: 15,
						borderBottomRightRadius: 15,
						paddingHorizontal: 15,
					}}
					underlayColor={dark ? "#444" : "#ddd"}
					onPress={() => {
						closeModal();
						pickImage();
					}}
				>
					<View
						style={{
							marginVertical: 20,
						}}
					>
						<SmallText
							style={{
								textAlign: "left",
								color: colors.text,
							}}
						>
							Choose photo
						</SmallText>
					</View>
				</TouchableHighlight>
			</>
		</View>
	);
};

export default OverlaySelection;
