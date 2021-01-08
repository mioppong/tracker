import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";

const { height, width } = Dimensions.get("window");

export default function EachImageItem({ quote }) {
  /*
  THIS FUNCTION IS WHAT EACH PAGE IS IN THE QUOTES TAB,
  SO EACH IMAGE WITH A QUOTE IS RENDERED HERE
*/

  var url =
    "https://source.unsplash.com/random/sig=1" +
    "" +
    Math.floor(Math.random() * 1000);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          blurRadius={20}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          source={{ uri: url }}
          resizeMode="cover"
          imageStyle={{ backgroundColor: colors.primaryDark }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.5)", "transparent"]}
            style={{
              padding: 10,
              justifyContent: "center",
              height: "30%",
              width: "90%",
              borderRadius: 100,
            }}
          >
            <Text style={styles.quoteStyle}>{quote.item.text}</Text>
            <Text style={styles.authorStyle}>{quote.item.author}</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  artistName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  authorStyle: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,

    color: colors.primaryDark,
  },
  container: {
    backgroundColor: colors.primaryDark,
    flex: 1,
    justifyContent: "center",
    marginTop: 60,
  },
  imageContainer: {
    height,
    width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  quoteStyle: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white,
  },
});
