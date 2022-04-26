import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Context as AuthContext } from "./src/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreens = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

const TrackListStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="TrackList"
				component={TrackListScreen}
				options={{ title: "Tracks", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="TrackDetail"
				component={TrackDetailScreen}
				 options={{ headerTitleAlign: "center"  }}
			/>
		</Stack.Navigator>
	);
};

const AppStack = createBottomTabNavigator();
const AppStackScreens = () => {
	return (
		<AppStack.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "TrackCreate") {
						iconName = "plus";
					} else if (route.name === "TrackListStack") {
						iconName = "th-list";
					} else if (route.name === "Account") {
						iconName = "gear";
					}
					return <FontAwesome name={iconName} size={20} color={focused ? '#2196F3' : 'black'} />;
				},
			})}
		>
			<AppStack.Screen
				name="TrackListStack"
				component={TrackListStack}
				options={{ headerShown: false, title: "Tracks" }}
			/>
			<AppStack.Screen
				name="TrackCreate"
				component={TrackCreateScreen}
				options={{
					title: "Add Track",
					headerTitleAlign: "center"
				}}
			/>
			<AppStack.Screen
				name="Account"
				component={AccountScreen}
				options={{
					headerTitleAlign: "center"
				}}
			/>
		</AppStack.Navigator>
	);
};

function ScreenList() {
	const {
		tryLocalSignin,
		state: { token, isLoading },
	} = useContext(AuthContext);

	useEffect(() => {
		const trySign = async () => {
			// console.log("try");
			// console.log('token',token)
			await tryLocalSignin();
			// console.log(isLoading);
		};
		trySign();
	}, []);

	if (isLoading) {
		return null;
	} else {
		return <>{token === null ? <AuthStackScreens /> : <AppStackScreens />}</>;
	}
}
export default ScreenList;
