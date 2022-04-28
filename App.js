import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Form from "./screens/Form";
import Welcome from "./screens/Welcome";

const Stack = createNativeStackNavigator();
function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Welcome"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen
					name="Welcome"
					component={Welcome}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Form"
					component={Form}
					options={{ title: "Form" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
