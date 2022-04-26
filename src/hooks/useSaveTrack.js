import { useContext } from "react";
import { Context as TrackContext } from "../contexts/TrackContext";
import { Context as LocationContext } from "../contexts/LocationContext";
import { useNavigation } from "@react-navigation/core";

export default () => {
	const { createTrack } = useContext(TrackContext);
	const navigation = useNavigation();

	const {
		state: { locations, name },
		reset,
	} = useContext(LocationContext);

	const saveTrack = async () => {
		await createTrack(name, locations);
		reset();
		navigation.navigate("TrackList");
	};

	//making this a custom hook
	return [saveTrack];
};
