import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from '../../context/AuthContext';
import { useNotification } from "../../context/NotificationContext";
import { useCompany } from '../../context/CompanyContext';
import { useRooms } from '../../context/RoomProvider';

import CompanyHeader from "./CompanyHeader";
import AddRoomButton from "./AddRoomButton";
import RoomListCard from "./RoomListCard";

export default function CompanyRooms() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const { getCompanyById } = useCompany();
    const { getRoomsByCompanyId } = useRooms();
    
    const [company, setCompany] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(false);

                if (user.companyId) {
                    const userCompany = await getCompanyById(user.companyId);
                    setCompany(userCompany);

                    const roomsData = await getRoomsByCompanyId(user.companyId);
                    setRooms(roomsData);
                } else {
                    setCompany(null);
                    setRooms([]);
                    showNotification("No company found for this user");
                }
            } catch (err) {
                setError(true);
                showNotification("Error fetching data");
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
      
        fetchData();
    }, []);

    const handleAddRoom = () => navigation.navigate("Add Room");
    const handleRoomPress = (roomId) => navigation.navigate("RoomManagement", { roomId });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ADB5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CompanyHeader 
                name={company?.name}
                address={company?.address}
                city={company?.city}
                postalCode={company?.postalCode}
                phone={company?.phone}
                vat={company?.vat}
                description={company?.description}
                verified={company?.verified}
            />            
            <AddRoomButton onPress={handleAddRoom} />            
            <RoomListCard 
                rooms={rooms} 
                onRoomPress={handleRoomPress} 
                emptyMessage="No rooms available"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(34, 40, 49, 0.9)',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 40, 49, 0.9)',
    },
});
