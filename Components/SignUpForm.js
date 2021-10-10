import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from "firebase";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCompleted, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const renderButton = () => {
    return <Button onPress={() => handleSubmit()} title="Create User" />;
  };

  const handleSubmit = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {});
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View>
      <Text style={StyleSheet.header}> Sign Up </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        style={styles.inputField}
      />
      {errorMessage && (
        <Text style={styles.error}> Error: {errorMessage} </Text>
      )}
      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 40,
  },
});

export default SignUpForm;
