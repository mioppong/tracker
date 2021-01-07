import React, { Component } from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { firebaseConfig } from "../config";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import config2 from "../config2";
import { connect } from "react-redux";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.user = [];
    this.props.refreshApp();
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }

    return false;
  };

  onSignIn = (googleUser) => {
    //console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("User Logged IN");

              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    //set params for what data you want to store example
                    // last_name: result.additionalUserInfo.profile.family_name,

                    gmail: result.user.uid,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  });

                this.setState({
                  first_name: result.additionalUserInfo.profile.given_name,
                }).then(function (snapshot) {
                  //console.log('snapshot,snapshot);
                });
              } else {
                //if the user is already created, we want to update their last logged in and picture
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_loggedin: Date.now(),
                    profile_picture: result.additionalUserInfo.profile.picture,
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config2.expoClientAndroidGoogleSignIn,
        iosClientId: config2.expoClientIosGoogleSignIn,
        androidStandaloneAppClientId: config2.androidGoogle,
        iosStandaloneAppClientId: config2.iOSGoogle,
        //behavior: "web",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../assets/baloons.gif")}
        >
          <Text style={styles.title}> SMILE</Text>
          <Text style={styles.attribution}>Gif From Cliply.co</Text>

          <AppButton
            style={styles.loginButton}
            textStyle={{ color: colors.white }}
            title="Sign In"
            iconName="google"
            iconColor={colors.white}
            onPress={() => this.signInWithGoogleAsync()}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshApp: () => {
      dispatch({ type: "REFRESH" });
    },
  };
};

export default connect(null, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  loginButton: {
    width: 100,
    height: 70,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 100,
    fontWeight: "900",
    color: colors.white,
    marginBottom: 100,
  },
  attribution: {
    color: colors.darkGray,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 10,
    top: "90%",
    left: "80%",
    width: "20%",
    height: "7%",
    position: "absolute",
  },
});
