import React, { useState } from "react";
import {
	SafeAreaView,
	TextInput,
	StyleSheet,
	Button,
	Alert,
} from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	const handleEmailSignUp = async () => {
		try {
			// await auth().createUserWithEmailAndPassword(email, password);
			Alert.alert("Sign-Up Success");
		} catch (error: any) {
			Alert.alert("Sign-Up Error", error.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={setUsername}
				value={username}
				placeholder="Username"
			/>
			<TextInput
				style={styles.input}
				onChangeText={setEmail}
				value={email}
				placeholder="Email"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				onChangeText={setPassword}
				value={password}
				placeholder="Password"
				secureTextEntry
			/>
			<Button title="Sign Up" onPress={handleEmailSignUp} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		width: "100%",
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 2,
		marginVertical: 5,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
});

export default SignUp;
