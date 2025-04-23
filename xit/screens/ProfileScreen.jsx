import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal, Image, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import QRCode from 'react-native-qrcode-svg';

import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useRooms } from '../context/RoomProvider';
import { useStatistic } from '../context/StatisticContext';

import OverviewTab from "../components/profile/tabs/OverviewTab";
import VisitedRoomsTab from "../components/profile/tabs/VisitedRoomsTab";
import StatsTab from "../components/profile/tabs/StatsTab";

export default function ProfileScreen() {
  const { user, logout, token } = useAuth();
  const { getAllUserBookings, generateQRtoken } = useBooking();
  const { getVisitedRooms } = useRooms();
  const { getUserStatistic } = useStatistic();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'bookingsTab', title: 'Bookings', icon: 'dashboard' },
    { key: 'visitedRoomsTab', title: 'Visited Rooms', icon: 'bar-chart' },
    { key: 'statsTab', title: 'Stats', icon: 'dashboard' },
  ]);
  
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState([]);
  const [stats, setStats] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const openTokenModal = () => setIsTokenModalVisible(true);
  const closeTokenModal = () => setIsTokenModalVisible(false);

  // Booking QR Modal
  const [bookingQrModalVisible, setBookingQrModalVisible] = useState(false);
  const [qrData, setQrData] = useState({
    value: null,
    loading: false,
    error: null
  });

  const openBookingQr = async (bookingId) => {
    setQrData({ value: null, loading: true, error: null });
    setBookingQrModalVisible(true);
    
    try {
      const token = await generateQRtoken(bookingId);
      setQrData({ value: token.token, loading: false, error: null });
    } catch (err) {
      setQrData({ value: null, loading: false, error: err.message });
      Alert.alert("Error", err.message);
    }
  };

  const closeQrModal = () => {
    setBookingQrModalVisible(false);
    setQrData({ value: null, loading: false, error: null });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const bookingsData = await getAllUserBookings();
        Array.isArray(bookingsData) && setBookings(bookingsData);

        const visitedRoomsData = await getVisitedRooms();
        Array.isArray(visitedRoomsData) && setVisitedRooms(visitedRoomsData);

        const statsData = await getUserStatistic();
        Array.isArray(statsData) && setStats(statsData);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

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
    bookingsTab: () => <OverviewTab bookings={bookings} openBookingQr={openBookingQr} />,
    visitedRoomsTab: () => <VisitedRoomsTab visitedRooms={visitedRooms} />,
    statsTab: () => <StatsTab roomStats={stats} />,
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

      {/* Personal QR code */}
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
              size={300}
              color="black"
              backgroundColor="white"
            />
            <View style={{ marginTop: 20 }}>
              <Button title="Close" onPress={closeTokenModal} color="#00ADB5" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Booking QR code */}
      <Modal
        visible={bookingQrModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeQrModal}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {qrData.loading ? (
              <View style={styles.centerContent}>
                <ActivityIndicator size="large" color="#00ADB5" />
                <Text style={styles.loadingText}>Generating QR Code...</Text>
              </View>
            ) : qrData.error ? (
              <View style={styles.centerContent}>
                <MaterialIcons name="error" size={48} color="#FF6B6B" />
                <Text style={styles.errorText}>{qrData.error}</Text>
              </View>
            ) : qrData.value ? (
              <View style={styles.centerContent}>
                <QRCode
                  value={qrData.value}
                  size={300}
                  color="#222831"
                  backgroundColor="#EEEEEE"
                />
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Button 
                title="Close" 
                onPress={closeQrModal} 
                color="#00ADB5"
              />
            </View>
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
    backgroundColor: "white",
  },
  modalContent: {
    backgroundColor: '#222831',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: "white",
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
