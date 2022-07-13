import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default NavIcon = ({ name, size, style, onPress, color }) => {
	return (
		<Ionicons
			name={name}
			size={size}
			color={color}
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
