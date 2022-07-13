import "react-native-gesture-handler";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/index";
import Navigator from "./navigator";
import { useColorScheme, StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import {
	Provider as PaperProvider,
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

function App() {
	const theme = useColorScheme();
	const myDarkTheme = {
		...DarkTheme,
		colors: {
			...DarkTheme.colors,
			primary: "rgb(255, 0, 0)",
			lowerText: "grey",
			shadow: "#ffffff",
			// background: "rgb(6, 8, 8)",
		},
	};
	const myLightTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: "rgb(255, 0, 0)",
			lowerText: "grey",
			shadow: "#000000",
		},
	};

	return (
		<MenuProvider>
			<ReduxProvider store={store}>
				<StatusBar
					barStyle={
						theme === "dark" ? "light-content" : "dark-content"
					}
					backgroundColor={theme === "dark" ? "black" : "white"}
					translucent
					animated
				/>
				<PaperProvider
					theme={
						theme === "dark" ? PaperDarkTheme : PaperDefaultTheme
					}
				>
					<NavigationContainer
						theme={theme === "dark" ? myDarkTheme : myLightTheme}
					>
						<Navigator />
					</NavigationContainer>
				</PaperProvider>
			</ReduxProvider>
		</MenuProvider>
	);
}

export default App;
