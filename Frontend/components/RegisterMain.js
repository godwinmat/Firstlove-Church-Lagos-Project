import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";

import DropDownPickerArea from "./DropDownPickerArea";
import DropDownPicker from "./DropDownPicker";
import { getAreas } from "../store/reducers/areaReducers";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

const RegisterMain = ({
	registerData,
	error,
	onChange,
	onChangeText,
	onSubmit,
	disableButton,
	phoneNumber,
	setPhoneNumber,
	userDetails,
	setUserDetails,
	modalAreaVisible,
	setModalAreaVisible,
	modalVisible,
	setModalVisible,
	query,
	setQuery,
	dropDownValue,
	setDropDownValue,
	isEmpty,
	setIsEmpty,
}) => {
	const { colors, dark } = useTheme();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps={"handled"}
		>
			<Text
				style={{
					fontFamily: "Lato_700Bold",
					fontSize: 35,
					paddingBottom: 20,
					color: "#343a40",
				}}
			>
				Register a new {"\n"}Bacenta Account{"\n"}and Start Busing!
			</Text>
			<View>
				<TouchableOpacity
					onPress={() => {
						setModalAreaVisible(true);
					}}
				>
					<View
						style={{
							borderWidth: 1,
							borderColor: "grey",
							borderRadius: 10,
							width: 280,
							height: 45,
							padding: 10,
							color: "black",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 15,
						}}
					>
						{userDetails.fullname ? (
							<Text
								style={{
									fontFamily: "PTSans_400Regular",
									fontSize: 18,
								}}
							>
								{userDetails.fullname}
							</Text>
						) : (
							<Text
								style={{
									fontFamily: "PTSans_400Regular",
									fontSize: 18,
									color: "grey",
								}}
							>
								Search Fullname
							</Text>
						)}
						<AntDesign name="caretdown" size={12} />
					</View>
				</TouchableOpacity>
				<DropDownPicker
					query={query}
					setQuery={setQuery}
					defaultValue={userDetails}
					setDefaultValue={setUserDetails}
					modalVisible={modalAreaVisible}
					setModalVisible={setModalAreaVisible}
					onChange={onChange}
					placeholder="Search Fullname"
					isEmpty={isEmpty}
					setIsEmpty={setIsEmpty}
					setData={setPhoneNumber}
					searchable={true}
				/>
				<FormInput
					placeholder={"Username"}
					styles={{
						marginBottom: 5,
						borderColor: "grey",
						color: "black",
					}}
					onChangeText={onChangeText("username")}
					error={error.username.message}
					defaultValue={registerData.username}
				/>
				<FormInput
					placeholder={"Email Address"}
					styles={{
						marginBottom: 5,
						borderColor: "grey",
						color: "black",
					}}
					onChangeText={onChangeText("email")}
					error={error.email.message}
					defaultValue={registerData.email}
					keyboardType="email-address"
				/>
				<FormInput
					placeholder={"Phone Number"}
					styles={{
						marginBottom: 5,
						borderColor: "grey",
						color: "black",
					}}
					keyboardType="phone-pad"
					onChangeText={onChangeText("phonenumber")}
					error={error.phonenumber.message}
					editable={false}
					defaultValue={phoneNumber}
				/>
				<TouchableOpacity
					onPress={async () => {
						setModalVisible(true);
						const result = await dispatch(getAreas()).unwrap();
						if (result !== []) {
							setQuery(result);
							return;
						}
					}}
				>
					<View
						style={{
							borderWidth: 1,
							borderColor: "grey",
							borderRadius: 10,
							width: 280,
							height: 45,
							padding: 10,
							color: "black",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 15,
						}}
					>
						{dropDownValue === "" ? (
							<Text
								style={{
									fontFamily: "PTSans_400Regular",
									fontSize: 18,
									color: "grey",
								}}
							>
								Area
							</Text>
						) : (
							<Text
								style={{
									fontFamily: "PTSans_400Regular",
									fontSize: 18,
									color: "black",
								}}
							>
								{dropDownValue}
							</Text>
						)}
						<AntDesign name="caretdown" color={"grey"} size={12} />
					</View>
				</TouchableOpacity>
				<DropDownPickerArea
					query={query}
					setQuery={setQuery}
					dropDownValue={dropDownValue}
					setDropDownValue={setDropDownValue}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
				<PasswordInput
					placeholder={"Password"}
					styles={{
						marginBottom: 5,
						borderColor: "grey",
					}}
					onChangeText={onChangeText("password")}
					error={error.password.message}
					defaultValue={registerData.password}
				/>
				<PasswordInput
					placeholder={"Confirm Password"}
					styles={{
						marginBottom: 0,
						borderColor: "grey",
					}}
					onChangeText={onChangeText("confirmpassword")}
					error={error.confirmpassword.message}
					defaultValue={registerData.confirmpassword}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 10,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: "Lato_700Bold",
							fontSize: 25,
							color: "#343a40",
						}}
					>
						Register
					</Text>
					<TouchableOpacity
						style={{
							backgroundColor: disableButton ? "#eee" : "#eb1d1d",
							width: 50,
							height: 50,
							borderRadius: 25,
							justifyContent: "center",
							alignItems: "center",
						}}
						disabled={disableButton}
						onPress={() => onSubmit()}
					>
						<AntDesign name="right" size={25} color="#f8f9fa" />
					</TouchableOpacity>
				</View>
				<Text
					style={{
						fontFamily: "Lato_400Regular",
						fontSize: 16,
						textDecorationLine: "underline",
						paddingVertical: 10,
					}}
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					Login
				</Text>
			</View>
		</ScrollView>
	);
};

export default RegisterMain;
