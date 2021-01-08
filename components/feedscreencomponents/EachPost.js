import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import config2 from "../../config2";
import AppButton from "../AppButton";
import AdComponent from "./AdComponent";
import FeelLikeComponent from "./FeelLikeComponent";

export default function EachPost({ post, gif, onPress }) {
  /*
    THIS function returns each post
    so each post is rendered here, along with what happens when you press on a post
  */
  const [modalVisible, setModalVisible] = useState(false);
  const [gifUrl, setGifUrl] = useState(
    "https://media.tenor.com/images/973e3481caf3d8d6e48ebf18e9ca725f/tenor.gif"
  );

  //data i pass here needs to be made into a json object, so i can access certain attributes
  var a = JSON.stringify(post);
  var data = JSON.parse(a);

  const generateOdsToRenderAd = () => {
    //THE ODS THAT WE SHOULD GENERATE AN AD
    return Math.floor(Math.random() * 10 + 1);
  };

  const generateGifWord = () => {
    const gifWords = [
      "popsmoke",
      "exited",
      "smile",
      "dancing",
      "puppies",
      "llama",
    ];
    const gifWord = gifWords[Math.floor(Math.random() * gifWords.length)];
    return gifWord;
  };

  useEffect(() => {
    const getGif = async () => {
      const resp = await axios(
        `https://api.tenor.com/v1/random?q=${generateGifWord()}&key=${
          config2.gifs
        }`
      );
      const gif = resp.data.results[0].media[0].gif.url;
      setGifUrl(gif);
      gif.replace(/\"/g, "");
    };
    getGif();
  }, []);

  const sheetRef = React.useRef(null);

  return (
    <>
      {generateOdsToRenderAd() === 10 ? <AdComponent /> : null}
      <TouchableOpacity
        // UNCOMMENT THIS TO EDIT WHAT HAPPENS WHEN A USER PRESSES A POST
        onPress={() => onPress({ data })}
        style={styles.container}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 100, margin: 10 }}
          source={{ uri: data.user.photoURL }}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={3} style={styles.postText}>
            {data.post}
          </Text>
        </View>
      </TouchableOpacity>

      {/*   THE MODAL BELOW, IS WHAT HAPPENS AFTER YOU PRESS ON A POST */}
      {/* <Modal transparent={true} visible={modalVisible} animationType="slide">
        <ScrollView style={styles.insideModal}>
          <AppButton
            iconName="close"
            iconColor={colors.primaryDark}
            style={{
              backgroundColor: colors.darkGray,
              alignSelf: "center",
              width: 50,
              height: 50,
            }}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.belowCLoseButtonOnModalContainer}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 100, margin: 10 }}
              source={{ uri: data.user.photoURL }}
            />

            <Text
              style={{
                fontSize: 20,
                marginVertical: 10,
                fontWeight: "bold",
                color: colors.primaryDark,
                textAlign: "auto",
              }}
            >
              {data.post}
            </Text>
          </View>
          <FeelLikeComponent />
          <View style={styles.gifContainer}>
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 20 }}
              onError={(er) => console.log("error is", er)}
              source={{ uri: gifUrl }}
            />
          </View>
        </ScrollView>
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  belowCLoseButtonOnModalContainer: {
    margin: 10,
    flex: 1,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 10,
  },
  container: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: colors.darkGray,
    maxWidth: "100%",
    width: "100%",
    marginVertical: 1,
    height: 100,
    alignContent: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.27,
    elevation: 1,
  },
  gifContainer: {
    marginTop: 30,
    height: "80%",
    width: "65%",
    alignSelf: "center",
    alignItems: "center",
  },
  postText: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: "bold",
  },
  textContainer: {
    backgroundColor: colors.primaryDark,
    padding: 5,
    justifyContent: "center",
    width: "80%",
    height: "90%",
    borderRadius: 10,
  },
  insideModal: {
    width: "100%",
    height: "100%",
    marginTop: "80%",
    backgroundColor: colors.primaryDark,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    padding: 20,
  },
});
