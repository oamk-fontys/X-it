import React, { useContext, useRef, useEffect, useCallback } from "react";
import { View, SafeAreaView, Animated, Easing, StyleSheet, Text, Image, TouchableOpacity, I18nManager } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../context/AuthContext';

import Header from "../components/Header";
import Footer from "../components/Footer";

/*  PLEASE KEEP THE SCREENS ALPHABETICALLY ORGANIZED  */
import AddRoomScreen from "../screens/AddRoomScreen";
import CalendarScreen from "../components/roomDetails/booking/CalendarScreen";
import CompanyPendingScreen from "../screens/CompanyPendingScreen";
import CompanyRegistrationScreen from "../screens/CompanyRegistrationScreen";
import CompanyRoomListScreen from "../screens/CompanyRoomListScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import RoomDetailsScreen from "../screens/RoomDetailsScreen";
import RoomListScreen from "../screens/RoomListScreen";
import RoomSchedule from "../components/roomSchedule/RoomSchedule";
import RoomManagementScreen from "../screens/RoomManagementScreen";
import secondaryHeader from "../helpers/secondaryHeaderOptions"
import UpdateRoomScreen from "../screens/UpdateRoomScreen";
import MapScreen from "../screens/MapScreen";

export default function AppNavigation() {

  const { user, isLoading, hasPendingCompany, logout } = useAuth();
  const Drawer = createDrawerNavigator();
  const RootStack = createNativeStackNavigator();

  // Memoized ScreenWrapper to prevent unnecessary re-renders
  const ScreenWrapper = React.memo(({ children }) => (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>{children}</View>
      <Footer />
    </SafeAreaView>
  ));

  // Custom Drawer Content Component
  const CustomDrawerContent = React.memo((props) => {
    const scale = useRef(new Animated.Value(0.95)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Simplified animation for better performance
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    // Memoized drawer item component
    const DrawerItem = useCallback(({ route, index }) => {
      const { options } = props.descriptors[route.key];
      const isFocused = props.state.index === index;

      if (options.drawerItemStyle?.height === 0) return null;

      return (
        <TouchableOpacity
          key={route.key}
          style={[
            styles.drawerItem,
            isFocused && styles.activeItem,
          ]}
          onPress={() => props.navigation.navigate(route.name)}
        >
          <Icon
            name={getIconForRoute(route.name)}
            size={22}
            color={isFocused ? "#00ADB5" : "#EEEEEE"}
            style={styles.icon}
          />
          <Text style={[
            styles.label,
            isFocused && styles.activeLabel
          ]}>
            {options.drawerLabel || route.name}
          </Text>
        </TouchableOpacity>
      );
    }, [props.state.index]);

    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContainer}
        scrollEnabled={false}
      >
        {/* Profile Header */}
        <Animated.View style={[
          styles.drawerHeader,
          {
            opacity,
            transform: [{ scale }]
          }
        ]}>
          <Image
            source={require('../assets/profile-placeholder.jpeg')}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.headerText} numberOfLines={1}>
              {user ? user.username : 'Welcome Guest'}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {user ? user.email : 'Sign in to access features'}
            </Text>
          </View>
        </Animated.View>

        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          {props.state.routes.map((route, index) => (
            <DrawerItem key={route.key} route={route} index={index} />
          ))}
        </View>

        {/* Sign Out Button */}
        {user && (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={logout}
          >
            <Icon name="logout" size={20} color="#FF2E63" />
            <Text style={styles.signOutLabel}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </DrawerContentScrollView>
    );
  });

  const getIconForRoute = React.useCallback((routeName) => {
    const icons = {
      'Home': 'home',
      'Rooms': 'meeting-room',
      'Profile': 'person',
      'Login': 'login',
      'Sign up': 'person-add',
      'Pending Application': 'hourglass-empty',
      'Company management': 'business',
      'Room schedule': 'schedule',
      'Map': 'map',
    };
    return icons[routeName] || 'help-outline';
  }, []);

  const DrawerNavigator = React.memo(() => (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: styles.drawer,
        drawerType: "front",
        overlayColor: "rgba(0, 0, 0, 0.5)",
        sceneContainerStyle: styles.sceneContainer,
        headerShown: false,
        swipeEdgeWidth: 30,
        swipeEnabled: true,
        drawerHideStatusBarOnOpen: false,
        drawerStatusBarAnimation: 'fade',
        lazy: true, // Enable lazy loading of screens
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreenWrapper} />
      <Drawer.Screen name="Rooms" component={RoomListScreenWrapper} />
      <Drawer.Screen
        name="Room Details"
        component={RoomDetailsScreenWrapper}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLabel: () => null,
        }}
      />
      {user && (
        <>
          <Drawer.Screen name="Profile" component={ProfileScreenWrapper} />
          {!hasPendingCompany ? (
            <Drawer.Screen name="Register Company" component={CompanyRegistrationScreenWrapper} />
          ) : (
            <Drawer.Screen
              name="Pending Application"
              component={CompanyPendingScreenWrapper}
              options={{ drawerLabel: "Pending Application" }}
            />
          )}
          <Drawer.Screen name="Room schedule" component={RoomScheduleWrapper} />
          <Drawer.Screen name="Company management" component={CompanyRoomListScreenWrapper} />
          <Drawer.Screen
            name="RoomManagement"
            component={RoomManagementScreenWrapper}
            options={{
              // hide item from drawer menu
              drawerItemStyle: { height: 0 },
              drawerLabel: () => null,
            }}
          />
          <Drawer.Screen
            name="ADD_ROOM"
            component={AddRoomScreenWrapper}
            options={{
              drawerItemStyle: { height: 0 },
              drawerLabel: () => null,
            }}
          />
          <Drawer.Screen
            name="UPDATE_ROOM"
            component={UpdateRoomScreenWrapper}
            options={{
              drawerItemStyle: { height: 0 },
              drawerLabel: () => null,
              headerShown: false
            }}
          />
        </>
      )}
      {!user && (
        <>
          <Drawer.Screen name="Login" component={LoginScreenWrapper} options={{ headerShown: false }} />
          <Drawer.Screen name="Sign up" component={RegistrationScreenWrapper} options={{ headerShown: false }} />
        </>
      )}
        <Drawer.Screen name="Map" component={MapScreenWrapper}/>
    </Drawer.Navigator>
  ));

  const HomeScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <HomeScreen {...props} />
    </ScreenWrapper>
  ));

  const RoomListScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <RoomListScreen {...props} />
    </ScreenWrapper>
  ));

  const RoomDetailsScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <RoomDetailsScreen key={props.route.params.id} id={props.route.params.id} />
    </ScreenWrapper>
  ));

  const ProfileScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <ProfileScreen {...props} />
    </ScreenWrapper>
  ));

  const CompanyRegistrationScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <CompanyRegistrationScreen {...props} />
    </ScreenWrapper>
  ));

  const CompanyPendingScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <CompanyPendingScreen {...props} />
    </ScreenWrapper>
  ));

  const LoginScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <LoginScreen {...props} />
    </ScreenWrapper>
  ));

  const RegistrationScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <RegistrationScreen {...props} />
    </ScreenWrapper>
  ));

  const RoomScheduleWrapper = React.memo((props) => (
    <ScreenWrapper>
      <RoomSchedule {...props} />
    </ScreenWrapper>
  ));

  const CompanyRoomListScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <CompanyRoomListScreen {...props} />
    </ScreenWrapper>
  ));

  const RoomManagementScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <RoomManagementScreen {...props} />
    </ScreenWrapper>
  ));

  const AddRoomScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <AddRoomScreen {...props} />
    </ScreenWrapper>
  ));

  const UpdateRoomScreenWrapper = React.memo((props) => (
    <ScreenWrapper>
      <UpdateRoomScreen {...props} />
    </ScreenWrapper>
  ));

    const MapScreenWrapper = React.memo((props) => (
        <ScreenWrapper>
            <MapScreen {...props} />
        </ScreenWrapper>
    ));

  // add loading spinner animation
  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        {user && (
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
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: 300,
    backgroundColor: "#222831",
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  drawerHeader: {
    padding: 15,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(57, 62, 70, 0.3)",
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#00ADB5',
  },
  userInfo: {
    flex: 1,
  },
  headerText: {
    color: "#EEEEEE",
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    color: "rgba(238, 238, 238, 0.6)",
    fontSize: 12,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginBottom: 4,
  },
  activeItem: {
    backgroundColor: 'rgba(0, 173, 181, 0.1)',
  },
  icon: {
    marginRight: 12,
    width: 22,
  },
  label: {
    color: "#EEEEEE",
    fontSize: 14,
    fontWeight: '500',
  },
  activeLabel: {
    color: "#00ADB5",
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 'auto',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(57, 62, 70, 0.3)",
  },
  signOutLabel: {
    color: "#FF2E63",
    fontWeight: '600',
    marginLeft: 12,
    fontSize: 14,
  },
  sceneContainer: {
    backgroundColor: "#222831",
  },
});
