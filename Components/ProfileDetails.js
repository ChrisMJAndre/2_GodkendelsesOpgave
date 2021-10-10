import React from "react";
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

const ProfileDetails = ({ route, navigation }) => {
  const [profile, setprofile] = useState({});

  useEffect(() => {
    /*Henter profile values og sætter dem*/
    setprofile(route.params.profile[1]);

    /*Når vi forlader screen, tøm object*/
    return () => {
      setprofile({});
    };
  });

  const handleEdit = () => {
    // Vi navigerer videre til Editprofile skærmen og sender bilen videre med
    const profile = route.params.profile;
    navigation.navigate("Edit profile", { profile });
  };

  // Vi spørger brugeren om han er sikker
  const confirmDelete = () => {
    /*Er det mobile?*/
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Are you sure?", "Do you want to delete the profile?", [
        { text: "Cancel", style: "cancel" },
        // Vi bruger this.handleDelete som eventHandler til onPress
        { text: "Delete", style: "destructive", onPress: () => handleDelete() },
      ]);
    }
  };

  // Vi sletter den aktuelle bil
  const handleDelete = () => {
    const id = route.params.profile[0];
    try {
      firebase
        .database()
        // Vi sætter profilens ID ind i stien
        .ref(`/profiles/${id}`)
        // Og fjerner data fra den sti
        .remove();
      // Og går tilbage når det er udført
      navigation.goBack();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (!profile) {
    return <Text>No data</Text>;
  }

  //all content
  return (
    <View style={styles.container}>
      <Button title="Edit" onPress={() => handleEdit()} />
      <Button title="Delete" onPress={() => confirmDelete()} />
      {Object.entries(profile).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            {/*Vores profile keys navn*/}
            <Text style={styles.label}>{item[0]} </Text>
            {/*Vores profile values navne */}
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start" },
  row: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
  },
  label: { width: 100, fontWeight: "bold" },
  value: { flex: 1 },
});
