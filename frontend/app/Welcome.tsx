import { Text, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
	GoogleSignin,
	GoogleSigninButton,
	isSuccessResponse,
	SignInResponse,
	statusCodes,
} from "@react-native-google-signin/google-signin";

const Welcome = () => {
	const [error, setError] = useState<unknown | string>("");
	const [userInfo, setUserInfo] = useState<SignInResponse | null>(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// TODO: Call GoogleSignin.configure before we can call signIn
	const configureGoogleSignIn = () => {
		GoogleSignin.configure({
			webClientId: "945545095865-j5d7hl1qiq2daq4toe65qlh6ae73kte7.apps.googleusercontent.com",
			iosClientId: "945545095865-buuue4rntop7sjuun58fu0e8qkfn9idq.apps.googleusercontent.com"
		});
	};

	useEffect(() => {
		configureGoogleSignIn();
	});

	// Somewhere in your code
	const signIn = async () => {
		try {
			console.log("pressed sign in ")
			const userInfo = await GoogleSignin.signIn();
			console.log(JSON.stringify(userInfo,null,2))
			if (isSuccessResponse(userInfo)) {
				setUserInfo(userInfo);
			} else {
				setError("error with response");
			}
		} catch (error) {
			setError(error)
			}
	}

	const handleLogin = async () => {
		console.log("handle raw log in button pressed..")
		// Here you would typically make an API call to verify credentials
		// For this example, we'll just set a dummy token
		// await AsyncStorage.setItem("userToken", "dummyToken");
		// router.replace("/sign-up");
	};

	return (
		<SafeAreaView style={styles.container}>
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
			<Text>Sign Up Screen</Text>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn}
			/>
		</SafeAreaView>
	);
};

export default Welcome;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "white",
	},
	button: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
		alignItems: "flex-end",
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 5,
		paddingHorizontal: 10,
	},
});
