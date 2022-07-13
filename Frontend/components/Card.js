import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default Card = ({ children, styles }) => {
	const { colors, dark } = useTheme();

	return (
		<LinearGradient
			style={{
				width: 130,
				height: 110,
				backgroundColor: colors.card,
				marginRight: 10,
				borderRadius: 20,
				// shadowColor: colors.shadow,
				// shadowOpacity: 0.2,
				// shadowOffset: {
				// 	width: 0,
				// 	height: 50,
				// },
				// shadowRadius: 7.68,
				// elevation: 10,
				padding: 5,
				...styles,
			}}
			colors={["#ff1b6b", "#999", "#45caff"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			{children}
		</LinearGradient>
	);
};
