import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const placeholderImage = require("../../../assets/profile-placeholder.jpeg");

export default function RoomDetails({ room }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{room?.name}</Text>
            
            <View style={styles.imageContainer}>
                <Image
                    source={placeholderImage}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons 
                        name="information-outline" 
                        size={24} 
                        color="#00ADB5" 
                    />
                    <Text style={styles.cardTitle}>Room Information</Text>
                </View>
                
                <View style={styles.cardBody}>
                    <InfoRow 
                        icon="door" 
                        label="Name" 
                        value={room?.name} 
                    />
                    <InfoRow 
                        icon="map-marker" 
                        label="Address" 
                        value={room?.address || "Not specified"} 
                    />
                    <InfoRow 
                        icon="floor-plan" 
                        label="Level" 
                        value={room?.difficulty || "Not specified"} 
                    />
                    <InfoRow 
                        icon="text-box-outline" 
                        label="Description" 
                        value={room?.description || "No description"} 
                    />
                </View>
            </View>
        </View>
    );
}

const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <View style={styles.labelContainer}>
            <MaterialCommunityIcons 
                name={icon} 
                size={18} 
                color="#00ADB5" 
                style={styles.icon}
            />
            <Text style={styles.labelText}>{label}</Text>
        </View>
        <Text style={styles.valueText}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#EEEEEE',
        marginBottom: 15,
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 200,
    },
    infoCard: {
        backgroundColor: 'rgba(57, 62, 70, 0.7)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#393E46',
        paddingBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#EEEEEE',
        marginLeft: 10,
    },
    cardBody: {
        paddingHorizontal: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    labelText: {
        fontSize: 14,
        color: '#00ADB5',
        fontWeight: '500',
    },
    valueText: {
        fontSize: 14,
        color: '#EEEEEE',
        flex: 1,
        marginLeft: 15,
        textAlign: 'right',
    },
});
