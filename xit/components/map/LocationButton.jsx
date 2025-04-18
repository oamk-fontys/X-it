import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LocationButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                position: "absolute",
                bottom: 80,
                right: 20,
                backgroundColor: "#00ADB5",
                padding: 10,
                borderRadius: 50,
            }}
        >
            <Ionicons name="locate" size={20} color="white" />
        </TouchableOpacity>
    );
}