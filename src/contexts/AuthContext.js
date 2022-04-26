import React, { createContext, useState } from "react";
import createDataContext from "./createDataContext";
import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
	switch (action.type) {
		case "add_error":
			return { ...state, errorMessage: action.payload };

		//used for both signin and signup
		case "signin":
			// console.log("setting token");
			return { token: action.payload, errorMessage: "" };
		case "local_signin":
			// console.log("locally setting token");
			return { token: action.payload, errorMessage: "", isLoading: false };
		case "clear_error_message":
			return { ...state, errorMessage: "" };
		case "signout":
			return { token: null, errorMessage: "", isLoading: false };
		default:
			return state;
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const res = await tracker.post("/signup", {
				email,
				password,
			});
			// console.log(res.data);
			//setUserToken via async storage
			await AsyncStorage.setItem("token", res.data.token);

			//type is signin cuz they basically do the same thing either way
			//so we reuse the case
			dispatch({ type: "signin", payload: res.data.token });

			//navigate to main flow
		} catch (err) {
			//throw err
			console.log(err.response.data);
			dispatch({ type: "add_error", payload: "something went wrong with sign up" });
		}
	};
};

const tryLocalSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem("token");
	dispatch({ type: "local_signin", payload: token });
};

//not returning also works
const signin =
	(dispatch) =>
	async ({ email, password }) => {
		try {
			const res = await tracker.post("/signin", { email, password });

			//setUserToken
			await AsyncStorage.setItem("token", res.data.token);
			dispatch({ type: "signin", payload: res.data.token });
		} catch (err) {
			//throw err
			console.log(err.response.data);
			dispatch({
				type: "add_error",
				payload: "something went wrong with sign in",
			});
		}
	};

const signout = (dispatch) => {
	return async () => {
		// remove token
		await AsyncStorage.removeItem("token");
		dispatch({ type: "signout" });
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin, signout },
	{ token: null, errorMessage: "", isLoading: true }
);
