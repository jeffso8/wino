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

const localPort = "http://127.0.0.1:5000"

const Welcome = ( { navigation }) => {
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
	const googleSignInPressedHandler = async () => {
		try {
			console.log("pressed sign in... ")
			const userInfo = await GoogleSignin.signIn();
			console.log(JSON.stringify(userInfo,null,2))
			if (isSuccessResponse(userInfo)) {
				setUserInfo(userInfo);
				 // Send to backend
				const response = await fetch(`${localPort}/auth/google`, {
					method: "POST",
					headers: {
							"Content-Type": "application/json"
					},
					body: JSON.stringify({ userInfo })
				});

				if (!response.ok) {
						throw new Error("Failed to authenticate");
				}

				const result = await response.json();
				} else {
					setError("error with response");
				}
		} catch (error) {
			console.log("error captured from attempted sign in..: ", error)
			setError(error)
		}
	}

	const handleLogin = async () => {
		console.log("handle raw log in button pressed..")
		let data = {
				"username": username,
				"password": password
			}
		
		const response = await fetch(`${localPort}/create_users`, {
			method: "POST",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify({ data })
		});

		if (!response.ok) {
			throw new Error("Failed to authenticate");
		}

	}


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
			<Text>Sign Up Screen</Text>
			<Button title="Sign In" onPress={handleLogin} />
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={googleSignInPressedHandler}
			/>
			<Button title="Sign Up" onPress={() => navigation.navigate('SignUpDetails')} />
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
