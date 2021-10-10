import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileList from "./Components/ProfileList";
import Add_edit_Profile from "./Components/Add_edit_Profile";
import ProfileDetails from "./Components/ProfileDetails";
import Myprofile from "./Components/MyProfile";
import MyProfile from "./Components/MyProfile";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyCrAMskTrrAlgXfhQLcLckqOudFJuhdoao",
    authDomain: "opgavedatabse.firebaseapp.com",
    projectId: "opgavedatabse",
    storageBucket: "opgavedatabse.appspot.com",
    messagingSenderId: "801967599944",
    appId: "1:801967599944:web:24e30f077b71f8e6bf437d",
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Search Profile List"} component={ProfileList} />
        <Stack.Screen name={"Profile Details"} component={ProfileDetails} />
        <Stack.Screen name={"Edit Profile"} component={Add_edit_Profile} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={"Profile List"}
          component={StackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="search" size={20} />,
            headerShown: null,
          }}
        />
        <Tab.Screen
          name={"Add Profile to Search List"}
          component={Add_edit_Profile}
          options={{ tabBarIcon: () => <Ionicons name="add" size={20} /> }}
        />
        <Tab.Screen
          name={"My Profile"}
          component={MyProfile}
          options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
