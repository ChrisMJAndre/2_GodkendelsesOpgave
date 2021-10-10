import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MyProfile = (props) => {
  return (
    <View>
      <Text> Name: Christopher Maximilian John Andr </Text>
      <Text> Age: 22 </Text>
      <Text> Mail: Chan19af@student.cbs.dk </Text>
      <Text> Nationality: Sweden/China </Text>
      <Text> Study: Ha(it). </Text>

      <Text style={styles.Top}>Notes: </Text>
      <Text style={styles.Top}>
        In the future you will have the ability to upload your own profile
        picture, this is just a placehold
      </Text>

      <Image
        style={styles.Image}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  Image: {
    top: 100,
    width: 200,
    height: 300,
    alignSelf: "center",
  },
  Top: {
    top: 50,
  },
});
