import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Context as AuthContext } from "../contexts/AuthContext";

function ResolveAuthScreen() {
	const { tryLocalSignin } = useContext(AuthContext);

	useEffect(() => {
		tryLocalSignin();
	}, []);

	return null;
}

const styles = StyleSheet.create({});

export default ResolveAuthScreen;
