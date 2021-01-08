import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import firebase from "firebase";
import AppButton from "../AppButton";
import colors from "../../config/colors";

export default function UserProfileButton({ style }) {
  /*
  THIS FUNCTION IS WHAT IS DISPLAYED AT THE BOTTOM RIGHT OF FEED SCREEN
  IT IS THE PICTURE/GIF OF THE USER
  */

  const state = firebase.auth().currentUser.photoURL;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.container, style]}
      >
        <ImageBackground
          imageStyle={{
            borderRadius: 20,
          }}
          style={styles.imageStyles}
          source={{ uri: state }}
        />
      </TouchableOpacity>

      {/* THIS MODAL BELOW, IS WHAT POPS UP AFTER YOU PRESS ON YOUR PROFILE PIC
        YOU CAN CHOOSE TO SIGN OUT HERE
        IF YOU SIGN OUT IT BRINGS YOU TO WELCOMESCREEN, CODE THAT DOES TRANSFER IS HELD IN LOADING SCREEN
      
      */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.insideModal}>
          <Text style={styles.signoutText}>Sign Out?</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AppButton
              title="NO"
              textStyle={{
                fontWeight: "bold",
                color: colors.white,
                fontSize: 40,
              }}
              style={{ height: 150, width: 150 }}
              onPress={() => setModalVisible(false)}
            />
            <AppButton
              title="YES"
              textStyle={{
                fontWeight: "bold",
                color: colors.white,
                fontSize: 40,
              }}
              style={{ height: 100, width: 100 }}
              onPress={() => firebase.auth().signOut()}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "1%",
    borderRadius: 20,
  },
  imageStyles: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  insideModal: {
    marginTop: "110%",
    backgroundColor: colors.primaryDark,
    padding: 10,
    borderRadius: 50,
    height: "100%",
  },
  signoutText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
  },
});
