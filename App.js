import "react-native-gesture-handler";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/index";
import Navigator from "./navigator";
import { useColorScheme, StatusBar } from "react-native";

// console.log("app")

function App() {
	const theme = useColorScheme();
	const myDarkTheme = {
		...DarkTheme,
		colors: {
			...DarkTheme.colors,
			primary: "rgb(255, 0, 0)",
			lowerText: "grey",
			shadow: "#ffffff",
			background: "rgb(6, 8, 8)",
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
		<Provider store={store}>
			<StatusBar
				barStyle="light-content"
				backgroundColor={"black"}
				translucent
				animated
			/>
			<NavigationContainer
				theme={theme === "dark" ? myDarkTheme : myLightTheme}
			>
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
}

export default App;
