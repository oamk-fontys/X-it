import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PopularRooms from "../components/homeScreenComponents/PopularRooms";
import RecentComments from "../components/homeScreenComponents/RecentComments";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PopularRooms />
      <RecentComments />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222831",
  },
  
});
