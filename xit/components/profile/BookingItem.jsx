import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from 'react-native-qrcode-svg';

export default function BookingItem({ booking, token }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.bookingItem}>
      <MaterialIcons name="event" size={20} color="#EEEEEE" />
      <View style={styles.bookingDetails}>
        {/* REPLACE CREATED AT WITH REAL BOOKING SCHEDULE */}
        <Text style={styles.bookingDate}>{booking?.createdAt}</Text>
        <Text style={styles.bookingRoom}>{booking?.room.name}</Text>
      </View>
      <TouchableOpacity onPress={openModal} style={styles.qrButton}>
        <MaterialIcons name="qr-code" size={20} color="#EEEEEE" />
      </TouchableOpacity>

      {/* QR Code Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <QRCode
              value = {token}
              size={300}
              style={{ backgroundColor: 'white', padding: 10 }}
              color="black"
              backgroundColor="white"
            />
            <View style={{ marginTop: 20 }}>
              <Button title="Close" onPress={closeModal} />
            </View>
            </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", 
  },
  modalContent: {
    backgroundColor: "#222831",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: Dimensions.get('window').width,
    backgroundColor: "white", 
  },
});
