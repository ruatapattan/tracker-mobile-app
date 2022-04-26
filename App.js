import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import ScreenList from "./ScreenList";
import { Provider as AuthProvider } from "./src/contexts/AuthContext";
import { Provider as LocationProvider } from "./src/contexts/LocationContext";
import { Provider as TrackProvider } from "./src/contexts/TrackContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#fff",
	},
};

const App = () => {
	return (
		<NavigationContainer theme={MyTheme}>
			<ScreenList />
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default () => {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<LocationProvider>
					<TrackProvider>
						<App />
					</TrackProvider>
				</LocationProvider>
			</AuthProvider>
		</SafeAreaProvider>
	);
};
