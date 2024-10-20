import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import {
	GoogleSignin,
	GoogleSigninButton,
	isSuccessResponse,
	statusCodes,
} from "@react-native-google-signin/google-signin";

const Welcome = () => {
	// TODO: Call GoogleSignin.configure before we can call signIn

	// GoogleSignin.configure({
	// 	webClientId:
	// 		"829878053442-ova9ee97ss1tp0mhd2i8u72ga9usi11d.apps.googleusercontent.com",
	// });

	// Somewhere in your code
	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const response = await GoogleSignin.signIn();
			if (isSuccessResponse(response)) {
				// setState({ userInfo: response.data });
			} else {
				// sign in was cancelled by user
			}
		} catch (error) {
			if (true) {
				//   if (isErrorWithCode(error)) {
				// 	switch (error.code) {
				// 	  case statusCodes.IN_PROGRESS:
				// 		// operation (eg. sign in) already in progress
				// 		break;
				// 	  case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
				// 		// Android only, play services not available or outdated
				// 		break;
				// 	  default:
				// 	  // some other error happened
				// 	}
			} else {
				// an error that's not related to google sign in occurred
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text>Sign Up Screen</Text>

			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
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
});
