import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CompanyHeader({ name, address, phone }) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            
            {address && (
                <View style={styles.infoRow}>
                    <MaterialIcons name="location-on" size={16} color="#fff" />
                    <Text style={styles.address}>{address}</Text>
                </View>
            )}
            
            {phone && (
                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={16} color="#fff" />
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 16,
        backgroundColor: 'rgba(34, 40, 49, 0.9)',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    address: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 8,
    },
    phone: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 8,
    }
});
