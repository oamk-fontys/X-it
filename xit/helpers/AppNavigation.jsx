import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from '../context/AuthContext';

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import Header from "../components/Header";
import secondaryHeader from "./secondaryHeaderOptions";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoomDetailsScreen from "../screens/RoomDetailsScreen";
import RoomListScreen from "../screens/RoomListScreen";
import CalendarScreen from "../components/roomDetailsScreenComponents/bookingComponents/CalendarScreen";

export default function AppNavigation(){

    const { user, isLoading } = useAuth();

    const Drawer = createDrawerNavigator();
    const RootStack = createNativeStackNavigator();

    const DrawerNavigator = () => (
      <Drawer.Navigator
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Drawer.Group>
          <Drawer.Screen
            name="Home" 
            component={HomeScreen}
          />
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
            navigationKey={user ? 'user' : 'guest'}
          />
        </Drawer.Group>
        {user ? (
          // Authenticated screens
          <Drawer.Group>
            <Drawer.Screen name="Profile" component={ProfileScreen} />
          </Drawer.Group>
        ) : (
          // Unauthenticated screens
          <Drawer.Group>
            <Drawer.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Sign up"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </Drawer.Group>
        )}
      </Drawer.Navigator>
    );

    // add loading spinner animation
    // if (isLoading) {
    //   return null;
    // }

    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Drawer">
          <RootStack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          {user ? (
            // authenticated screen
            <RootStack.Group>
              <RootStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={secondaryHeader("Choose Reservation Time")}
              />
            </RootStack.Group>
          ) : (
            // unauthenticated screen
            <RootStack.Group>
              <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Register"
                component={RegistrationScreen}
                options={{ headerShown: false }}
              />
            </RootStack.Group>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
}