import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/Welcome";
import SignUp from "./app/screens/sign-up";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Welcome" component={Welcome} />
				<Stack.Screen name="SignUpDetails" component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
