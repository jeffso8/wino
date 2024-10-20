import { useState } from "react";
import { SafeAreaView, TextInput, StyleSheet, Button } from "react-native";

const ContactForm = ({}) => {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [email, setEmail] = useState("");

	const updateDetails = async () => {
		const data = { username, firstName, lastName, email };
		const url = "http://127.0.0.1:5000/create_users";
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const response = await fetch(url, options);
		if (!response.ok) {
			const message = await response.json();
			console.log("Error: ", message);
		} else {
			console.log("Success: ", response);
		}
	};

	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={setUsername}
				value={username}
				placeholder="Username"
				editable
				multiline
			/>
			<TextInput
				style={styles.input}
				onChangeText={setFirstName}
				value={firstName}
				placeholder="First Name"
				editable
				multiline
			/>
			<TextInput
				style={styles.input}
				onChangeText={setlastName}
				value={lastName}
				placeholder="Last Name"
				editable
				multiline
			/>
			<TextInput
				style={styles.input}
				onChangeText={setEmail}
				value={email}
				placeholder="Email"
				editable
				multiline
			/>
			<Button title="Submit Details" onPress={updateDetails} />
		</SafeAreaView>
	);
};

export default ContactForm;

const styles = StyleSheet.create({
	input: {
		height: 20,
		margin: 10,
		borderWidth: 2,
		padding: 20,
	},
});
