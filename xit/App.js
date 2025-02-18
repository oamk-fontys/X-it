import React from "react";
import { View, StyleSheet, SafeAreaView as SafeAreaViewIos, Platform } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoomDetailsScreen from "./screens/RoomDetailsScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <Header />,
    }}
  >
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
    />
    <Drawer.Screen
      name='Room Details'
      children={({ route }) => (
        <RoomDetailsScreen
          key={route.params.id}
          id={route.params.id}
        />
      )}
      options={{
        drawerItemStyle: {
          height: 0
        }
      }}
    />
  </Drawer.Navigator>
);

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Drawer',
  screens: {
    Drawer: {
      screen: DrawerNavigator,
      options: {
        headerShown: false,
      },
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  if (Platform.OS === 'android') {
    return (
      <SafeAreaViewAndroid style={styles.container}>
        <View style={styles.content}>
          <Navigation />
        </View>
        <Footer />
      </SafeAreaViewAndroid>
    )
  } else {
    return (
      <SafeAreaViewIos style={styles.container}>
        <View style={styles.content}>
          <Navigation />
        </View>
        <Footer />
      </SafeAreaViewIos>
    )
  }
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

