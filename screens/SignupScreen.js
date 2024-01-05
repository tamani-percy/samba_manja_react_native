import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button as RNButton,
} from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View>
        <Image
          source={require("../assets/Cover.jpg")}
          style={{ height: 400, width: 500, marginLeft: -20 }}
        ></Image>
      </View>
      <View>
        <Image
          source={require("../assets/logo.jpg")}
          style={{
            height: 100,
            width: 70,
            marginBottom: -20,
            alignSelf: "center",
          }}
        ></Image>
      </View>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          padding: 40,
          fontWeight: "bold",
        }}
      >
        Please enter your details below:
      </Text>
      <InputField
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          borderColor: "red",
          borderWidth: 2,
        }}
        leftIcon="email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
          borderColor: "red",
          borderWidth: 2,
        }}
        leftIcon="lock"
        placeholder="Enter a password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={onHandleSignup}
        backgroundColor="#f57c00"
        title="Sign up"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 24,
        }}
      />
      <RNButton
        onPress={() => navigation.navigate("Login")}
        title="Already have an account? Sign in"
        color="orange"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
});
