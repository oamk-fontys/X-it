import React from "react";
import { View, StyleSheet, SafeAreaView as SafeAreaViewIos, Platform } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";

import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from "./context/RoomProvider";

import AppNavigation from "./helpers/AppNavigation";

import globalStyles from "./theme/globalStyles";
import themeLight from "./theme/themeLight";

export default function App() {

  const SafeAreaView = Platform.OS === 'android' ? SafeAreaViewAndroid : SafeAreaViewIos;

  return (
    <AuthProvider>
      <RoomProvider>
        <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: themeLight.colors.background }]}>
          <View style={globalStyles.content}>
            <AppNavigation />
          </View>
        </SafeAreaView>
      </RoomProvider>
    </AuthProvider>
  );
}