import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../contexts/AuthContext";

function AccountScreen() {
	const { signout } = useContext(AuthContext);
	return (
		<SafeAreaView>
			{/* <Text style={{ fontSize: 48 }}>AccountScreen</Text> */}
			<Spacer>
				<Button title="Sign Out" onPress={signout} />
			</Spacer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});

export default AccountScreen;
