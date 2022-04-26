import { useContext } from "react";
import { Context as TrackContext } from "../contexts/TrackContext";
import { Context as LocationContext } from "../contexts/LocationContext";
import { Alert } from "react-native";

export default () => {
	const { updateTrackName } = useContext(TrackContext);

	const editTrackName = async (trackId, name) => {
		try {
			await updateTrackName(trackId, name);
			
		} catch (error) {
			Alert.alert("Error editing track name", "Something went wrong, please try again")
			console.log(error)
		}
	};

	//making this a custom hook
	return [editTrackName];
};
