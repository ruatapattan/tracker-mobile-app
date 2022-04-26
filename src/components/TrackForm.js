import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../contexts/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
function TrackForm() {
	const {
		state: { name, recording, locations },
		startRecording,
		stopRecording,
		changeName,
	} = useContext(LocationContext);

	const [saveTrack] = useSaveTrack();
	const [inputError, setInputError] = useState(false)

	const handleClickSave = () => {
		if (name) {
			saveTrack()
		} else {
			setInputError(true)
		}
	}

	useEffect(() => {
	  if (name && inputError) {
		setInputError(false)
	  }
	}, [name])
	

	return (
		<>
			<View style={styles.textBox}>
				<Input placeholder="track name" value={name} onChangeText={changeName} />
				{inputError ? <Text style={styles.inputError}>{"Track name is required!"}</Text> : null}
			</View>
			<Spacer>
				{recording ? (
					<Button title="stop" onPress={stopRecording} />
				) : (
					<Button title="start recording" onPress={startRecording} />
				)}
			</Spacer>
			{!recording && locations.length ? (
				<Spacer>
					<Button title="save" onPress={handleClickSave} />
				</Spacer>
			) : null}
		</>
	);
}

const styles = StyleSheet.create({
	inputError: {
		fontSize: 16,
		color: "red",
		marginLeft: 15,
		
	},
	textBox : {
		marginHorizontal: 15
	}
});

export default TrackForm;
