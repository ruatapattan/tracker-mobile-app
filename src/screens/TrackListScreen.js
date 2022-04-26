import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as TrackContext } from "../contexts/TrackContext";
import { useFocusEffect } from "@react-navigation/core";

function TrackListScreen() {
	const navigation = useNavigation();
	const { state, fetchTracks } = useContext(TrackContext);

	useFocusEffect(
		//since usefocuseffect isnt a callback
		React.useCallback(() => {
			// console.log("hello");
			const fetch = async () => {
				await fetchTracks();
			};
			fetch();
		}, [])
	);

	// console.log("sat", state);

	return (
		<View style={styles.container}>
			<FlatList
				// style={{ borderColor: "black", borderWidth: 1, flex: 1, }}
				style={styles.flatListContainer}
				data={state}
				keyExtractor={(item) => item._id}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TrackDetail", { _id: item._id })}>
							<ListItem containerStyle={{backgroundColor: '#2196F3'}} >
								<ListItem.Content>
									<ListItem.Title style={styles.listText}>Track #{index + 1}</ListItem.Title>
									<ListItem.Title style={styles.listText}>Track Name: {item.name}</ListItem.Title>
								</ListItem.Content>
								<ListItem.Chevron size={20} iconStyle={styles.listText} />
							</ListItem>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	flatListContainer: {
		display: "flex", 
		flexGrow: 1 , 
		flex: 1
	},
	button: {
		margin: 3
	}, 
	listText: {
		color: 'white'
	}
});

export default TrackListScreen;
