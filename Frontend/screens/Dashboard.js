import { View, StatusBar, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/reducers/userReducers";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSummary from "../components/DashboardSummary";
import DashboardAttendanceList from "../components/DashboardAttendanceList";
import NavBar from "../components/NavBar";
import { getBacentaMemberCount } from "../store/reducers/memberReducers";
import { userSelector } from "../store/selectors";
import { getLastSundayAttendance } from "../store/reducers/attendanceReducers";

const Dashboard = ({ navigation }) => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { colors, dark } = useTheme();
	const [memberCount, setMemberCount] = useState(0);
	const [attendance, setAttendance] = useState(null);
	const [attendanceCount, setAttendanceCount] = useState(0);

	async function fetchData() {
		try {
			const userResult = await dispatch(
				fetchUser({
					userid: user.userid,
				})
			).unwrap();
			const { count } = await dispatch(
				getBacentaMemberCount({
					userid: user.userid,
				})
			).unwrap();

			const attendance = await dispatch(
				getLastSundayAttendance({
					userid: user.userid,
				})
			).unwrap();
			setMemberCount(count);
			setAttendance(attendance);
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
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<StatusBar
				barStyle={dark ? "light-content" : "dark-content"}
				backgroundColor={colors.background}
				translucent
				animated
			/>
			<NavBar navigation={navigation} navLabel="Dashboard" />

			<View
				style={{
					marginTop: 40,
					marginHorizontal: 20,
				}}
			>
				<DashboardHeader styles={styles} />
				<DashboardSummary
					styles={styles}
					memberCount={memberCount}
					sundayAttendanceCount={attendanceCount}
				/>

				<DashboardAttendanceList
					styles={styles}
					navigation={navigation}
					attendance={attendance}
					fetchData={fetchData}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	textLight: {
		fontFamily: "PTSans_400Regular",
	},
	textBold: {
		fontFamily: "PTSans_700Bold",
	},
});

export default Dashboard;
