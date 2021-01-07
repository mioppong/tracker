import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal,
  TextInput,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { connect } from "react-redux";
import UserProfileButton from "../components/feedscreencomponents/UserProfileButton";
import firebase from "firebase";
import EachPost from "../components/feedscreencomponents/EachPost";
import PullToRefresh from "../components/feedscreencomponents/PullToRefresh";
import Animated, { color } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import axios from "axios";
import config2 from "../config2";
import FeelLikeComponent from "../components/feedscreencomponents/FeelLikeComponent";

class FeedScreen extends Component {
  /*
    THIS CLASS IS THE FIRST TAB, FEED SCREEN
    EVERYTHING ON FEED SCREEN RUNS THROUGH HERE
  */
  constructor(props) {
    super(props);
    this.gifWords = [
      "popsmoke",
      "exited",
      "smile",
      "dancing",
      "puppies",
      "llama",
    ];

    this.state = {
      modalVisible: false,
      gifWord: "",
      gifURL:
        "https://media.tenor.com/images/42f4b2be8ded2feaf6f4d1560f039d14/tenor.gif",
      refreshing: false,
      posts: [],
      sentimentValue: 0,
      negativeSentimentModal: false,
      currentUserData: {
        data: {
          post: "Love Yourself",
          user: {
            photoURL:
              "https://media.tenor.com/images/42f4b2be8ded2feaf6f4d1560f039d14/tenor.gif",
          },
        },
      },
    };
    this.negativeWordsArray = [];
    this.userText = "";

    this.numOfPosts = "";

    const Sentiment = require("sentiment");
    this.sentiment = new Sentiment();
  }

  bannerError(e) {
    console.log(e);
  }

  getGif = async () => {
    const gifWords = [
      "popsmoke",
      "exited",
      "smile",
      "dancing",
      "puppies",
      "llama",
    ];
    const gifWord = gifWords[Math.floor(Math.random() * gifWords.length)];
    const resp = await axios(
      `https://api.tenor.com/v1/random?q=${gifWord}&key=${config2.gifs}`
    );
    const gif = resp.data.results[0].media[0].gif.url;
    gif.replace(/\"/g, "");

    // this.setState({
    //   gifURL: gif,
    // });

    // return gif;
  };
  generateId = (length) => {
    //FOR EACH MESSAGE THE USER SEND, WE WANT TO GENERATE AN ID FOR IT
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  sendAvice = () => {
    //AFTER YOU HAVE PRESSED SEND, IT SENDS YOUR ADVICE TO THE BACKEND, AND YOU
    //HAVE TO REFRESH TO SEE WHAT WAS SENT

    if (this.state.sentimentValue > 0 && this.userText.length > 10) {
      this.setState({ modalVisible: false });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userData = {
            name: user.displayName,
            email: user.email,
            id: user.providerData[0].uid,
            photoURL: user.providerData[0].photoURL,
          };
          //WE PUSH TO THE DATABASE HERE
          firebase
            .database()
            .ref("/posts/")
            .push({
              postID: this.generateId(10).toString(),

              user: userData,
              post: this.userText,
              date: Date.now(),
            });
        } else {
          // No user is signed in.
          console.log("There is no logged in user");
        }
      });
    } else {
      //sorry you need a more positive advice for the world
    }
  };
  componentDidMount() {
    //this.getGif();
  }

  refreshFunction = () => {
    //REFRESHING, WE GO TO THE REDUCER
    //AND LOAD MORE POSTS
    this.setState({ refreshing: false });
    this.props.refreshApp();
  };

  handleInput = (text) => {
    //HERE WE HANDLE THE SENTIMENT OF THE USER
    this.userText = text;

    this.setState({ sentimentValue: this.sentiment.analyze(text).score });
  };

  setBottomSheetContent = async (data) => {
    // console.log("the cool data is", data);
    // console.log("THE GIF IssS ", this.getGif());

    const gifWords = [
      "popsmoke",
      "exited",
      "smile",
      "dancing",
      "puppies",
      "llama",
    ];
    const gifWord = gifWords[Math.floor(Math.random() * gifWords.length)];
    const resp = await axios(
      `https://api.tenor.com/v1/random?q=${gifWord}&key=${config2.gifs}`
    );
    const gif = resp.data.results[0].media[0].gif.url;
    gif.replace(/\"/g, "");

    console.log("GIF URL IS", gif);
    this.setState({
      currentUserData: data,
      gifURL: gif,
    });
  };

  render() {
    var a = JSON.stringify(this.props.posts);
    var data = JSON.parse(a);
    const renderContent = () => (
      <View
        style={{
          backgroundColor: colors.secondary,
          padding: 16,
          TopBorderRadius: 25,
        }}
      >
        <View style={styles.topHorizontalBar} />

        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              margin: 10,
            }}
            source={{ uri: this.state.currentUserData.data.user.photoURL }}
          />
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
              textAlignVertical: "center",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.currentUserData.data.post}
          </Text>
        </View>

        <FeelLikeComponent />

        <Image
          style={{
            width: 250,
            height: 200,
            borderRadius: 20,
            margin: 10,
            alignSelf: "center",
          }}
          source={{ uri: this.state.gifURL }}
        />
      </View>
    );

    return (
      <>
        <Screen style={styles.container}>
          <View
            style={{
              position: "absolute",
              marginTop: "33%",
              alignSelf: "center",
            }}
          >
            <PullToRefresh />
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshFunction}
                  tintColor="#fff"
                  titleColor="#fff"
                />
              }
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => {
                return item.postID;
              }}
              renderItem={(item) => (
                <EachPost
                  onPress={(data) => this.setBottomSheetContent(data)}
                  post={item.item}
                />
              )}
            />
          </View>
          <UserProfileButton style={styles.userAccountButton} />
          <AppButton
            iconName="plus"
            iconColor={colors.primaryDark}
            onPress={() => this.setState({ modalVisible: true })}
            style={styles.sendAdviceButton}
          />
          <BottomSheet
            // renderHeader={'hello'}
            //enabledBottomInitialAnimation
            snapPoints={["50%", "25%", "10%", "5%"]}
            borderRadius={50}
            enabledBottomInitialAnimation
            renderContent={renderContent}
          ></BottomSheet>
        </Screen>

        {/*-------------THIS IS THE MODAL SCREEN TO SEND ADVICE */}
        <Modal
          transparent={true}
          // visible={true}
          visible={this.state.modalVisible}
          animationType="slide"
        >
          <ScrollView style={styles.insideModal}>
            <Text style={styles.sendAdviceTitleText}>
              What Advice Do You Have For The World
            </Text>
            <View style={styles.buttonContainer}>
              <AppButton
                iconName="close"
                iconColor={colors.lightGray}
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: colors.primaryDark,
                }}
                onPress={() => this.setState({ modalVisible: false })}
              />
              <AppButton
                iconColor={colors.lightGray}
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: colors.primaryDark,
                }}
                iconName="check"
                onPress={() => this.sendAvice()}
              />
            </View>
            <View style={styles.sentimentContainer}>
              <Text style={{ color: colors.lightGray, fontWeight: "bold" }}>
                Only positive Messages will be sent >>>
              </Text>
              <Text
                style={
                  this.state.sentimentValue > 0
                    ? styles.positiveSentimentStyle
                    : styles.negativeSentimentStyle
                }
              >
                {this.state.sentimentValue}
              </Text>
            </View>
            <TextInput
              maxLength={200}
              multiline
              style={styles.textInputStyle}
              onChangeText={(text) => this.handleInput(text)}
            />
          </ScrollView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshApp: () => {
      dispatch({ type: "REFRESH" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "5%",
  },

  container: {
    backgroundColor: colors.darkGray,
    flex: 1,
  },
  insideModal: {
    width: "100%",
    height: "100%",
    marginTop: "30%",
    backgroundColor: colors.primaryDark,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 20,
  },
  negativeSentimentStyle: {
    color: "red",
    fontWeight: "bold",
  },
  positiveSentimentStyle: {
    color: "green",
    fontWeight: "bold",
  },
  sendAdviceTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.lightGray,
  },

  topBar: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
  },
  topHorizontalBar: {
    width: 50,
    height: 4,
    borderRadius: 50,
    backgroundColor: colors.mediumGray,
    alignSelf: "center",
  },
  sendAdviceButton: {
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    top: "80%",
    left: "80%",
    width: 50,
    height: 50,
    position: "absolute",
  },
  sentimentContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "5%",
  },
  textInputStyle: {
    margin: 5,
    paddingTop: "10%",
    padding: "10%",
    width: "100%",
    height: "90%",
    color: colors.lightGray,
    fontWeight: "bold",
    backgroundColor: colors.darkGray,
    alignSelf: "center",
    borderRadius: 25,
    fontSize: 15,
  },

  userAccountButton: {
    borderRadius: 20,
    top: "70%",
    left: "80%",
    width: 50,
    height: 50,
    position: "absolute",
  },
});
