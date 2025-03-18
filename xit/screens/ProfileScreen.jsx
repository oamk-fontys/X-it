import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image, Button, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from '../context/AuthContext';

import InfoItem from "../components/profile/InfoItem";
import StatCard from "../components/profile/StatCard";
import BookingItem from "../components/profile/BookingItem";

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);

  const openTokenModal = () => setIsTokenModalVisible(true);
  const closeTokenModal = () => setIsTokenModalVisible(false);

  // remove test data
  const userMock = {
    profilePic: require("../assets/profile-placeholder.jpeg"),
    roomStats: {
      totalBookings: 15,
      upcoming: 2,
      favorites: 5
    },
    bookings: [
      { id: 1, date: "2023-11-15", room: "Meeting Room A" },
      { id: 2, date: "2023-11-20", room: "Conference Hall" }
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Image 
            source={userMock.profilePic} 
            style={styles.profileImage}
            defaultSource={require("../assets/profile-placeholder.jpeg")}
          />
          <Text style={styles.name}>{user?.username}</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <InfoItem icon="mail" title="Email" value={user?.email} />
          <InfoItem icon="phone" title="Phone" value={user?.phoneNumber} />
        </View>

        {/* Room Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Statistics</Text>
          <View style={styles.statsContainer}>
            <StatCard title="Total Bookings" value={userMock.roomStats.totalBookings} />
            <StatCard title="Upcoming" value={userMock.roomStats.upcoming} />
            <StatCard title="Favorites" value={userMock.roomStats.favorites} />
          </View>
        </View>

        {/* Future Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Future Bookings</Text>
          {userMock.bookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </View>

        {/* Token QR Code Button */}
        <TouchableOpacity onPress={openTokenModal} style={styles.tokenButton}>
          <MaterialIcons name="qr-code" size={24} color="#EEEEEE" />
          <Text style={styles.tokenButtonText}>Show Token QR Code</Text>
        </TouchableOpacity>

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
                size={200}
                color="black"
                backgroundColor="white"
              />
              <Button title="Close" onPress={closeTokenModal} />
            </View>
          </View>
        </Modal>

        {/* Logout */}
        <Button title="Logout" onPress={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222831",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    color: "#EEEEEE",
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#EEEEEE",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#393E46",
    paddingBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tokenButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00ADB5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  tokenButtonText: {
    color: "#EEEEEE",
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#222831",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
