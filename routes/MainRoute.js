import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LoadingScreen from "../screens/LoadingScreen";
import ListScreen from "../screens/ListScreen";

const MainStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainRoute() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>

      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={LoadingScreen} />
        <Tab.Screen name="Settings" component={ListScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}

export default MainRoute;
