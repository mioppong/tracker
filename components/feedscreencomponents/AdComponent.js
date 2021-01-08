import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import config2 from "../../config2";

export default function AdComponent() {
  const bannerError = (e) => {
    console.log(e);
  };
  return (
    <View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={
          Platform.OS == "ios" ? config2.iosAdBanner : config2.androidAdBanner
        }
        servePersonalizedAds={false}
        onDidFailToReceiveAdWithError={(e) => bannerError(e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
