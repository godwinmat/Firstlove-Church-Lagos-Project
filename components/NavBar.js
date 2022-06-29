import { View, Text, StatusBar } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import NavIcon from "./NavIcon";

export default NavBar = ({ navigation, navLabel, styles }) => {
	const { colors, dark } = useTheme();
	const navigate = useNavigation();
	return (
		<View
			style={{
				position: "absolute",
				top: StatusBar.currentHeight,
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				paddingVertical: 5,
				zIndex: 10,
				...styles,
			}}
		>
			<NavIcon
				name="menu-outline"
				size={33}
				onPress={() => navigate.toggleDrawer()}
				color={colors.text}
				style={{
					top: 0,
					position: "relative",
					marginRight: 40,
				}}
			/>
			{navLabel ? (
				<Text
					style={{
						fontFamily: "PTSans_400Regular",
						fontSize: 22,
						color: colors.text,
						textAlign: "center",
					}}
				>
					{navLabel}
				</Text>
			) : null}
		</View>
	);
};
