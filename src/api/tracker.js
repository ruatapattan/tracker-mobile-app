import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TUNNEL_URL } from "../../environment";


const instance = axios.create({
	baseURL: TUNNEL_URL,
});

instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		console.log('error', err)
		return Promise.reject(err);
	}
);

export default instance;
