import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as TrackContext } from "../contexts/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import { Button, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import useRemoveTrack from "../hooks/useRemoveTrack";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import useEditTrack from "../hooks/useEditTrack";
import { MaterialIcons } from '@expo/vector-icons';

function TrackDetailScreen({ route }) {

	const [isEditing, setIsEditing] = useState(false)
	const [inputError, setInputError] = useState(false)


	const { state } = useContext(TrackContext);
	const { _id } = route.params;

	const track = state.find((item) => item._id === _id);

	const mappedCoord = track ? track.locations.map((item) => item.coords): [];
	const initialCoords = mappedCoord.length ? mappedCoord[0] : {}

	const [removeTrack] = useRemoveTrack();
	const [editTrackName] = useEditTrack();
	const [trackName, setTrackName] = useState('')
	const [cachedTrackName, setCachedTrackName] = useState('')
	

	useEffect(() => {
		if (trackName && inputError) {
		  setInputError(false)
		} else if (!trackName) {
			setInputError(true)
		}

	  }, [trackName])

	  useEffect(() => {
		
		if (track) {
			setTrackName(track.name)
			setCachedTrackName(track.name)
		}

	  }, [track])
	  

	const handleClickEdit = () => {
		setTrackName(cachedTrackName)
		setIsEditing(true)
	}

	const handleSubmitEdit = (_id, name) => {
		if (name) {
			editTrackName(_id, name)
			setCachedTrackName(name)
			setIsEditing(false)
		}
	}

	const cancelEditTrackName = () => {
		setIsEditing(false)
	}

	const editModeButtons = () => {
		return (
			<View style={styles.showContainer}>
				<Feather
					style={{marginRight: 10}}
					name="check-square"
					size={30}
					color={"#2196F3"}
					onPress={() => handleSubmitEdit(_id, trackName)}
				/>
				<MaterialIcons
					name="cancel-presentation"
					size={30}
					color={"#2196F3"}
					onPress={cancelEditTrackName}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View>
				<>
					{isEditing ? 
						<View style={styles.editContainer}>
							<Input 
								errorMessage={!trackName && "Track name is required!"} 
								errorStyle={styles.inputError} 
								rightIcon={editModeButtons} 
								inputStyle={styles.inputBox} 
								placeholder="track name" 
								value={trackName} 
								onChangeText={setTrackName} 
							/>
						</View> : 
						<View style={styles.showContainer}>
							<Text style={styles.header}>Track: {cachedTrackName}</Text>
							<FontAwesome5 name="edit" size={20} color={'#2196F3'} onPress={handleClickEdit} />
						</View>
					}
				</>
				{<>
					<MapView
						style={styles.map}
						initialRegion={{
							longitudeDelta: 0.01,
							latitudeDelta: 0.01,
							latitude: 0,
							longitude: 0,
							...initialCoords,
						}}
					>
						<Polyline lineDashPattern={[0]} coordinates={mappedCoord} strokeColor="rgba(33, 150, 243, 1)" strokeWidth={5}/>
					</MapView>
					<Spacer>
						<Button buttonStyle={{backgroundColor: 'red'}} title={'Delete'} onPress={() => removeTrack(_id)}  />
					</Spacer>
				</>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: { 
		fontSize: 30,
		marginRight: 5
	 },
	map: {
		height: 300,
		marginTop: 10,
	},
	container: {
		marginTop: 20
	},
	editContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignContent:'flex-start',
		

	},
	showContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',

	},
	inputBox: {
		padding: 0,
		margin: 0
	},
	inputError: {
		fontSize: 16,
		color: "red",
		
	},
});

export default TrackDetailScreen;
