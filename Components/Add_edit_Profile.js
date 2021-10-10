import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";
import { useEffect, useState } from "react";

const Add_edit_Profile = ({ navigation, route }) => {
  const initialState = {
    Name: "",
    Age: "",
    Mail: "",
    Nationality: "",
    Study: "",
    Reason: "",
  };

  const [newProfile, setnewProfile] = useState(initialState);

  const isEditProfile = route.name === "EditProfile";

  useEffect(() => {
    if (isEditProfile) {
      const profile = route.params.profile[1];
      setnewProfile(profile);
    }
    /*Fjern data, når vi går væk fra screenen*/
    return () => {
      setnewProfile(initialState);
    };
  }, []);

  const changeTextInput = (name, event) => {
    setnewProfile({ ...newProfile, [name]: event });
  };

  const handleSave = () => {
    const { Name, Age, Mail, Nationality, Study, Reason } = newProfile;

    if (
      Name.length === 0 ||
      Age.length === 0 ||
      Mail.length === 0 ||
      Nationality.length === 0 ||
      Study.length === 0 ||
      Reason.length === 0
    ) {
      return Alert.alert("Et af felterne er tomme!");
    }

    if (isEditProfile) {
      const id = route.params.profile[0];
      try {
        firebase
          .database()
          .ref(`/profiles/${id}`)
          // Vi bruger update, så kun de felter vi angiver, bliver ændret
          .update({ Name, Age, Mail, Nationality, Study, Reason });
        // Når bilen er ændret, går vi tilbage.
        Alert.alert("Din info er nu opdateret");
        const profile = [id, newProfile];
        navigation.navigate("profileDetails", { profile });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    } else {
      try {
        firebase
          .database()
          .ref("/profiles/")
          .push({ Name, Age, Mail, Nationality, Study, Reason });
        Alert.alert(`Saved`);
        setnewProfile(initialState);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialState).map((key, index) => {
          return (
            <View style={styles.row} key={index}>
              <Text style={styles.label}>{key}</Text>
              <TextInput
                value={newProfile[key]}
                onChangeText={(event) => changeTextInput(key, event)}
                style={styles.input}
              />
            </View>
          );
        })}
        {/*Hvis vi er inde på edit profile, vis save changes i stedet for add profile*/}
        <Button
          title={isEditProfile ? "Save changes" : "Add profile"}
          onPress={() => handleSave()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add_edit_Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    height: 30,
    margin: 10,
  },
  label: {
    fontWeight: "bold",
    width: 100,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
});
