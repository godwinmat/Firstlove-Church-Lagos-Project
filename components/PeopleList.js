import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	RefreshControl,
	Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import styles from "./constants/styles";
import PeopleHeaderComponent from "./PeopleHeaderComponent";

const PeopleList = ({
	data,
	maleCount,
	femaleCount,
	getMembers,
	searchedData,
}) => {
	const { width, height } = Dimensions.get("screen");
	const { colors, dark } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const navigation = useNavigation();

	console.log("rerendered");

	const onRefresh = () => {
		setRefreshing(true);
		getMembers();
		setRefreshing(false);
	};

	return (
		<View>
			<FlatList
				data={searchedData}
				keyExtractor={(item) => item.userid}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				ListEmptyComponent={() => (
					<View
						style={{
							marginTop: 0.3 * height,
							alignItems: "center",
						}}
					>
						<Text
							style={[
								styles.textLight,
								{
									color: colors.text,
									fontSize: 20,
								},
							]}
						>
							You have no member.
						</Text>
					</View>
				)}
				ListHeaderComponent={
					<PeopleHeaderComponent
						maleCount={maleCount}
						femaleCount={femaleCount}
						data={data}
					/>
				}
				contentContainerStyle={{
					alignItems: "center",
				}}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Memberdetails", {
								item: item,
							})
						}
					>
						<View
							style={{
								width: 0.9 * width,
								height: 100,
								backgroundColor: colors.card,
								borderRadius: 10,
								marginVertical: 10,
								flexDirection: "row",
								alignItems: "center",
								padding: 20,
							}}
						>
							<View
								style={{
									width: 60,
									height: 60,
									borderRadius: 30,
								}}
							>
								<Image
									source={{ uri: item.image }}
									style={{
										width: "100%",
										height: "100%",
										borderRadius: 30,
									}}
								/>
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
									{item.fullname}
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
	);
};

export default PeopleList;
