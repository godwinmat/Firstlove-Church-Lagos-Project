import {
	View,
	Text,
	StatusBar,
	ScrollView,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import { LineChart } from "react-native-chart-kit";
import LargeText from "../components/LargeText";
import GraphView from "../components/GraphView";
import { getAttendanceGraph } from "../store/reducers/attendanceReducers";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../store/selectors";
import styles from "../components/constants/styles";

const Graph = ({ navigation }) => {
	const user = useSelector(userSelector);
	const { colors, dark } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const [graphData, setGraphData] = useState({
		labels: [],
		datasets: [
			{
				data: [],
			},
		],
	});

	const onRefresh = () => {
		setRefreshing(true);
		getGraphData();
		setRefreshing(false);
	};

	const getGraphData = async () => {
		try {
			const result = await dispatch(
				getAttendanceGraph({
					userid: user.userid,
				})
			).unwrap();
			if (result.length !== 0) {
				var labels = [];
				var data = [];
				result.map((item) => {
					labels.push(
						`${item.date.day}-${item.date.month}-${item.date.year}`
					);
					data.push(item.count);
				});

				setGraphData({ labels, datasets: [{ data }] });
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getGraphData();
			return () => {
				setLoading(true);
			};
		}, [])
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				paddingTop: 40,
				height: "100%",
			}}
		>
			<NavBar navigation={navigation} navLabel="Graph" />
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
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					{graphData.labels.length !== 0 ? (
						<GraphView
							title={"Attendance Graph"}
							data={graphData}
						/>
					) : (
						<LargeText
							style={[
								styles.textBold,
								{
									color: colors.text,
								},
							]}
						>
							No Data To Show
						</LargeText>
					)}
					{/* <GraphView title={"Offering Graph"} /> */}
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Graph;
