import { View, Text } from "react-native";

export default CustomError = ({ error }) => {
	return (
		<View>
			<Text style={{ color: "red", fontSize: 13 }}>{error}</Text>
		</View>
	);
};
