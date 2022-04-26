import { useContext } from "react";
import { Context as TrackContext } from "../contexts/TrackContext";
import { Context as LocationContext } from "../contexts/LocationContext";
import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";

export default () => {
	const { deleteTrack } = useContext(TrackContext);
	const navigation = useNavigation();

	const removeTrack = async (trackId) => {
		try {
			await deleteTrack(trackId);
			navigation.navigate("TrackList");
			
		} catch (error) {
			Alert.alert("Error deleting track", "Something went wrong, please try again")
			console.log(error)
		}
	};

	//making this a custom hook
	return [removeTrack];
};
