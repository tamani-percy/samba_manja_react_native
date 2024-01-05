import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Recents from "../screens/Recents";
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Recents" component={Recents} />
    </Stack.Navigator>
  );
}
