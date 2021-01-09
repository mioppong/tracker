import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import EachImageItem from "../components/quotescomponents/EachImageItem";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
export default class QuotesScreen extends Component {
  /*
  THIS CLASS IS THE MAIN QUOTES SCREEN, 
  BUT ITS A LIST OF EACHIMAGEITEM
 */

  constructor(props) {
    super(props);
    this.allQuotes = require("../components/quotescomponents/coolQuotes.json");

    this.state = {
      quotes: [this.allQuotes[0], this.allQuotes[1]],
    };
  }

  componentDidMount() {
    //WHEN APP OPENED, THIS GENERATES 2 IMAGES SO USER CAN SEE
    //ONLY 2 IMAGES
    // Create a new array based on current state:
    let quotes = [];
    for (let index = 0; index < 5; index++) {
      var item = this.allQuotes[
        Math.floor(Math.random() * this.allQuotes.length)
      ];

      quotes.push(item);
    }
    this.state.quotes = quotes;
  }

  loadQuotes = () => {
    //EVERYTIME YOU RFRESH, YOU GET A NEW SET OF IMAGES
    // Create a new array based on current state:
    let quotes = [];
    for (let index = 0; index < 10; index++) {
      var item = this.allQuotes[
        Math.floor(Math.random() * this.allQuotes.length)
      ];

      quotes.push(item);
    }
    this.setState({ quotes });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          data={this.state.quotes}
          renderItem={(item) => (
            <EachImageItem
              quote={item}
              imageS="https://source.unsplash.com/random/sig=1"
            />
          )}
        />
        <AppButton
          iconName="refresh"
          iconColor={colors.primaryDark}
          style={styles.addItemButtomStyles}
          onPress={() => this.loadQuotes()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addItemButtomStyles: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  topView: {
    width: "100%",
    height: "10%",
    alignItems: "center",
  },
  refreshButton: {
    borderRadius: 20,
    top: "85%",
    left: "80%",
    width: 50,
    height: 50,
    position: "absolute",
    backgroundColor: colors.darkGray,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
});
