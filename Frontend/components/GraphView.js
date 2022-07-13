import { View, ScrollView, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import SmallText from "./SmallText";
import { useTheme } from "@react-navigation/native";
import styles from "./constants/styles";
const GraphView = ({
	title,
	backgroundColor,
	backgroundGradientFrom,
	backgroundGradientTo,
	lineColor,
	transparent,
	width,
	height,
	data,
}) => {
	const { colors, dark } = useTheme();
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={{ width: Dimensions.get("window").width + 200 }}>
				<SmallText style={{ paddingVertical: 10 }}>{title}</SmallText>
				<LineChart
					data={
						data
							? data
							: {
									labels: [
										"Jan",
										"Feb",
										"Mar",
										"Apr",
										"May",
										"Jun",
									],
									datasets: [
										{
											data: [
												Math.random() * 100,
												Math.random() * 100,
												Math.random() * 100,
												Math.random() * 100,
												Math.random() * 100,
											],
										},
									],
							  }
					}
					width={width ? width : Dimensions.get("window").width + 200} // from react-native
					height={height ? height : 300}
					chartConfig={{
						backgroundColor: backgroundColor && backgroundColor,
						backgroundGradientFrom:
							backgroundGradientFrom && backgroundGradientFrom,
						backgroundGradientTo:
							backgroundGradientTo && backgroundGradientTo,
						decimalPlaces: 0, // optional, defaults to 2dp
						color: () => (lineColor ? lineColor : colors.primary),
						labelColor: () => colors.text,
						style: {
							borderWidth: 5,
						},
						propsForDots: {
							r: "5",
							strokeWidth: "1",
							stroke: "#fff",
						},
						fillShadowGradientFrom: "#ff1b6b",
						fillShadowGradientTo: "#45caaf",
						fillShadowGradientOpacity: 0.8,
						strokeWidth: 3,
						propsForLabels: {
							fontFamily: "PTSans_700Bold",
							fontSize: 12,
						},
					}}
					bezier
					style={{
						marginVertical: 10,
						paddingBottom: 30,
					}}
					fromZero
					transparent={transparent ? transparent : true}
					withInnerLines={false}
					withOuterLines={false}
					verticalLabelRotation={45}
					xLabelsOffset={0}
				/>
			</View>
		</ScrollView>
	);
};

export default GraphView;
