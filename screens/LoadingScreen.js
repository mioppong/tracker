import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import firebase from "firebase";
import colors from "../config/colors";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  checkIfLoggedIn = () => {
    //THIS FUNCTION IS CALLED, WHEN USER OPEN APP, IF LOGGED IN, GO TO FEED SCREEN
    //WE ALSO RESET INDEX, SO USER CANT GO BACK AFTER LOGGING IN
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //user logged in
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "myTabs" }],
        });
      } else {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    });
  };

  //function called right when you open app
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
