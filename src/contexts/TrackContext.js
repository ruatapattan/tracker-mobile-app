import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const trackReducer = (state, action) => {
	switch (action.type) {
		case "fetch_tracks":
			return action.payload;
		default:
			return state;
	}
};

const fetchTracks = (dispatch) => async () => {
	const res = await trackerApi.get("/tracks");
	dispatch({ type: "fetch_tracks", payload: res.data });
};

const createTrack = (dispatch) => async (name, locations) => {
	// console.log(name, locations);
	await trackerApi.post("/tracks", { name, locations });
};

const updateTrackName = (dispatch) => async ( trackId, name) => {
	await trackerApi.patch(`/tracks/update-name/${trackId}`, { name });
};

const deleteTrack = (dispatch) => async (trackId) => {
	await trackerApi.delete(`/tracks/${trackId}`)
}

export const { Provider, Context } = createDataContext(trackReducer, { fetchTracks, createTrack, deleteTrack, updateTrackName }, []);
