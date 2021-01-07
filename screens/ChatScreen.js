import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import config2 from "../config2";
import firebase from "firebase";
import colors from "../config/colors";
class ChatScreen extends Component {
  /*
  THIS CLASS CONTAINS THE CHAT INTERACTION WITH THE USER 
  AND ROBOT
  */

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 2,
          text: "How can I make your day better",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Native",
            avatar: require("../assets/cyborg.png"),
          },
        },
        {
          _id: 1,
          text:
            "Heyyyy, my name is Oppong Bot, I am part robot, and part human",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Native",
            avatar: require("../assets/cyborg.png"),
          },
        },
      ],

      isTyping: false,
      userCanType: true,
    };

    var user = firebase.auth().currentUser;
    this.userPhoto = "";
    if (user != null) {
      this.userPhoto = user.photoURL;
    }

    this.cpuResponse = "";
    this.happyImagesToGenerate = ["dogs", "puppies", "llama", "llamas"];
    this.messageCounter = this.state.messages.length;
  }
  componentDidMount() {
    /*
    THIS IS TO SHOW THE USER THAT THE CPU IS THINKING, 
    IT NEEDS TO BE HERE SPECIFICALLY FOR SOME WEIRD REASON
  */
    this.state.isTyping = true;
  }

  addNewMessage = (message) => {
    /*
      THIS FUNCTION TAKES WHAT THE USER SAID, 
      CREATES AN OBJ, AND ADDS IT TO THE CONVERSATION LIST
    */

    const obj = {
      _id: this.state.messages.length + 1,
      createdAt: new Date(),

      text: message[0].text,
      user: {
        _id: 0,
        name: "React Native",
        avatar: this.userPhoto,
      },
    };

    //THIS IS HOW WE UPDATE THE CONVERSATION LIST
    this.setState({
      messages: [obj, ...this.state.messages],
      isTyping: true,
      userCanType: false,
    });

    //WE WAIT 5 SECONDS,
    //AFTER users TO GET THE ROBOTS RESPONSE
    setTimeout(() => {
      this.getCpuResponse(message);
    }, 5000);
  };

  getCpuResponse = async (message) => {
    /*
    HERE WE SEND A GET REQUEST TO THE PYTHON BACKEND
    WE USE ASYNC AND AWAIT TO WAIT UNTILL WE GET SOMETHING
    IF WE GET NOTHING, ITS BECAUSE WE HAVE NO INTERNET
      */

    var obj = "";

    //WE SEND THE GET REQUET HERE
    await axios
      .get(config2.botUrl.concat(message[0].text.toLowerCase()))
      .then((response) => {
        this.cpuResponse = response.request._response;
      })
      .catch(function (error) {
        console.log("Fetch error: " + error);
      });

    //HOPEFULLY THIS WORKS
    //IF THERE IS NO INTERNET, IT RETURNS NOTHING
    if (this.cpuResponse.length === 0) {
      this.cpuResponse = "Connect to the internet";
    }

    //IF WE GET A '0', I KNOW THE USER IS SAD
    //SO I GENERATE AN IMAGE TO SEND TO THEM
    if (this.cpuResponse === "0") {
      var item = this.happyImagesToGenerate[
        Math.floor(Math.random() * this.happyImagesToGenerate.length)
      ];

      obj = {
        _id: this.state.messages.length + 20,
        createdAt: new Date(),
        text: "hope this helps",
        image: config2.happy_pictures + item,

        user: {
          _id: 1,
          name: "React Native",
          avatar: require("../assets/cyborg.png"),
        },
      };
    } else {
      //IF USER DOES NOT SEEM SAD, WE GENERATE THE OBJ TO SEND TO THE
      //LIST (CONVO)
      obj = {
        _id: this.state.messages.length + 20,
        createdAt: new Date(),
        text: this.cpuResponse,

        user: {
          _id: 1,
          name: "React Native",
          avatar: require("../assets/cyborg.png"),
        },
      };
    }

    ///THIS IS HOW WE ADD WHAT THE CPU SAID TO THE STATE/LIST(CONVERSATION LIST)
    this.setState({
      messages: [obj, ...this.state.messages],
      isTyping: false,
      userCanType: true,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          maxInputLength={100}
          messagesContainerStyle={styles.chatContainer}
          disableComposer={!this.state.userCanType}
          onSend={(text) => this.addNewMessage(text)}
          messages={this.state.messages}
          showUserAvatar={false}
          alignTop
          user={{ _id: 0 }}
          isTyping={this.state.isTyping}
        />
      </View>
    );
  }
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  chatContainer: {
    backgroundColor: colors.darkGray,
  },
});
