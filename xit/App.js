import React from "react";
import { View, StyleSheet, SafeAreaView as SafeAreaViewIos, Platform } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";

//Ignoring defaultProps warning as it is inside a library and nothing I can do about that
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['defaultProps']);

import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from "./context/RoomProvider";
import { BookingProvider } from './context/BookingContext';
import { CompanyProvider } from './context/CompanyContext';

import AppNavigation from "./helpers/AppNavigation";

import globalStyles from "./theme/globalStyles";
import { TimeProvider } from "./context/TimeContext";
import { CommentProvider } from "./context/CommentContext";

export default function App() {

  const SafeAreaView = Platform.OS === 'android' ? SafeAreaViewAndroid : SafeAreaViewIos;

  return (
    <NotificationProvider>
      <AuthProvider>
        <CompanyProvider>
          <RoomProvider>
            <BookingProvider>
              <TimeProvider>
                <CommentProvider>
                  <SafeAreaView style={globalStyles.safeArea}>
                    <AppNavigation />
                  </SafeAreaView>
                </CommentProvider>
              </TimeProvider>
            </BookingProvider>
          </RoomProvider>
        </CompanyProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}