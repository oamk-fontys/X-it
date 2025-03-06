import React from "react";
import { View, StyleSheet, SafeAreaView as SafeAreaViewIos, Platform } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";

import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from "./context/RoomProvider";

import AppNavigation from "./helpers/AppNavigation";
import Footer from "./components/Footer";

export default function App() {

  const SafeAreaView = Platform.OS === 'android' ? SafeAreaViewAndroid : SafeAreaViewIos;

  return (
    <AuthProvider>
      <RoomProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <AppNavigation />
          </View>
          <Footer />
        </SafeAreaView>
      </RoomProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  content: {
    flex: 1,
  },
});