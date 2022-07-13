import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	Image,
	RefreshControl,
} from "react-native";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { userSelector } from "../store/selectors";
import LargeText from "./LargeText";
export default function DashboardAttendanceList({
	styles,
	navigation,
	attendance,
	fetchData,
}) {
	const { colors, dark } = useTheme();
	const user = useSelector(userSelector);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		fetchData();
		setRefreshing(false);
	};
	return (
		<View style={{ width: "100%" }}>
			{attendance !== "no attendance." ? (
				<View
					style={{
						height: 410,
					}}
				>
					<FlatList
						data={attendance.list ? attendance.list : []}
						keyExtractor={(item) => item._id}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
							/>
						}
						ListHeaderComponent={() => (
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									marginVertical: 10,
								}}
							>
								<Text
									style={[
										styles.textBold,
										{
											color: colors.text,
											fontSize: 16,
										},
									]}
								>
									Last Sunday's Attendance List
								</Text>
								<Text
									style={[
										styles.textBold,
										{
											color: colors.text,
											fontSize: 16,
										},
									]}
								>
									{attendance.date.day}-
									{attendance.date.month}-
									{attendance.date.year}
								</Text>
							</View>
						)}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("List", {
										screen: "Memberdetails",
									})
								}
							>
								<View
									style={{
										width: "100%",
										height: 100,
										backgroundColor: colors.card,
										borderRadius: 10,
										marginVertical: 10,
										flexDirection: "row",
										alignItems: "center",
										padding: 20,
									}}
									// entering={FadeIn}
									// layout={Layout}
								>
									<View
										style={{
											width: 60,
											height: 60,
											borderRadius: 30,
										}}
									>
										{item.image !== "" ? (
											<Image
												source={{
													uri: item.image,
												}}
												style={{
													width: "100%",
													height: "100%",
													borderRadius: 30,
												}}
											/>
										) : null}
									</View>
									<View
										style={{
											marginLeft: 20,
											paddingVertical: 10,
										}}
									>
										<Text
											style={[
												styles.textLight,
												{
													color: colors.text,
													paddingVertical: 1,
													fontSize: 17,
												},
											]}
										>
											{item.firstname} {item.lastname}
										</Text>
										<Text
											style={[
												styles.textLight,
												{
													color: colors.text,
													paddingVertical: 1,
													fontSize: 13,
												},
											]}
										>
											{item.phonenumber}
										</Text>
										<Text
											style={[
												styles.textLight,
												{
													color: colors.text,
													paddingVertical: 1,
													fontSize: 13,
												},
											]}
										>
											{item.area}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			) : (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
				>
					<LargeText>No Attendance</LargeText>
				</View>
			)}
		</View>
	);
}
