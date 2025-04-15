import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { useRooms } from '../context/RoomProvider';
import { useNotification } from "../context/NotificationContext";

import RoomDetails from "../components/companyManagement/roomManagement/RoomDetails";
import RoomActions from "../components/companyManagement/roomManagement/RoomActions";

export default function RoomManagementScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { roomId } = route.params;
    const { getRoomByIdFromBackend, deleteRoom } = useRooms();
    const { showNotification } = useNotification();
    
    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchRoomData = async () => {
        try {
            setIsLoading(true);
            setError(false);
            const roomData = await getRoomByIdFromBackend(roomId);
            setRoom(roomData);
        } catch (err) {
            setError(true);
            showNotification("Error fetching room data");
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRoom(roomId);
            navigation.navigate("Company management");
        } catch (err) {
            showNotification("Failed to delete room");
            console.error("Delete error:", err);
        }
    };

    const handleUpdateSuccess = () => {
        fetchRoomData();
    };

    useEffect(() => {
        fetchRoomData();
    }, [roomId]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ADB5" />
            </View>
        );
    }

    if (error || !room) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load room data</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
        >
            <RoomDetails room={room} />
            <RoomActions 
                roomId={roomId} 
                room={room} 
                onDelete={handleDelete}
                onUpdateSuccess={handleUpdateSuccess}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#222831',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222831',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222831',
    },
    errorText: {
        color: '#EEEEEE',
        fontSize: 18,
    },
});
