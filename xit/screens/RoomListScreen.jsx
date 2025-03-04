import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native"
import RoomElement from "../components/roomListComponents/RoomElement";
import { useRooms } from "../context/RoomProvider";

export default function RoomListScreen() {
    const { rooms } = useRooms();

    return (
        <View
            style={styles.container}
        >
            <ScrollView
                style={styles.containerScrollable}
            >
                {rooms.map((e, i) => (
                    <RoomElement
                        key={i}
                        title={e.name}
                        companyName={e.companyId}
                        id={e.id}                        
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222831",
        height: "100%",
        width: '100%',

    },
    containerScrollable: {
        height: "100%",
        width: "100%",
    },
})