import React from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import InfoItem from "./InfoItem";
import StatCard from "./StatCard";
import BookingItem from "./BookingItem";

export default function OverviewTab({ userMock, user }){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image 
          source={userMock.profilePic} 
          style={styles.profileImage}
          defaultSource={require("../../assets/profile-placeholder.jpeg")}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});
