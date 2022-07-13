import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { userSelector } from "../store/selectors";
export default function DashboardHeader({ styles }) {
	const { colors, dark } = useTheme();
	const user = useSelector(userSelector);
	const rotate = useSharedValue("0deg");

	useEffect(() => {
		rotate.value = withRepeat(
			withTiming("90deg", { duration: 1000 }),
			6,
			true
		);
	}, []);

	const emojiStyles = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: rotate.value }],
		};
	});

	return (
		<View
			style={{
				marginVertical: 20,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={[
						styles.textLight,
						{
							color: colors.text,
							fontSize: 30,
							overflow: "scroll",
						},
					]}
				>
					Hey{" "}
				</Text>
				<Text
					style={[
						styles.textBold,
						{
							color: colors.text,
							fontSize: 30,
							overflow: "hidden",
						},
					]}
				>
					{user.username}
				</Text>
				<Animated.Text
					style={[
						emojiStyles,
						{
							fontSize: 30,
						},
					]}
				>
					👋
				</Animated.Text>
			</View>
			<Text
				style={[
					styles.textLight,
					{
						color: colors.text,
						fontSize: 20,
					},
				]}
			>
				Here is your summary
			</Text>
		</View>
	);
}
