import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import RoomElement from "./RoomElement";

export default function RoomListCard({ rooms, onRoomPress, emptyMessage }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Room List</Text>
                <Text style={styles.count}>{rooms.length} {rooms.length === 1 ? 'room' : 'rooms'}</Text>
            </View>
            
            <View style={styles.body}>
                {rooms.length > 0 ? (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {rooms.map(room => (
                            <RoomElement 
                                key={room.id}
                                room={room}
                                onPress={() => onRoomPress(room.id)}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(34, 40, 49, 0.9)',
        borderRadius: 12,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#rgba(34, 40, 49, 0.9)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    count: {
        fontSize: 14,
        color: '#fff',
    },
    body: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#rgba(34, 40, 49, 0.9)',
        fontSize: 16,
    }
});
