import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CarList from "./Components/CarList";
import Add_edit_Car from "./Components/Add_edit_Car";
import CarDetails from "./Components/CarDetails";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyAebRD5_5teSCI7MS2t9TqqS0Gj5cWbFbQ",
    authDomain: "cardatabase-8b1e3.firebaseapp.com",
    projectId: "cardatabase-8b1e3",
    storageBucket: "cardatabase-8b1e3.appspot.com",
    messagingSenderId: "386678222680",
    appId: "1:386678222680:web:943e8d3ec2e7949b7c7f2d",
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Car List"} component={CarList} />
        <Stack.Screen name={"Car Details"} component={CarDetails} />
        <Stack.Screen name={"Edit Car"} component={Add_edit_Car} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={"Home"}
          component={StackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="home" size={20} />,
            headerShown: null,
          }}
        />
        <Tab.Screen
          name={"Add"}
          component={Add_edit_Car}
          options={{ tabBarIcon: () => <Ionicons name="add" size={20} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
