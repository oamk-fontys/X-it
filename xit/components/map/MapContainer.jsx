import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import globalStyles from "../../theme/globalStyles";
import ZoomControl from "./ZoomControl";
import LocationButton from "./LocationButton";

export default function MapContainer() {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // Simulated company markers
    const companyMarkers = [
        {
            id: 1,
            name: "Company A",
            latitude: 60.192059,
            longitude: 24.945831,
        },
        {
            id: 2,
            name: "Company B",
            latitude: 60.200059,
            longitude: 24.935831,
        },
    ];

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
            <Text style={globalStyles.title}>Find Rooms on Map</Text>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={setRegion}
                minZoomLevel={0}
                maxZoomLevel={20}
            >
                {companyMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                    >
                        <View style={styles.markerLabel}>
                            <Text style={styles.markerLabelText}>{marker.name}</Text>
                        </View>
                        <Ionicons
                            name="location-sharp"
                            size={28}
                            color="#FF5C58"
                        />
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
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
    },
});
