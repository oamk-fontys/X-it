import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { documentDirectory, readAsStringAsync, getInfoAsync } from 'expo-file-system';

import globalStyles from "../../theme/globalStyles";
import ZoomControl from "./ZoomControl";
import LocationButton from "./LocationButton";
import { useNavigation } from "@react-navigation/native";
import { fetchCityCoordinates } from "./utils/geocode";
import { saveCityCoord } from "./utils/saveCityCoord";

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

    const debugReadCache = async () => {
        const fileInfo = await getInfoAsync(`${documentDirectory}cityCoords.json`);
        if (fileInfo.exists) {
          const content = await readAsStringAsync(`${documentDirectory}cityCoords.json`);
          console.log("Current cityCoords.json content:", content);
        } else {
          console.log("cityCoords.json file not found in documentDirectory");
        }
      };

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/room`);
                const data = await res.json();

                const uniqueCities = [...new Set(data.map((room) => room.city))];
                const cityCoords = {};

                // Fetch coords for each unique city
                await Promise.all(
                    uniqueCities.map(async (city) => {
                        const coords = await fetchCityCoordinates(city);
                        if (coords) cityCoords[city] = coords;
                        await saveCityCoord(city, coords);
                    })
                );

                const hashCode = (str) =>
                    str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                  
                
                  const getOffset = (key, range = 0.002) => {
                    const base = hashCode(key);
                    return ((base % 1000) / 1000 - 0.5) * baseDelta;
                  };
                  
                  const baseDelta = Math.max(region.latitudeDelta, 0.05);

                  const roomsWithCoords = data.map((room) => {
                    const base = cityCoords[room.city];
                    if (!base) return null;
                  
                    const latOffset = getOffset(room.id || room.name + room.city, baseDelta / 4);
                    const lngOffset = getOffset(room.name + room.city + "lng", baseDelta / 4);
                  
                    return {
                      ...room,
                      latitude: base.lat + latOffset,
                      longitude: base.lng + lngOffset,
                    };
                  }).filter(Boolean);

                setRooms(roomsWithCoords);
            } catch (err) {
                console.error("Failed to fetch rooms:", err);
            }
        };

        loadRooms();
        debugReadCache();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    const handleZoom = (zoomIn) => {
        setRegion((prev) => {
            const deltaFactor = zoomIn ? 0.5 : 2;
            const newLatitudeDelta = Math.min(Math.max(prev.latitudeDelta * deltaFactor, 0.002), 100);
            const newLongitudeDelta = Math.min(Math.max(prev.longitudeDelta * deltaFactor, 0.002), 100);
            return {
                ...prev,
                latitudeDelta: newLatitudeDelta,
                longitudeDelta: newLongitudeDelta,
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
                minZoomLevel={2}
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
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    markerSubText: {
        fontSize: 12,
        color: "#555",
    },
});
