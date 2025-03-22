import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../theme/globalStyles";

export default function RoomActions({ roomId, room }) {
    const navigation = useNavigation();

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this room?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes, Delete", onPress: () => console.log(`Room ${roomId} deleted!`) }
            ]
        );
    };

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "green", flex: 0.32, marginLeft: -5 }]}
                onPress={() => navigation.navigate("Time Slots", { roomId })}
            >
                <Text style={globalStyles.buttonText}>Time Slots</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "blue", flex: 0.32 }]}
                onPress={() => navigation.navigate("Update Room", { room })}
            >
                <Text style={globalStyles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "red", flex: 0.32, marginRight: -5 }]}
                onPress={handleDelete}
            >
                <Text style={globalStyles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}
