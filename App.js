import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Form from "./screens/Form";

const Stack = createNativeStackNavigator();
function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Form"
				screenOptions={{ headerShown: false }}
			>
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
