import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

const Button = ({ title, titleColor = "white", onPress, containerStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={(args) => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.9,
              backgroundColor: "green",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            },
            containerStyle,
          ];
        }

        return [
          styles.base,
          {
            opacity: 1,
            width: "50%",
            backgroundColor: "green",
          },
          containerStyle,
        ];
      }}
    >
      <Text style={[styles.text, { color: titleColor, fontSize: 30 }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "800",
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    borderRadius: 100,
  },
  move: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
