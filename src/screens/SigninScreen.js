import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

function SigninScreen() {
	const { state, signin, clearErrorMessage } = useContext(AuthContext);

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
					headerText={"Sign in for Tracker"}
					errorMessage={state.errorMessage}
					onSubmit={signin}
					submmitButtonText="Sign In"
				/>
				<NavLink text="don't have an account?" routeName="Signup" />
				{/* <Button title="go to account?" onPress={() => setGo(true)} /> */}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 200,
	},
	errorMessage: {
		fontSize: 16,
		color: "red",
		marginLeft: 15,
	},
});
export default SigninScreen;
