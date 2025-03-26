import React from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import BookingItem from "../BookingItem";

export default function OverviewTab({ bookings, token }) {
  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingItem booking={item} token={token} />
      )}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Future Bookings</Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#EEEEEE",
    fontSize: 18,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#393E46",
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#393E46",
    marginVertical: 10,
  },
});
