import React from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RoomActions({ roomId, room, onDelete, onUpdateSuccess }) {
    const navigation = useNavigation();

    const handleDelete = () => {
        Alert.alert(
            "Delete Room",
            "Are you sure you want to delete this room? This action cannot be undone.",
            [
                { 
                    text: "Cancel", 
                    style: "cancel",
                },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: onDelete
                }
            ],
            { cancelable: true }
        );
    };

    const handleUpdate = () => {
        navigation.navigate("UPDATE_ROOM", { 
            room,
            onUpdateSuccess 
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.timeSlotsButton]}
                onPress={() => navigation.navigate("Time Slots", { roomId })}
            >
                <MaterialCommunityIcons 
                    name="clock-outline" 
                    size={20} 
                    color="#EEEEEE" 
                />
                <Text style={styles.buttonText}>Time Slots</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={handleUpdate}
            >
                <MaterialCommunityIcons 
                    name="pencil-outline" 
                    size={20} 
                    color="#EEEEEE" 
                />
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}
            >
                <MaterialCommunityIcons 
                    name="delete-outline" 
                    size={20} 
                    color="#EEEEEE" 
                />
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        elevation: 3,
    },
    timeSlotsButton: {
        backgroundColor: '#00ADB5',
    },
    updateButton: {
        backgroundColor: '#393E46',
    },
    deleteButton: {
        backgroundColor: '#D65A31',
    },
    buttonText: {
        color: '#EEEEEE',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});
