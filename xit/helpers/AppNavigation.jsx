import React, { useContext } from "react";
import { View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from '../context/AuthContext';


import Header from "../components/Header";
import Footer from "../components/Footer";

/*  PLEASE KEEP THE SCREENS ALPHABETICALLY ORGANIZED  */
import AdminPendingCompaniesScreen from "../screens/AdminPendingCompaniesScreen";
import CalendarScreen from "../components/roomDetailsScreenComponents/bookingComponents/CalendarScreen";
import CompanyRegistrationScreen from "../screens/CompanyRegistrationScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import RoomDetailsScreen from "../screens/RoomDetailsScreen";
import RoomListScreen from "../screens/RoomListScreen";
import RoomSchedule from "../components/roomSchedule/RoomSchedule";
import secondaryHeader from "./secondaryHeaderOptions";

export default function AppNavigation() {

  const { user, isLoading } = useAuth();

  const Drawer = createDrawerNavigator();
  const RootStack = createNativeStackNavigator();

  const ScreenWrapper = ({ children }) => (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>{children}</View>
      <Footer />
    </SafeAreaView>
  );

  const DrawerNavigator = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home">
        {(props) => (
          <ScreenWrapper>
            <HomeScreen {...props} />
          </ScreenWrapper>
        )}
      </Drawer.Screen>

      {user?.role === "ADMIN" && (
        //Only for Admins to see
        <Drawer.Screen name="Pending Companies">
          {(props) => (
            <ScreenWrapper>
              <AdminPendingCompaniesScreen {...props} />
            </ScreenWrapper>
          )}
        </Drawer.Screen>
      )}

      <Drawer.Screen name="Rooms">
        {(props) => (
          <ScreenWrapper>
            <RoomListScreen {...props} />
          </ScreenWrapper>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Room Details"
        options={{
          drawerItemStyle: { height: 0 },
        }}
      >
        {(props) => (
          <ScreenWrapper>
            <RoomDetailsScreen key={props.route.params.id} id={props.route.params.id} />
          </ScreenWrapper>
        )}
      </Drawer.Screen>
      {user && (
        // Authenticated screens
        <Drawer.Screen name="Profile">
          {(props) => (
            <ScreenWrapper>
              <ProfileScreen {...props} />
            </ScreenWrapper>
          )}
        </Drawer.Screen>
      )}

      {user && (
        //Company registration screen
        <Drawer.Screen name="Company registration">
          {(props) => (
            <ScreenWrapper>
              <CompanyRegistrationScreen {...props} />
            </ScreenWrapper>
          )}
        </Drawer.Screen>
      )}


      {!user && (
        // Unauthenticated screens
        <>
          <Drawer.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <ScreenWrapper>
                <LoginScreen {...props} />
              </ScreenWrapper>
            )}
          </Drawer.Screen>
          <Drawer.Screen name="Sign up" options={{ headerShown: false }}>
            {(props) => (
              <ScreenWrapper>
                <RegistrationScreen {...props} />
              </ScreenWrapper>
            )}
          </Drawer.Screen>
        </>
      )}
      <Drawer.Screen
        name="Room Schedule(test)"
      >
        {(props) => (
          <ScreenWrapper>
            <RoomSchedule
              {...props}
            />
          </ScreenWrapper>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );

  // add loading spinner animation
  // if (isLoading) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Drawer">
        <RootStack.Screen name="Drawer" options={{ headerShown: false }}>
          {() => <DrawerNavigator />}
        </RootStack.Screen>
        {user ? (
          // authenticated screen
          <RootStack.Group>
            <RootStack.Screen name="Calendar" options={secondaryHeader("Choose Reservation Time")}>
              {(props) => (
                <CalendarScreen
                  key={props.route.params.roomId}
                  {...props.route.params}
                />
              )}
            </RootStack.Screen>
          </RootStack.Group>
        ) : (
          // unauthenticated screen
          <RootStack.Group>
            <RootStack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <ScreenWrapper>
                  <LoginScreen {...props} />
                </ScreenWrapper>
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Register" options={{ headerShown: false }}>
              {(props) => (
                <ScreenWrapper>
                  <RegistrationScreen {...props} />
                </ScreenWrapper>
              )}
            </RootStack.Screen>
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}