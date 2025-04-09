import React from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RoomActions({ roomId, room }) {
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
                    onPress: () => console.log(`Room ${roomId} deleted!`) 
                }
            ],
            { cancelable: true }
        );
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
                onPress={() => navigation.navigate("Update Room", { room })}
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
        marginBottom: 10,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
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

// import React from "react";
// import { View, TouchableOpacity, Text, Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import globalStyles from "../../../theme/globalStyles";

// export default function RoomActions({ roomId, room }) {
//     const navigation = useNavigation();

//     const handleDelete = () => {
//         Alert.alert(
//             "Confirm Delete",
//             "Are you sure you want to delete this room?",
//             [
//                 { text: "Cancel", style: "cancel" },
//                 { text: "Yes, Delete", onPress: () => console.log(`Room ${roomId} deleted!`) }
//             ]
//         );
//     };

//     return (
//         <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
//             <TouchableOpacity
//                 style={[globalStyles.button, { backgroundColor: "green", flex: 0.32, marginLeft: -5 }]}
//                 onPress={() => navigation.navigate("Time Slots", { roomId })}
//             >
//                 <Text style={globalStyles.buttonText}>Time Slots</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={[globalStyles.button, { backgroundColor: "blue", flex: 0.32 }]}
//                 onPress={() => navigation.navigate("Update Room", { room })}
//             >
//                 <Text style={globalStyles.buttonText}>Update</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={[globalStyles.button, { backgroundColor: "red", flex: 0.32, marginRight: -5 }]}
//                 onPress={handleDelete}
//             >
//                 <Text style={globalStyles.buttonText}>Delete</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
