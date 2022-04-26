import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

function SignupScreen() {
	// const navigation = useNavigation();
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	const { state, signup, clearErrorMessage } = useContext(AuthContext);
	// console.log("msg", state.errorMessage);

	useFocusEffect(
		//usecallback to be able to set a dependency
		//since usefocuseffect isnt a callback
		React.useCallback(() => {
			return () => {
				// console.log("clear on blur");
				clearErrorMessage();
			};
		}, [])
	);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.container}>
				<AuthForm
					headerText={"Sign up for Tracker"}
					errorMessage={state.errorMessage}
					onSubmit={signup}
					submmitButtonText="Sign Up"
				/>
				<NavLink text="already have an account?" routeName="Signin" />
				{/* <Button title="go to account?" onPress={() => setGo(true)} /> */}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		// borderColor: "red",
		// borderWidth: 10,
		flex: 1,
		justifyContent: "center",
		marginBottom: 200,
	},
});

export default SignupScreen;
