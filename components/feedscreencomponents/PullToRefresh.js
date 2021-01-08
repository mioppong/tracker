import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import Icon from "../Icon";

export default function PullToRefresh() {
  /*
        THIS FUNCTION IS A TOOL FOR THE FLATLIST, 
        A PULL TO REFRESH COMPONENT WHICH DOES WITH THE FLATLIST COMPONENT
        */

  return (
    <View style={{ alignItems: "center" }}>
      <Icon
        name="chevron-triple-down"
        size={80}
        iconColor={colors.mediumGray}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text} children="Pull down to refresh" />
        <Icon iconColor={colors.mediumGray} name="emoticon-wink-outline" />
      </View>
      <Image
        style={{ height: 50, width: 50, marginTop: 10 }}
        source={require("../../assets/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.mediumGray,
  },
});
