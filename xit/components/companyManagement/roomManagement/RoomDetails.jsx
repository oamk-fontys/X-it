import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const placeholderImage = require("../../../assets/placeholder3.png");

export default function RoomDetails({ room }) {
    if (!room) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{room.name}</Text>
            
            <View style={styles.imageContainer}>
                <Image
                    source={room.logo ? { uri: room.logo.url } : placeholderImage}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Basic Information Card */}
            <InfoCard 
                icon="information-outline"
                title="Room Information"
                items={[
                    { icon: "door", label: "Name", value: room.name },
                    { icon: "map-marker", label: "Address", value: room.address || "Not specified" },
                    { icon: "floor-plan", label: "Level", value: room.difficulty || "Not specified" },
                    { icon: "text-box-outline", label: "Description", value: room.description || "No description" }
                ]}
            />

            {/* Timing Information Card */}
            <InfoCard 
                icon="clock-outline"
                title="Timing Information"
                items={[
                    { icon: "timer-outline", label: "Duration", value: room.duration ? `${room.duration} mins` : "Not specified" },
                    { icon: "broom", label: "Clean-up Time", value: room.cleanUpTime ? `${room.cleanUpTime} mins` : "Not specified" }
                ]}
            />

            {/* Location Information Card */}
            <InfoCard 
                icon="earth"
                title="Location Details"
                items={[
                    { icon: "city", label: "City", value: room.city || "Not specified" },
                    { icon: "post", label: "Postal Code", value: room.postalCode || "Not specified" },
                    { icon: "flag", label: "Country", value: room.country || "Not specified" }
                ]}
            />

            {/* Contact Information Card */}
            <InfoCard 
                icon="phone"
                title="Contact Information"
                items={[
                    { icon: "phone-outline", label: "Phone Number", value: room.phoneNumber || "Not specified" }
                ]}
                lastCard
            />
        </View>
    );
}

const InfoCard = ({ icon, title, items, lastCard = false }) => (
    <View style={[styles.infoCard, lastCard && { marginBottom: 0 }]}>
        <View style={styles.cardHeader}>
            <MaterialCommunityIcons name={icon} size={24} color="#00ADB5" />
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
        
        <View style={styles.cardBody}>
            {items.map((item, index) => (
                <InfoRow 
                    key={`${title}-${index}`}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                />
            ))}
        </View>
    </View>
);

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
        paddingBottom: 10,
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
