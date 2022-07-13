import { View, ActivityIndicator, StatusBar } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { userSelector } from "../store/selectors";
import FloatingButton from "../components/FloatingButton";
import PeopleList from "../components/PeopleList";
import { getBacentaMembers } from "../store/reducers/memberReducers";
import NavBar from "../components/NavBar";
import Search from "../components/Search";

const List = ({ navigation }) => {
	const user = useSelector(userSelector);
	const { colors, dark } = useTheme();
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [maleCount, setMaleCount] = useState(0);
	const [femaleCount, setFemaleCount] = useState(0);
	const [searchedData, setSearchedData] = useState([]);

	const getMembers = async () => {
		try {
			const result = await dispatch(
				getBacentaMembers({
					userid: user.userid,
				})
			).unwrap();
			setData(result);
			setSearchedData(result);
			const maleCount = result.filter((item) => item.gender === "Male");
			const femaleCount = result.filter(
				(item) => item.gender === "Female"
			);
			setMaleCount(maleCount.length);
			setFemaleCount(femaleCount.length);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const onChangeText = (val) => {
		if (!val.length) return setSearchedData(data);
		const filteredData = data.filter((item) =>
			item.fullname.toLowerCase().includes(val.toLocaleLowerCase())
		);

		setSearchedData(filteredData);
	};

	useFocusEffect(
		useCallback(() => {
			getMembers();
			return () => {
				setLoading(true);
			};
		}, [])
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<NavBar
				navigation={navigation}
				styles={{
					position: "relative",
					top: 0,
					padding: 0,
					margin: 0,
				}}
				navLabel="My People"
			/>
			<FloatingButton
				IconType={AntDesign}
				iconName="check"
				iconSize={30}
				onPress={() => navigation.navigate("Markattendance")}
				styles={{
					bottom: 80,
				}}
			/>
			<FloatingButton
				IconType={AntDesign}
				iconName="plus"
				iconSize={30}
				onPress={() =>
					navigation.navigate("Addmember", {
						details: {
							leaderid: user.userid,
						},
					})
				}
			/>
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
				<View
					style={
						{
							// marginHorizontal: 20,
						}
					}
				>
					<Search onChangeText={onChangeText} />
					<PeopleList
						maleCount={maleCount}
						femaleCount={femaleCount}
						getBacentaMembers={getBacentaMembers}
						getMembers={getMembers}
						data={data}
						searchedData={searchedData}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};
export default List;
