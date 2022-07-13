import { View, Text, TouchableOpacity, Modal, FlatList, Dimensions } from "react-native";

export default DropDownPickerArea = ({
	query,
	setQuery,
	dropDownValue,
	setDropDownValue,
	modalVisible,
	setModalVisible,
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
						paddingHorizontal: 25,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginTop: 15,
						}}
					>
						<Text
							style={{
								fontFamily: "PTSans_700Bold",
								fontSize: 20,
							}}
						>
							Choose Areas
						</Text>
						<Text
							style={{
								fontFamily: "PTSans_400Regular",
								fontSize: 17,
							}}
							onPress={() => {
								setModalVisible(false);
								setQuery([]);
							}}
						>
							Close
						</Text>
					</View>

					<View
						style={{
							maxHeight: 280,
						}}
					>
						<FlatList
							data={query}
							extraData={dropDownValue}
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
										setDropDownValue(item.name);
										setModalVisible(false);
										setQuery([]);
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
											{item.name}
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
