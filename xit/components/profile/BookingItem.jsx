// BookingItem.js
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function BookingItem({ booking, openBookingQr }) {

  const bookingDate = new Date(booking.date);
  const dateStr = bookingDate.toLocaleDateString();
  const start = booking.timeSlot?.start ?? "";
  const end = booking.timeSlot?.end ?? "";
  const bookedTimeslot = ` - ${start}-${end}`;

  return (
    <View style={styles.bookingItem}>
      <MaterialIcons name="event" size={20} color="#EEEEEE" />
      <View style={styles.bookingDetails}>
        <Text style={styles.bookingDate}>{dateStr + bookedTimeslot}</Text>
        <Text style={styles.bookingRoom}>{booking?.room?.name}</Text>
      </View>

      <TouchableOpacity
        onPress={() => openBookingQr(booking.id)}
        style={styles.qrButton}
        activeOpacity={0.7}
      >
        <MaterialIcons name="qr-code" size={20} color="#EEEEEE" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
  },
  bookingDate: {
    color: "#EEEEEE",
    fontSize: 14,
  },
  bookingRoom: {
    color: "#888",
    fontSize: 12,
  },
  qrButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#00ADB5",
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

