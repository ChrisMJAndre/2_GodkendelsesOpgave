// Found this on website to remove an annoying yellow error message complaining about timeout
// Error - Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake,
//and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info. (Saw setTimeout with duration 3299603ms)
import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Imports for Login Screen
import { useState } from "react";
import { Card } from "react-native-paper";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import ProfileScreen from "./Components/ProfileScreen";

//Imports for TabNavigator
import ProfileList from "./Components/ProfileList";
import Add_edit_Profile from "./Components/Add_edit_Profile";
import ProfileDetails from "./Components/ProfileDetails";
import MyProfile from "./Components/MyProfile";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCrAMskTrrAlgXfhQLcLckqOudFJuhdoao",
    authDomain: "opgavedatabse.firebaseapp.com",
    databaseURL: "https://opgavedatabse-default-rtdb.firebaseio.com",
    projectId: "opgavedatabse",
    storageBucket: "opgavedatabse.appspot.com",
    messagingSenderId: "801967599944",
    appId: "1:801967599944:web:24e30f077b71f8e6bf437d",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [user, setUser] = useState({ loggedIn: false });
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const GuestPage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Opret eller Login med din firebase Email
        </Text>

        <Card style={{ padding: 20 }}>
          <SignUpForm />
        </Card>

        <Card style={{ padding: 20 }}>
          <LoginForm />
        </Card>
      </View>
    );
  };

  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Search Profile List"} component={ProfileList} />
        <Stack.Screen name={"Profile Details"} component={ProfileDetails} />
        <Stack.Screen name={"Edit Profile"} component={Add_edit_Profile} />
      </Stack.Navigator>
    );
  };

  return user.loggedIn ? (
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
  ) : (
    <GuestPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: "5%",
    backgroundColor: "transparent",
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
