import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RoomElement({ room, onPress }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.touchable}
        >
            <View style={styles.roomContainer}>
                <View style={styles.header}>
                    <MaterialCommunityIcons 
                        name="door-open" 
                        size={20} 
                        color="#00ADB5" 
                        style={styles.icon}
                    />
                    <Text style={styles.roomName} numberOfLines={1}>{room.name}</Text>
                </View>
                
                {room.address && (
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons 
                            name="map-marker" 
                            size={16} 
                            color="#EEEEEE" 
                        />
                        <Text style={styles.roomDetails} numberOfLines={1}>{room.address}</Text>
                    </View>
                )}
                
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons 
                        name="floor-plan" 
                        size={16} 
                        color="#EEEEEE" 
                    />
                    <Text style={styles.roomLevel}>Level {room.level}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        marginBottom: 12,
    },
    roomContainer: {
        backgroundColor: 'rgba(34, 40, 49, 0.9)',
        padding: 16,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#00ADB5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    roomName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EEEEEE',
        flex: 1,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    roomDetails: {
        fontSize: 14,
        color: '#EEEEEE',
        marginLeft: 10,
        flex: 1,
        opacity: 0.9,
    },
    roomLevel: {
        fontSize: 14,
        color: '#EEEEEE',
        marginLeft: 10,
        opacity: 0.8,
    }
});