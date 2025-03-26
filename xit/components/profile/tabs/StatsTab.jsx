import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import StatCard from "../StatCard";

export default function StatsTab({ roomStats }) {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <StatCard title="Total Bookings" value={roomStats.totalBookings} />
      <StatCard title="Upcoming" value={roomStats.upcoming} />
      <StatCard title="Favorites" value={roomStats.favorites} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
