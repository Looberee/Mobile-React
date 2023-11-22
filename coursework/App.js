import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import AddHikeScreen from "./screens/AddHikeScreen";
import HomeScreen from "./screens/HomeScreen";
import HikeDetailsScreen from "./screens/HikeDetailsScreen";
import { LogBox } from 'react-native';
import ObsDisplayScreen from "./screens/ObsDisplayScreen";
import AddObsScreen from "./screens/AddObsScreen";
import ObsDetailsScreen from "./screens/ObsDetailsScreen";
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="AddHike" component={AddHikeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HikeDetails" component={HikeDetailsScreen} />
        <Stack.Screen name="Observations" component={ObsDisplayScreen} />
        <Stack.Screen name="AddObs" component={AddObsScreen} />
        <Stack.Screen name="ObsDetails" component={ObsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;