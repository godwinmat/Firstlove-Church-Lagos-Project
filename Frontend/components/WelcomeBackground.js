import { View, Text, Dimensions, Image } from "react-native";
import React from "react";

const WelcomeBackground = () => {
	const { width, height } = Dimensions.get("screen");

	return (
		<View style={{ width: "100%", height: height / 2 - 50 }}>
			<Image
				style={{
					width,
					height,
				}}
				blurRadius={1}
				resizeMode={"cover"}
				source={require("../assets/images/img4.jpg")}
			/>
			<Image
				resizeMode="cover"
				source={require("../assets/images/flclogo5.png")}
				style={{
					position: "absolute",
					top: 10,
					width: 270,
					height: 270,
					left: width / 2 - 135,
				}}
			/>
		</View>
	);
};

export default WelcomeBackground;
