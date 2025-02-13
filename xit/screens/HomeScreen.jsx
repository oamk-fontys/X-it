import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PopularRooms from "./homeScreenComponents/PopularRooms";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PopularRooms />
      <View style={{flex:1}}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222831",
  },
  
});
