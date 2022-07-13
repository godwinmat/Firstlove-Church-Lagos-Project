import {
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	Dimensions,
	TouchableHighlight,
	Alert,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
	MenuTrigger,
	Menu,
	MenuOptions,
	MenuOption,
} from "react-native-popup-menu";

import {
	deleteBacentaMember,
	getBacentaMembers,
} from "../store/reducers/memberReducers";
import FloatingButton from "../components/FloatingButton";
import { showToastWithGravity } from "../components/utility";
import SmallText from "../components/SmallText";
import LargeText from "../components/LargeText";
import sizes from "../components/constants/sizes";

const Memberdetails = ({ navigation, route: { params } }) => {
	const { colors, dark } = useTheme();
	const user = useSelector((state) => state["user"]);
	const { width, height } = Dimensions.get("screen");
	const { member } = params;
	const [members, setMembers] = useState([]);
	const [memberCount, setMemberCount] = useState(0);
	const day =
		`${member.dateofbirth.day}`.length === 1
			? `0${member.dateofbirth.day}`
			: `${member.dateofbirth.day}`;
	const month =
		`${member.dateofbirth.month}`.length === 1
			? `0${member.dateofbirth.month}`
			: `${member.dateofbirth.month}`;
	const date = new Date(`${member?.dateofbirth?.year}-${month}-${day}`)
		.toDateString()
		.substring(4);

	const dispatch = useDispatch();

	async function fetchData() {
		try {
			const members = await dispatch(
				getBacentaMembers({
					userid: member.userid,
				})
			).unwrap();
			setMembers(members);
			setMemberCount(members.length);
		} catch (error) {
			console.log(error);
		} finally {
			// setLoading(false);
		}
	}

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Menu>
					<MenuTrigger
						customStyles={{
							triggerOuterWrapper: {},
							triggerWrapper: {
								width: 30,
								height: 30,
								borderRadius: 25,
								justifyContent: "center",
								alignItems: "center",
							},
						}}
					>
						<Entypo
							name="dots-three-vertical"
							color={colors.text}
							size={sizes.small}
						/>
					</MenuTrigger>
					<MenuOptions
						customStyles={{
							optionsWrapper: {
								backgroundColor: colors.card,
							},
							optionWrapper: {
								padding: 15,
							},
							optionsContainer: {
								width: 180,
							},
							optionTouchable: {
								underlayColor: "#fff",
								activeOpacity: 0.1,
							},
						}}
					>
						<MenuOption onSelect={() => console.log("firt")}>
							<SmallText
								style={{
									color: colors.text,
									textAlign: "left",
									fontSize: sizes.smaller,
								}}
							>
								Edit Profile
							</SmallText>
						</MenuOption>
						<MenuOption
							onSelect={async () => {
								Alert.alert(
									"Delete Member",
									"Are you sure you want to delete this member from your list?",
									[
										{
											text: "No",
											style: "cancel",
										},
										{
											text: "Yes",
											style: "default",
											onPress: async () => {
												const response = await dispatch(
													deleteBacentaMember({
														memberid: member.userid,
														leaderid: user.userid,
													})
												).unwrap();

												showToastWithGravity(response);
												navigation.goBack();
											},
										},
									],
									{ cancelable: true }
								);
							}}
						>
							<SmallText
								style={{
									color: colors.text,
									textAlign: "left",
									fontSize: sizes.smaller,
								}}
							>
								Delete Member
							</SmallText>
						</MenuOption>
					</MenuOptions>
				</Menu>
			),
		});
	}, [colors]);

	useFocusEffect(
		useCallback(() => {
			fetchData();
			return () => {
				// setLoading(true);
			};
		}, [])
	);

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					paddingHorizontal: 20,
					borderBottomWidth: 2,
					borderBottomColor: colors.border,
				}}
			>
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<Image
						source={{ uri: member.image }}
						resizeMode="cover"
						style={{
							width: 70,
							height: 70,
							borderRadius: 35,
						}}
					/>
					<View style={{ marginLeft: 20, justifyContent: "center" }}>
						<LargeText style={{ textAlign: "left" }}>
							{member.firstname} {member.lastname}
						</LargeText>
						<SmallText
							style={{
								textAlign: "left",
								fontSize: sizes.smaller,
								color: colors.lowerText,
								paddingTop: 3,
							}}
						>
							{member.area}
						</SmallText>
					</View>
				</View>
				<View style={{ paddingVertical: 20 }}>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 4,
						}}
					>
						<AntDesign
							name="home"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{member.address}
					</SmallText>
					<SmallText
						style={{
							textAlign: "left",
							paddingVertical: 4,
							color: colors.lowerText,
						}}
					>
						<AntDesign
							name="phone"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"  "}
						{member.phonenumber}
					</SmallText>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 4,
						}}
					>
						<FontAwesome
							name="whatsapp"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"   "}
						{member.whatsappnumber}
					</SmallText>
					<SmallText
						style={{
							textAlign: "left",
							paddingVertical: 4,
							color: colors.lowerText,
						}}
					>
						<Ionicons
							name="person-outline"
							color={colors.lowerText}
							size={sizes.big}
						/>
						{"  "}
						{member.gender}
					</SmallText>
					<SmallText
						style={{
							fontSize: sizes.smaller,
							color: colors.lowerText,
							textAlign: "left",
							paddingVertical: 4,
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
			</View>
			<FlatList
				data={members}
				keyExtractor={(item) => item.userid}
				contentContainerStyle={{
					alignItems: "center",
				}}
				ListHeaderComponent={() => (
					<View
						style={{
							width,
							paddingHorizontal: 20,
							paddingVertical: 10,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<SmallText
							style={{ textAlign: "left", fontSize: sizes.big }}
						>
							People {memberCount}
						</SmallText>
						<TouchableHighlight
							underlayColor={"#333"}
							onPress={() =>
								navigation.navigate("Addmember", {
									details: {
										leaderid: member.userid,
									},
								})
							}
							style={{
								width: 40,
								height: 40,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 20,
							}}
						>
							<AntDesign
								name="plus"
								color={colors.text}
								size={sizes.big}
							/>
						</TouchableHighlight>
					</View>
				)}
				renderItem={({ item, index }) => (
					<View
						style={{
							width: 0.9 * width,
							height: 80,
							backgroundColor: colors.card,
							borderRadius: 10,
							marginVertical: 10,
							flexDirection: "row",
							alignItems: "center",
							padding: 20,
							position: "relative",
						}}
					>
						<View
							style={{
								width: 50,
								height: 50,
								borderRadius: 25,
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
						</View>
						<TouchableOpacity
							style={{
								position: "absolute",
								right: 10,
							}}
							onPress={async () => {
								const response = await dispatch(
									deleteBacentaMember({
										memberid: item.userid,
										leaderid: member.userid,
									})
								).unwrap();
								fetchData();

								showToastWithGravity(response);
							}}
						>
							<AntDesign
								name="delete"
								color={colors.lowerText}
								size={sizes.big}
							/>
						</TouchableOpacity>
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default Memberdetails;
