import React from "react";
import { StyleSheet, Text } from "react-native";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>⚠️ {error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ErrorMessage;
