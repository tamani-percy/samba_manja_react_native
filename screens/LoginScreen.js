import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button as RNButton,
  KeyboardAvoidingView,
} from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
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
      <View
        style={{
          alignItems: "center",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 50, fontWeight: "bold", color: "red" }}>
            U
          </Text>
          <Text style={{ fontSize: 50, fontWeight: "bold", color: "green" }}>
            N
          </Text>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
              color: "orange",
            }}
          >
            Z
          </Text>
          <Text style={{ fontSize: 50, fontWeight: "bold" }}>A</Text>
        </View>

        <Text style={{ fontSize: 40, paddingTop: -5 }}>SAMBA MANJA</Text>
      </View>
      <KeyboardAvoidingView>
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
          placeholder="Email"
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
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={password}
          onChangeText={(text) => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <Button
          onPress={onLogin}
          backgroundColor="#f57c00"
          title="Login"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 24,

            justifyContent: "center",
            alignSelf: "center",
          }}
        />
        <RNButton
          onPress={() => navigation.navigate("Signup")}
          title="Don't have an account? Sign Up"
          color="orange"
        />
      </KeyboardAvoidingView>
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
