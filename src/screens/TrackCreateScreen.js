import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Map from "../components/Map";
import { Text } from "react-native-elements";
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from "expo-location";
import { Context as LocationContext } from "../contexts/LocationContext";
import useLocation from "../hooks/useLocation";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import TrackForm from "../components/TrackForm";
import Spacer from "../components/Spacer";

function TrackCreateScreen() {

	const {
		addLocation,
		state: { recording },
	} = useContext(LocationContext);
	
	const callback = useCallback(
		(location) => {
			addLocation(location, recording);
			//use recording state as deppendency of this cb
		},
		[recording]
	);
	const isFocused = useIsFocused();
	// console.log("isfocused", isFocused);

	//truthy check
	//even if not focused, if recording, will continue to track
	const [err] = useLocation(isFocused || recording, callback);

	useFocusEffect(
		//usecallback to be able to set a dependency
		//since usefocuseffect isnt a callback


		React.useCallback(() => {
			return () => {
				// console.log("clear on blur");
			};
		}, [])
	);

	const startWatching = async () => {
		try {
			const { granted } = await requestForegroundPermissionsAsync();
			await watchPositionAsync(
				{
					accuracy: Accuracy.BestForNavigation,
					timeInterval: 1000,
					distanceInterval: 10,
				},
				(location) => {
					addLocation(location);
				}
			);
			if (!granted) {
				throw new Error("Location permission not granted");
			}
		} catch (e) {
			console.log(e)
		}
	};

	useEffect(() => {
		//*** type this into terminal to reset permission
		//adb shell pm reset-permissions

		startWatching();
	}, []);

	return (
		<>
			<Text style={styles.header} h2>Create Track</Text>
			<Map />
			{err ? <Text>{"please allow location"}</Text> : null}
			<Spacer>
				<TrackForm />
			</Spacer>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 3
	}
});

export default TrackCreateScreen;
