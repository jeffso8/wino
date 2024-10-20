import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const router = useRouter();
	const navigation = useNavigation();
	const handleLogin = async () => {
		// Here you would typically make an API call to verify credentials
		// For this example, we'll just set a dummy token
		// await AsyncStorage.setItem("userToken", "dummyToken");
		// router.replace("/sign-up");
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button title="Login" onPress={handleLogin} />
			{/* <Button title="Create Account" onPress={() => router.push("/sign-up")} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
});

export default Login;
