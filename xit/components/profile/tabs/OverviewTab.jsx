import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View, ActivityIndicator } from "react-native";

import { useAuth } from '../../../context/AuthContext';
import { useBooking } from '../../../context/BookingContext';

import BookingItem from "../BookingItem";

export default function OverviewTab() {
  const { user, token } = useAuth();
  const { getAllBookings, loading, error } = useBooking();

  const [bookings, setBookings] = useState([]);
  // do not use global error and loading directly
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLocalLoading(true);
        setLocalError(false);
        const bookingsData = await getAllBookings();
        setBookings(bookingsData);
      } catch (err) {
        setLocalError(true);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (localLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (localError || error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Internal error occured
        </Text>
      </View>
    );
  }

  const futureBookings = bookings.filter(
    booking => new Date(booking.date) >= new Date()
  );

  return (
    <FlatList
      data={futureBookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingItem 
          booking={item}
          token={token}
          user_id={user?.id}
        />
      )}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Future Bookings</Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No upcoming bookings</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#EEEEEE',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#EEEEEE',
    fontSize: 16,
  },
});



// import React from "react";
// import { FlatList, Text, StyleSheet, View } from "react-native";
// import BookingItem from "../BookingItem";

// export default function OverviewTab({ bookings, token, user_id }) {
//   return (
//     <FlatList
//       data={bookings}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <BookingItem booking={item} token={token} user_id={user_id} />
//       )}
//       contentContainerStyle={styles.container}
//       ListHeaderComponent={
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Future Bookings</Text>
//         </View>
//       }
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     color: "#EEEEEE",
//     fontSize: 18,
//     fontWeight: "600",
//     borderBottomWidth: 1,
//     borderBottomColor: "#393E46",
//     paddingBottom: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#393E46",
//     marginVertical: 10,
//   },
// });
