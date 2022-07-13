import { View, Text, Alert, ScrollView } from "react-native";
import React from "react";
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu";
import SmallText from "./SmallText";
import { useTheme } from "@react-navigation/native";
import sizes from "./constants/sizes";

const PopupMenu = ({
	items,
	children,
	menuContainerStyle,
	menuWrapperStyle,
	itemContainerStyle,
	triggerWrapperStyles,
	heading,
	menuStyle,
}) => {
	const { colors, dark } = useTheme();

	return (
		<Menu
			style={{
				...menuStyle,
			}}
		>
			<MenuTrigger
				customStyles={{
					triggerWrapper: {
						...triggerWrapperStyles,
					},
					triggerTouchable: {
						borderRadius: 30,
					},
				}}
			>
				{children}
			</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsWrapper: {
						...menuWrapperStyle,
					},
					optionWrapper: {
						padding: 10,
					},
					optionsContainer: {
						...menuContainerStyle,
					},
				}}
			>
				{items.length !== 0 ? (
					<ScrollView>
						{heading}

						{items.map((item) => (
							<MenuOption
								onSelect={() => item.callback(item.name)}
								key={item._id}
								style={{
									height: 40,
									...itemContainerStyle,
								}}
							>
								<SmallText
									style={{
										color: colors.text,
										textAlign: "left",
										fontSize: sizes.smaller,
									}}
								>
									{item.name}
								</SmallText>
							</MenuOption>
						))}
					</ScrollView>
				) : null}
			</MenuOptions>
		</Menu>
	);
};

export default PopupMenu;
