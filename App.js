import "react-native-gesture-handler";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/index";
import Navigator from "./navigator";
import { useColorScheme, Appearance } from "react-native";

function App() {
	const theme = Appearance.getColorScheme();
	return (
		<Provider store={store}>
			<NavigationContainer
				theme={false ? DarkTheme : DefaultTheme}
			>
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
}

export default App;
