import React, { useState, useEffect } from "react";
import { SectionList, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import BookingItem from "../BookingItem";

export default function OverviewTab({ bookings, openBookingQr }) {

  /* const now = new Date(); */
  const inProgress = bookings?.filter(b => b.state === "IN_PROGRESS") ?? [];
  const futureBookings = bookings?.filter(b => b.state === "SCHEDULED") ?? [];

  //Sorting by oldest first
  const inProgressSorted = inProgress
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const futureBookingsSorted = futureBookings
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const sections = [
    /* This will show up, IF the user is currently playing a game, meaning: state in db: "IN_PROGRESS" */
    ...(inProgress.length > 0
      ? [
        {
          title: "Currently playing",
          data: inProgressSorted
        },
      ]
      : []),
    {
      title: 'Upcoming bookings',
      data: futureBookingsSorted,
      emptyText: 'No upcoming bookings'
    }
  ];

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>Internal error occured</Text>
  //     </View>
  //   );
  // }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingItem
          booking={item}
          openBookingQr={openBookingQr}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
      )}
      renderSectionFooter={({ section }) => (
        section.data.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{section.emptyText}</Text>
          </View>
        )
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#EEEEEE',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#AAAAAA',
    fontSize: 16,
  },
});
