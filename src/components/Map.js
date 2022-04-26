import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../contexts/LocationContext";

function Map() {
	const {
		state: { currentLocation, locations },
		addLocation
	} = useContext(LocationContext);

	return (
		<>
			{currentLocation ? (
				<View>
					<MapView
						style={styles.map}
						// initialRegion={{
						// 	...currentLocation.coords,
						// 	latitudeDelta: 0.01,
						// 	longitudeDelta: 0.01,
						// }}
						//this prop will track the movement on the map
						//wont let you drag away though
						region={{
							...currentLocation.coords,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01,
						}}
					>
						<Circle
							center={currentLocation.coords}
							radius={30}
							strokeColor="rgba(158,158,255,1)"
							fillColor="rgba(158,158,255,0.3)"
						/>
						<Polyline lineDashPattern={[0]} strokeColor="rgba(33, 150, 243, 1)" strokeWidth={5} coordinates={locations.map((item) => item.coords)} />
					</MapView>
				</View>
			) : (
				<ActivityIndicator size="large" style={{ marginTop: 200 }} color="slateblue" />
			)}
		</>
	);
}

const styles = StyleSheet.create({
	map: {
		height: 300,
	},
});

export default Map;