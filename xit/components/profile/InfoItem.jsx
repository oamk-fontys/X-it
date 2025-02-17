import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function InfoItem({ icon, title, value }){
    return (
        <View style={styles.infoItem}>
            <MaterialIcons name={icon} size={24} color="#EEEEEE" />
            <View style={styles.infoText}>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
});