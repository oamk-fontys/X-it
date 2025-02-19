import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function BookingItem({ booking }){
    return (
        <View style={styles.bookingItem}>
            <MaterialIcons name="event" size={20} color="#EEEEEE" />
            <View style={styles.bookingDetails}>
                <Text style={styles.bookingDate}>{booking.date}</Text>
                <Text style={styles.bookingRoom}>{booking.room}</Text>
            </View>
        </View>
    );
}

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
    },
    bookingDate: {
        color: "#EEEEEE",
        fontSize: 14,
    },
    bookingRoom: {
        color: "#888",
        fontSize: 12,
    }
});