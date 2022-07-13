import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Modal,
	FlatList,
	Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default DropDownPicker = ({
	query,
	setQuery,
	defaultValue,
	setDefaultValue,
	modalVisible,
	setModalVisible,
	onChange,
	isEmpty,
	setIsEmpty,
	placeholder,
	setData,
	searchable,
}) => {
	const { width, height } = Dimensions.get("screen");
	return (
		<Modal animationType="slide" visible={modalVisible} transparent={true}>
			<View
				style={{
					position: "absolute",
					height: 0.4 * height,
					width,
					backgroundColor: "white",
					bottom: 0,
					borderRadius: 10,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{searchable ? (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								borderWidth: 1.2,
								borderColor: "#999",
								width: 250,
								height: 39,
								marginRight: 30,
								marginVertical: 15,
								borderRadius: 5,
								padding: 5,
							}}
						>
							<TextInput
								style={{
									fontFamily: "PTSans_400Regular",
									fontSize: 16,
									width: 210,
								}}
								placeholder={placeholder}
								onChangeText={onChange}
								autoFocus={true}
								defaultValue={isEmpty}
							/>
							<Ionicons
								name="close-circle"
								size={16}
								color="#999"
								onPress={() => {
									setDefaultValue(null);
									setQuery([]);
									setIsEmpty("");
								}}
							/>
						</View>
					) : null}
					<Text
						style={{
							fontFamily: "PTSans_400Regular",

							fontSize: 16,
						}}
						onPress={() => {
							setModalVisible(false);
							setQuery([]);
							setIsEmpty("");
						}}
					>
						Close
					</Text>
				</View>
				<View
					style={{
						paddingHorizontal: 25,
					}}
				>
					{query.length === 0 && isEmpty.length > 1 ? (
						<Text
							style={{
								fontFamily: "PTSans_400Regular",

								fontSize: 18,
								fontWeight: "700",
							}}
						>
							No Results
						</Text>
					) : null}
					<View
						style={{
							maxHeight: 360,
						}}
					>
						<FlatList
							data={query}
							extraData={defaultValue}
							keyboardShouldPersistTaps={"handled"}
							showsVerticalScrollIndicator={false}
							ItemSeparatorComponent={() => (
								<View
									style={{
										backgroundColor: "#bbb",
										width: 0.9 * width,
										height: 1,
									}}
								/>
							)}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										setDefaultValue(item);
										setModalVisible(false);
										setQuery([]);
										setIsEmpty("");
										setData(item.phonenumber);
									}}
								>
									<View
										style={{
											width: 0.9 * width,
											height: 50,
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												fontFamily: "PTSans_400Regular",
												fontSize: 18,
											}}
										>
											{item.fullname}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};
