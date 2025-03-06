import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoomDetailsScreen from "../screens/RoomDetailsScreen";
import CalendarScreen from "../components/roomDetailsScreenComponents/bookingComponents/CalendarScreen";
import LoginScreen from "../screens/LoginScreen";
import RoomListScreen from "../screens/RoomListScreen";
import Header from "../components/Header";
import secondaryHeader from "./secondaryHeaderOptions";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <Header />,
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Login" component={LoginScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Rooms" component={RoomListScreen} />
    <Drawer.Screen
      name="Room Details"
      children={({ route }) => (
        <RoomDetailsScreen key={route.params.id} id={route.params.id} />
      )}
      options={{
        drawerItemStyle: {
          height: 0,
        },
      }}
    />
  </Drawer.Navigator>
);

const RootStack = createNativeStackNavigator();

export default function AppNavigation(){
    return (
        <RootStack.Navigator initialRouteName="Drawer">
            <RootStack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
            />
            <RootStack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={secondaryHeader("Choose Reservation Time")}
            />
        </RootStack.Navigator>
    );
}