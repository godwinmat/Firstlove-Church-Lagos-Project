import {
	View,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl,
	Button,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Surface } from "react-native-paper";

import { userSelector } from "../store/selectors";
import LargeText from "../components/LargeText";
import SmallText from "../components/SmallText";
import sizes from "../components/constants/sizes";
import { getLastSundayAttendance } from "../store/reducers/attendanceReducers";
import { getBacentaMembers } from "../store/reducers/memberReducers";

const Profile = ({ navigation }) => {
	const { colors, dark } = useTheme();
	const { width, height } = Dimensions.get("screen");
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const [memberCount, setMemberCount] = useState(0);
	const [members, setMembers] = useState([]);
	const [attendanceCount, setAttendanceCount] = useState(0);
	const day =
		`${user.dateofbirth.day}`.length === 1
			? `0${user.dateofbirth.day}`
			: `${user.dateofbirth.day}`;
	const month =
		`${user.dateofbirth.month}`.length === 1
			? `0${user.dateofbirth.month}`
			: `${user.dateofbirth.month}`;
	const date = new Date(
		`${user?.dateofbirth?.year}-${user?.dateofbirth?.month}-${day}`
	)
		.toDateString()
		.substring(4);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);

	const onRefresh = () => {
		setRefreshing(true);
		fetchData();
		setRefreshing(false);
	};

	async function fetchData() {
		try {
			const members = await dispatch(
				getBacentaMembers({
					userid: user.userid,
				})
			).unwrap();

			const attendance = await dispatch(
				getLastSundayAttendance({
					userid: user.userid,
				})
			).unwrap();
			setMemberCount(members.length);
			setMembers(members);
			if (attendance === "no attendance.") {
				setAttendanceCount(0);
			} else {
				setAttendanceCount(attendance.count);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchData();
			return () => {
				setLoading(true);
			};
		}, [])
	);

	if (loading)
		return (
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
		);

	return (
		<SafeAreaView>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressViewOffset={70}
					/>
				}
			>
				<View
					style={{
						width,
						height: 100,
						position: "relative",
					}}
				>
					<Image
						source={
							dark
								? require("../assets/images/flclogo2.jpg")
								: require("../assets/images/flclogo3.jpg")
						}
						blurRadius={10}
						resizeMode="cover"
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
					<TouchableOpacity
						style={{
							backgroundColor: "transparent",
							position: "absolute",
							right: 10,
							top: 5,
							width: 40,
							height: 40,
							borderRadius: 20,
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={() => navigation.navigate("Profile Navigator")}
					>
						<AntDesign
							name="edit"
							color={dark ? "black" : "white"}
							size={sizes.big}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						marginTop: -30,
						backgroundColor: colors.background,
						alignItems: "center",
						borderBottomWidth: 1,
						borderBottomColor: colors.border,
						paddingBottom: 10,
					}}
				>
					<Surface
						elevation={10}
						style={{
							borderRadius: 50,
							width: 100,
							height: 100,
							marginTop: -50,
						}}
					>
						<Image
							source={{ uri: user.image }}
							resizeMode="cover"
							style={{
								width: "100%",
								height: "100%",
								borderRadius: 50,
							}}
						/>
					</Surface>
					<LargeText
						style={{
							color: colors.text,
							textTransform: "uppercase",
							paddingTop: 10,
						}}
					>
						{user.firstname} {user.lastname}
					</LargeText>
					<SmallText
						style={{
							fontSize: sizes.small,
							color: colors.lowerText,
						}}
					>
						{user.area}
					</SmallText>

					<View
						style={{
							flexDirection: "row",
							marginTop: 20,
							flexWrap: "wrap",
							width: "80%",
							justifyContent: "center",
						}}
					>
						{user.roles.map((item, index) => (
							<View
								style={{
									flexDirection: "row",
									backgroundColor: "red",
									paddingVertical: 4,
									paddingHorizontal: 8,
									borderRadius: 10,
									margin: 3,
									elevation: 7,
								}}
								key={index}
							>
								<SmallText
									style={{
										fontSize: sizes.smallest,
										color: "white",
									}}
								>
									{item}
								</SmallText>
							</View>
						))}
					</View>
				</View>
				<View
					style={{
						padding: 10,
						borderBottomWidth: 1,
						borderBottomColor: colors.border,
						paddingVertical: 20,
					}}
				>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 2,
						}}
					>
						<AntDesign
							name="home"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{user.address}
					</SmallText>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 2,
						}}
					>
						<AntDesign
							name="mail"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{user.email}
					</SmallText>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 2,
						}}
					>
						<AntDesign
							name="phone"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{user.phonenumber}
					</SmallText>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 2,
						}}
					>
						<FontAwesome
							name="whatsapp"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{user.whatsappnumber}
					</SmallText>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 2,
						}}
					>
						<FontAwesome
							name="birthday-cake"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{date}
					</SmallText>
				</View>
				<View
					style={{
						width,
						borderBottomWidth: 1,
						borderBottomColor: colors.border,
						flexDirection: "row",
						justifyContent: "center",
						paddingVertical: 10,
					}}
				>
					<View
						style={{
							borderRightWidth: 0.7,
							borderRighttColor: colors.border,
							flex: 1 / 2,
						}}
					>
						<LargeText style={{ fontSize: sizes.medium }}>
							{memberCount}
						</LargeText>
						<SmallText
							style={{
								fontSize: sizes.smaller,
								color: colors.lowerText,
							}}
						>
							People
						</SmallText>
					</View>
					<View
						style={{
							borderLeftWidth: 0.7,
							borderLeftColor: colors.border,
							flex: 1 / 2,
						}}
					>
						<LargeText style={{ fontSize: sizes.medium }}>
							{attendanceCount}
						</LargeText>
						<SmallText
							style={{
								fontSize: sizes.smaller,
								color: colors.lowerText,
							}}
						>
							Attendance
						</SmallText>
					</View>
				</View>
				{members.length !== 0 ? (
					<View
						style={{
							width,
							borderBottomWidth: 1,
							borderBottomColor: colors.border,
							padding: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<SmallText
								style={{
									textAlign: "left",
									paddingBottom: 10,
									fontSize: sizes.smaller,
								}}
							>
								People
							</SmallText>
							<TouchableOpacity
								onPress={() => navigation.navigate("List")}
							>
								<SmallText
									style={{
										textAlign: "left",
										paddingBottom: 10,
										fontSize: sizes.smaller,
										color: colors.primary,
									}}
								>
									View All
								</SmallText>
							</TouchableOpacity>
						</View>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{members.map((item) => (
								<TouchableOpacity
									key={item._id}
									style={{
										marginHorizontal: 10,
										alignItems: "center",
									}}
									onPress={() =>
										navigation.navigate("List", {
											screen: "Memberdetails",
											params: {
												member: item,
											},
										})
									}
								>
									<Image
										source={{ uri: item.image }}
										resizeMode="cover"
										style={{
											width: 50,
											height: 50,
											borderRadius: 25,
											marginBottom: 5,
										}}
									/>
									<SmallText
										style={{
											fontSize: sizes.smallest,
											color: colors.text,
										}}
									>
										{item.firstname}
									</SmallText>
									<SmallText
										style={{
											fontSize: sizes.smallest,
											color: colors.text,
										}}
									>
										{item.lastname}
									</SmallText>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				) : null}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
