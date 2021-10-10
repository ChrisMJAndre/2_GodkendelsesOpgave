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

      <Image
        style={styles.tinyLogo}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    top: 100,
    width: 200,
    height: 300,
    alignSelf: "center",
  },
  logo: {
    width: 66,
    height: 58,
  },
});
