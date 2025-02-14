import React from "react";
import { View,  StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      header: ({ navigation }) => <Header navigation={navigation} />,
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
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
    },
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Home',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Navigation />
      </View>
      <Footer />
    </SafeAreaView>
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

// export default function App() {
//   return (
//     <Navigation>
//       <SafeAreaView style={styles.container}> 
//         <Footer />
//       </SafeAreaView>
//     </Navigation>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#222831",
//   },
// });
