import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import {
	useFocusEffect,
	useNavigation,
	useTheme,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../store/selectors";
import styles from "../components/constants/styles";
import { useEffect } from "react";
import Checkbox from "expo-checkbox";
import { getBacentaMembersForAttendance } from "../store/reducers/memberReducers";
import FloatingButton from "../components/FloatingButton";
import { addAttendance } from "../store/reducers/attendanceReducers";
import { showToastWithGravity } from "../components/utility";

const Markattendance = ({ navigation }) => {
	const { colors, dark } = useTheme();
	const user = useSelector(userSelector);
	const [checked, setChecked] = useState([]);
	const [checkedItems, setCheckedItems] = useState([]);
	const [checkedAll, setCheckedAll] = useState(false);
	const [query, setQuery] = useState([]);
	const list = [1, 1, 1, 1, 1, 1, 1, 1];
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const getMembers = async () => {
		try {
			const result = await dispatch(
				getBacentaMembersForAttendance({
					userid: user.userid,
				})
			).unwrap();
			setQuery(result);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMembers();
			return () => {
				setLoading(true);
			};
		}, [])
	);

	const onSubmit = async () => {
		const response = await dispatch(addAttendance({
			leaderid: user.userid,
			attendancelist: checked
		})).unwrap()
		if (response === "Attendance added successfully.") {
			showToastWithGravity(response)
			navigation.goBack()
		}
	};

	const onCheckChange = (user) => {
		if (checked.includes(user.userid)) {
			setChecked(checked.filter((item) => item !== user.userid));
		} else {
			setChecked([...checked, user.userid]);
		}
	};

	const onHeaderCheckChange = () => {
		var checkedList = [];
		if (checkedAll === false) {
			query.map((user, index) => {
				checkedList.push(user.userid);
			});
			setCheckedAll(true);
			setChecked(checkedList);
		} else {
			setChecked([]);
			setCheckedAll(false);
		}
	};

	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTitle: ({ children }) => {
				return (
					<Text
						style={[
							styles.textLight,
							{
								color: colors.text,
								fontSize: 20,
							},
						]}
					>
						{checked.length} People Marked
					</Text>
				);
			},
			headerRight: ({ children }) => {
				return (
					<Checkbox
						onValueChange={onHeaderCheckChange}
						value={checkedAll}
						color={checkedAll ? "red" : ""}
					/>
				);
			},
		});
	}, [checkedAll, checked, colors]);

	return (
		<>
			{loading ? (
				<ActivityIndicator
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
					size={"large"}
					animating={true}
					color={"red"}
				/>
			) : (
				<View style={{ height: "100%" }}>
					<FlatList
						data={query}
						keyExtractor={(item) => item.userid}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() => {
									onCheckChange(item);
								}}
							>
								<View
									style={{
										width: "100%",
										height: 100,
										backgroundColor: colors.card,
										borderRadius: 10,
										marginVertical: 5,
										flexDirection: "row",
										alignItems: "center",
										padding: 20,
										position: "relative",
									}}
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
									<Checkbox
										value={
											checked.includes(item.userid)
												? true
												: false
										}
										color={
											checked.includes(item.userid)
												? "red"
												: ""
										}
										onValueChange={() => {
											onCheckChange(item);
										}}
										style={{
											position: "absolute",
											right: 30,
										}}
									/>
								</View>
							</TouchableOpacity>
						)}
						showsVerticalScrollIndicator={false}
					/>
					<FloatingButton
						label={"Submit"}
						labelStyles={{
							color: "white",
							fontSize: 18,
						}}
						onPress={onSubmit}
					/>
				</View>
			)}
		</>
	);
};

export default Markattendance;

// const styles = StyleSheet.create({
// 	textLight: {
// 		fontFamily: "PTSans_400Regular",
// 	},
// 	textBold: {
// 		fontFamily: "PTSans_700Bold",
// 	},
// });
