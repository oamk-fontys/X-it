import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useRooms } from '../context/RoomProvider';

import OverviewTab from "../components/profile/tabs/OverviewTab";
import VisitedRoomsTab from "../components/profile/tabs/VisitedRoomsTab";
import StatsTab from "../components/profile/tabs/StatsTab";

export default function ProfileScreen() {
  const { user, logout, token } = useAuth();
  const { getAllUserBookings, generateQRtoken } = useBooking();
  const { getVisitedRooms } = useRooms();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'bookingsTab', title: 'Bookings', icon: 'dashboard' },
    { key: 'visitedRoomsTab', title: 'Visited Rooms', icon: 'bar-chart' },
    { key: 'statsTab', title: 'Stats', icon: 'dashboard' },
  ]);
  
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const openTokenModal = () => setIsTokenModalVisible(true);
  const closeTokenModal = () => setIsTokenModalVisible(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const bookingsData = await getAllUserBookings();
        Array.isArray(bookingsData) && setBookings(bookingsData);

        const visitedRoomsData = await getVisitedRooms();
        Array.isArray(visitedRoomsData) && setVisitedRooms(visitedRoomsData);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // this function should send booking id with jwt and return new token to encode it into qr
  const createQr = async (booking_id) => {
    const response = await generateQRtoken(booking_id);
    return response;
  }

  // Mock data
  const userMock = {
    profilePic: require("../assets/profile-placeholder.jpeg"),
    roomStats: {
      totalBookings: 15,
      upcoming: 2,
      favorites: 5
    }
  };

  const renderScene = SceneMap({
    bookingsTab: () => <OverviewTab bookings={bookings} />,
    visitedRoomsTab: () => <VisitedRoomsTab visitedRooms={visitedRooms} />,
    statsTab: () => <StatsTab roomStats={userMock.roomStats} />,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        {/* Left Container: Profile Image and Username */}
        <View style={styles.leftContainer}>
          <Image
            source={userMock.profilePic}
            style={styles.profileImage}
            defaultSource={require("../assets/profile-placeholder.jpeg")}
          />
          <Text style={styles.name}>{user?.username}</Text>
        </View>

        {/* Right Container: Contact Info and Buttons */}
        <View style={styles.rightContainer}>
          {/* Contact Information */}
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

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={openTokenModal} style={styles.qrCodeButton}>
              <MaterialIcons name="qr-code" size={20} color="#EEEEEE" />
              <Text style={styles.qrCodeButtonText}>QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Token QR Code Modal */}
      <Modal
        visible={isTokenModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeTokenModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <QRCode
              value={token}
              size={Dimensions.get('window').width}
              color="black"
              backgroundColor="white"
            />
            <Button title="Close" onPress={closeTokenModal} />
          </View>
        </View>
      </Modal>
  
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
        initialLayout={{ width: Dimensions.get('window').width }}
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
  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#393E46',
    backgroundColor: 'rgba(34, 40, 49, 0.9)',
  },
  leftContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00ADB5',
    marginBottom: 10,
  },
  name: {
    color: "#EEEEEE",
    fontSize: 20,
    fontWeight: "600",
    textAlign: 'center',
  },
  contactSection: {
    flex: 1,
    justifyContent: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 8,
  },
  contactText: {
    color: "#EEEEEE",
    fontSize: 14,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  qrCodeButton: {
    backgroundColor: "rgba(0, 173, 181, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ADB5',
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#EEEEEE",
    fontSize: 14,
    fontWeight: '500',
  },
  qrCodeButtonText: {
    color: "#EEEEEE",
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#222831',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width,
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
