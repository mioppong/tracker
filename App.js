import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AppButton from "./components/AppButton";
import ListScreen from "./screens/ListScreen";

export default function App() {
  return <ListScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: 200,
    width: 200,
  },
  loginButton: {
    height: 60,
    width: 60,
  },
});
