import { useEffect, useState } from "react";
import {
	SafeAreaView,
	TextInput,
	StyleSheet,
	Button,
	Text,
} from "react-native";

const UserDetails = ({}) => {
	const [users, setUsers] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const response = await fetch("http://127.0.0.1:5000/users");
		const data = await response.json();
		setUsers(data.users);
		console.log(users);
	};

	return (
		<SafeAreaView>
			<Text>{users}</Text>
		</SafeAreaView>
	);
};

export default UserDetails;

const styles = StyleSheet.create({
	input: {
		alignItems: "center",
		height: 25,
		margin: 12,
		borderWidth: 2,
		padding: 20,
	},
});
