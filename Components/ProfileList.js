import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

const ProfileList = ({ navigation }) => {
  const [profiles, setprofiles] = useState();

  useEffect(() => {
    if (!profiles) {
      firebase
        .database()
        .ref("/profiles")
        .on("value", (snapshot) => {
          setprofiles(snapshot.val());
        });
    }
  }, []);

  // Vi viser ingenting hvis der ikke er data
  if (!profiles) {
    return <Text>Loading... or Database is empty</Text>;
  }

  const handleSelectProfile = (id) => {
    /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
    const profile = Object.entries(profiles).find(
      (profile) => profile[0] === id /*id*/
    );
    navigation.navigate("ProfileDetails", { profile });
  };

  // Flatlist forventer et array. Derfor tager vi alle values fra vores profile objekt, og bruger som array til listen
  const profileArray = Object.values(profiles);
  const profileKeys = Object.keys(profiles);

  return (
    <FlatList
      data={profileArray}
      // Vi bruger profileKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
      keyExtractor={(item, index) => profileKeys[index]}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => handleSelectProfile(profileKeys[index])}
          >
            <Text>{item.Name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ProfileList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    height: 50,
    justifyContent: "center",
  },
  label: { fontWeight: "bold" },
});
