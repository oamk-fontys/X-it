import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Footer() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footer}>
        <Text style={styles.text}>Footer Content</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#393E46",
  },
  footer: {
    height: 50,
    backgroundColor: "#393E46",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#EEEEEE",
  },
});