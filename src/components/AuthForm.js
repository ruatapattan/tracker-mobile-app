import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./Spacer";

function AuthForm({ headerText, errorMessage, onSubmit, submmitButtonText }) {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<Spacer>
				<Text h3>{headerText}</Text>
			</Spacer>
			<Input autoCapitalize="none" autoCorrect={false} label="email" value={email} onChangeText={setEmail} />
			<Spacer />
			<Input
				secureTextEntry
				autoCapitalize="none"
				autoCorrect={false}
				label="password"
				value={password}
				onChangeText={setPassword}
			/>
			{errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
			<Spacer>
				<Button title={submmitButtonText} onPress={() => onSubmit({ email, password })} />
			</Spacer>
		</>
	);
}

const styles = StyleSheet.create({
	errorMessage: {
		fontSize: 16,
		color: "red",
		marginLeft: 15,
	},
});

export default AuthForm;
