import React from "react";
import { View, Text, ScrollView } from "react-native";
import RoomElement from "./RoomElement";
import globalStyles from "../../theme/globalStyles";

export default function RoomListCard({ rooms, onRoomPress, emptyMessage }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Room List</Text>
            </View>
            <View style={styles.body}>
                {rooms.length > 0 ? (
                    <ScrollView>
                        {rooms.map(room => (
                            <RoomElement 
                                key={room.id}
                                room={room}
                                onPress={() => onRoomPress(room.id)}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <Text style={styles.emptyMessage}>{emptyMessage}</Text>
                )}
            </View>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        flex: 1,
        ...globalStyles.shadow
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: globalStyles.borderColor
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: globalStyles.primaryColor
    },
    body: {
        flex: 1,
        padding: 8
    },
    emptyMessage: {
        textAlign: 'center',
        padding: 20,
        color: globalStyles.secondaryTextColor
    }
};