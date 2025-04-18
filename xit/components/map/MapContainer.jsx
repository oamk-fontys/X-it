import React, { useEffect, useRef, useState } from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import globalStyles from "../../theme/globalStyles";
import ZoomControl from "./ZoomControl";
import LocationButton from "./LocationButton";
import {useNavigation} from "@react-navigation/native";

export default function MapContainer() {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/room")
            .then((res) => res.json())
            .then((data) => {
                const roomsWithFakeCoords = data.map((room, i) => ({
                    ...room,
                    latitude: 60.19 + Math.random() * 0.02,
                    longitude: 24.93 + Math.random() * 0.02,
                }));
                setRooms(roomsWithFakeCoords);
            })
            .catch((err) => console.error("Failed to fetch rooms:", err));
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== "granted") return;
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);


    const handleZoom = (zoomIn) => {
        setRegion((prev) => {
            const deltaFactor = zoomIn ? 0.5 : 2;
            return {
                ...prev,
                latitudeDelta: prev.latitudeDelta * deltaFactor,
                longitudeDelta: prev.longitudeDelta * deltaFactor,
            };
        });
    };

    const handleLocate = () => {
        if (location) {
            mapRef.current.animateToRegion({
                ...region,
                latitude: location.latitude,
                longitude: location.longitude,
            });
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={setRegion}
                minZoomLevel={0}
                maxZoomLevel={20}
            >
                {rooms.map((room) => (
                    <Marker
                        key={room.id}
                        coordinate={{ latitude: room.latitude, longitude: room.longitude }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Room Details", { id: room.id })}
                            activeOpacity={0.7}
                        >
                            <View style={styles.markerLabel}>
                                <Text style={styles.markerLabelText}>{room.name}</Text>
                                <Text style={styles.markerSubText}>{room.address}</Text>
                            </View>
                        </TouchableOpacity>
                        <Ionicons name="location-sharp" size={28} color="#FF5C58" />
                    </Marker>
                ))}

                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="You are here"
                        pinColor="blue"
                    />
                )}
            </MapView>

            {/* Reusable Controls */}
            <ZoomControl
                onZoomIn={() => handleZoom(true)}
                onZoomOut={() => handleZoom(false)}
            />
            <LocationButton onPress={handleLocate} />
        </View>
    );
}

const styles = StyleSheet.create({
    markerLabel: {
        backgroundColor: "white",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 4,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    markerLabelText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
});
