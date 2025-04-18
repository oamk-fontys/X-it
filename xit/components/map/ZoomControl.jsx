import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ZoomControl({ onZoomIn, onZoomOut }) {
    return (
        <View style={{ position: "absolute", bottom: 150, right: 20 }}>
            <TouchableOpacity
                onPress={onZoomIn}
                style={{
                    backgroundColor: "#00ADB5",
                    padding: 10,
                    borderRadius: 50,
                    marginBottom: 10,
                }}
            >
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onZoomOut}
                style={{
                    backgroundColor: "#00ADB5",
                    padding: 10,
                    borderRadius: 50,
                }}
            >
                <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
}


