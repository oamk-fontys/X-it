import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuth } from '../context/AuthContext';
import OverviewTab from "../components/profile/tabs/OverviewTab";
import VisitedRoomsTab from "../components/profile/tabs/VisitedRoomsTab";
import StatsTab from "../components/profile/tabs/StatsTab";

export default function ProfileScreen() {
  const { user, token, user_id, logout } = useAuth();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'bookingsTab', title: 'Bookings', icon: 'dashboard' },
    { key: 'visitedRooms', title: 'Visited Rooms', icon: 'bar-chart' },
    { key: 'stats', title: 'Stats', icon: 'dashboard' },
  ]);

    // Mock data
    const userMock = {
      profilePic: require("../assets/profile-placeholder.jpeg"),
      roomStats: {
        totalBookings: 15,
        upcoming: 2,
        favorites: 5
      },
      bookings: [
        { id: 1, date: "2023-11-15", room: "Meeting Room A" },
        { id: 2, date: "2023-11-20", room: "Conference Hall" },
        { id: 3, date: "2023-11-20", room: "Conference Hall" },
        { id: 4, date: "2023-11-20", room: "Conference Hall" },
        { id: 5, date: "2023-11-20", room: "Conference Hall" },
        { id: 6, date: "2023-11-20", room: "Conference Hall" },
        { id: 7, date: "2023-11-20", room: "Conference Hall" },
        { id: 8, date: "2023-11-20", room: "Conference Hall" },
        { id: 9, date: "2023-11-20", room: "Conference Hall" },
        { id: 10, date: "2023-11-20", room: "Conference Hall" },
        { id: 11, date: "2023-11-20", room: "Conference Hall" },
        { id: 12, date: "2023-11-20", room: "Conference Hall" },
      ]
    };

  const renderScene = SceneMap({
    bookingsTab: () => <OverviewTab bookings={userMock.bookings} user_id={user?.id} token={token} />,
    visitedRooms: () => <VisitedRoomsTab />,
    stats: () => <StatsTab roomStats={userMock.roomStats} />,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <View style={styles.profileSection}>
          <Image
            source={userMock.profilePic}
            style={styles.profileImage}
            defaultSource={require("../assets/profile-placeholder.jpeg")}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{user?.username}</Text>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.contactSection}>
          <View style={styles.contactItem}>
            <MaterialIcons name="mail" size={20} color="#00ADB5" style={styles.contactIcon} />
            <Text style={styles.contactText}>{user?.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <MaterialIcons name="phone" size={20} color="#00ADB5" style={styles.contactIcon} />
            <Text style={styles.contactText}>{user?.phoneNumber}</Text>
          </View>
        </View>
      </View>
  
      {/* Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor="#00ADB5"
            inactiveColor="#EEEEEE"
          />
        )}
        initialLayout={{ width: '100%' }}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#222831",
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 24,
      paddingBottom: 28,
      borderBottomWidth: 1,
      borderBottomColor: '#393E46',
      backgroundColor: 'rgba(34, 40, 49, 0.9)',
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: '#00ADB5',
    },
    profileDetails: {
      gap: 10,
    },
    name: {
      color: "#EEEEEE",
      fontSize: 22,
      fontWeight: "600",
    },
    contactSection: {
      justifyContent: 'center',
      gap: 12,
      maxWidth: '50%',
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    contactIcon: {
      marginRight: 4,
    },
    contactText: {
      color: "#EEEEEE",
      fontSize: 14,
      fontWeight: '500',
    },
    logoutButton: {
      backgroundColor: "rgba(57, 62, 70, 0.7)",
      paddingVertical: 4,
      paddingHorizontal: 20,
      borderRadius: 16,
      alignSelf: 'flex-start',
    },
    buttonText: {
      color: "#EEEEEE",
      fontSize: 14,
      fontWeight: '500',
    },
    // Tab styles
    tabBar: {
      backgroundColor: '#222831',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#393E46',
    },
    tabIndicator: {
      backgroundColor: '#00ADB5',
      height: 3,
    },
    tabLabel: {
      fontWeight: '600',
      textTransform: 'none',
      fontSize: 14,
    },
    tabView: {
      flex: 1,
      marginTop: 4,
    },
});
