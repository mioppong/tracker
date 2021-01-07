import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import ChatScreen from "../screens/ChatScreen";
import FeedScreen from "../screens/FeedScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import QuotesScreen from "../screens/QuotesScreen";
import LoadingScreen from "../screens/LoadingScreen";
import colors from "../config/colors";

const MainStack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

/*
  THIS FILE BASICALLY CONTAINS 
  ALL MY NAVIGATION
/*/
function myTabs() {
  return (
    <Tabs.Navigator
      shifting
      sceneAnimationEnabled={true}
      activeColor={colors.primaryDark}
      barStyle={{
        backgroundColor: colors.darkGray,
        borderTopWidth: 1,
        borderColor: colors.white,
      }}
    >
      <Tabs.Screen
        options={{ tabBarIcon: "home" }}
        name="Feed"
        component={FeedScreen}
      />

      <Tabs.Screen
        options={{ tabBarIcon: "chat" }}
        name="Chat"
        component={ChatScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: "format-quote-close",
        }}
        name="Quotes"
        component={QuotesScreen}
      />
    </Tabs.Navigator>
  );
}

export default () => (
  <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="myTabs"
        component={myTabs}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);
