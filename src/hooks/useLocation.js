import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from "expo-location";
import { useIsFocused } from "@react-navigation/core";

export default (shouldTrack, callback) => {
	const [err, setErr] = useState(null);
	//optimally, you dont need subscriber as state for a locally used var
	// const [subscriber, setSubscriber] = useState(null);
	// console.log(shouldTrack);

	useEffect(() => {
		//*** type this into terminal to reset permission
		//adb shell pm reset-permissions
		//check lesson 238 for more info

		//declare subscriber literally as a var
		//is better in this situation
		let subscriber = null;
		
		const startWatching = async () => {
			try {
				const { granted } = await requestForegroundPermissionsAsync();
				// const sub = await watchPositionAsync(
				subscriber = await watchPositionAsync(
					{
						accuracy: Accuracy.BestForNavigation,
						timeInterval: 1000,
						distanceInterval: 10,
					},
					callback
					// (location) => {
					// 	// console.log("loca-obj", location);
					// 	addLocation(location);
					// }
				);
				// setSubscriber(sub);
				if (!granted) {
					throw new Error("Location permission not granted");
				}
			} catch (e) {
				setErr(e);
			}
		};
		if (shouldTrack) {
			startWatching();
		} else if (subscriber) {
			//stop watching
			subscriber.remove();
			// setSubscriber(null);
			subscriber = null;
		}

		//clean up when effect rerenders
		return () => {
			if (subscriber) {
				subscriber.remove();
			}
		};
	}, [shouldTrack, callback]);
	//callback here is the one from useCallback
	//when recording changed, useCallback will recreate the cb
	//making it a different cb func than the og one

	return [err];
};
