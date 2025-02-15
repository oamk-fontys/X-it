import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  // Mock data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+358 12 345 6789",
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
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image 
            source={user.profilePic} 
            style={styles.profileImage}
            defaultSource={require("../assets/profile-placeholder.jpeg")}
          />
          <Text style={styles.name}>{user.name}</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <InfoItem icon="mail" title="Email" value={user.email} />
          <InfoItem icon="phone" title="Phone" value={user.phone} />
        </View>

        {/* Room Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Statistics</Text>
          <View style={styles.statsContainer}>
            <StatCard title="Total Bookings" value={user.roomStats.totalBookings} />
            <StatCard title="Upcoming" value={user.roomStats.upcoming} />
            <StatCard title="Favorites" value={user.roomStats.favorites} />
          </View>
        </View>

        {/* Future Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Future Bookings</Text>
          {user.bookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable components
const InfoItem = ({ icon, title, value }) => (
  <View style={styles.infoItem}>
    <MaterialIcons name={icon} size={24} color="#EEEEEE" />
    <View style={styles.infoText}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const StatCard = ({ title, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const BookingItem = ({ booking }) => (
  <View style={styles.bookingItem}>
    <MaterialIcons name="event" size={20} color="#EEEEEE" />
    <View style={styles.bookingDetails}>
      <Text style={styles.bookingDate}>{booking.date}</Text>
      <Text style={styles.bookingRoom}>{booking.room}</Text>
    </View>
  </View>
);

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
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
  },
  infoTitle: {
    color: "#888",
    fontSize: 14,
  },
  infoValue: {
    color: "#EEEEEE",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#393E46",
    borderRadius: 10,
    padding: 15,
    width: "30%",
    alignItems: "center",
  },
  statValue: {
    color: "#EEEEEE",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statTitle: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  bookingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#393E46",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  bookingDetails: {
    marginLeft: 15,
  },
  bookingDate: {
    color: "#EEEEEE",
    fontSize: 14,
  },
  bookingRoom: {
    color: "#888",
    fontSize: 12,
  },
});