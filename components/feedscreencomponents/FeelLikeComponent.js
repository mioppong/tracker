import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import Icon from "../Icon";

export default function FeelLikeComponent() {
  return (
    <View style={styles.container}>
      <Icon name="arrow-up" iconColor={colors.darkGray} size={80} />
      <Text style={styles.textStyle}>this person feels like</Text>
      <Icon name="arrow-down-circle" iconColor={colors.darkGray} size={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: colors.primaryDark,
  },
});
