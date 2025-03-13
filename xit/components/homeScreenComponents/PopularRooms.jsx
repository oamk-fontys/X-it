import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RoomElement from "./popularRoomsComponents/RoomElement";
import { useRooms } from "../../context/RoomProvider";
import globalStyles from "../../theme/globalStyles";

export default function PopularRooms() {
    const { rooms } = useRooms()

    let popularRoomList = [
        <View
            key={0}
            style={globalStyles.cardContainer}
        >
            <Text
                style={[globalStyles.title, globalStyles.textError]}
            >
                Loading...
            </Text>
        </View>
    ];

    if (rooms.length !== 0) {
        popularRoomList = [];

        for (let i = 0; i < 4; i++) {
            const e = rooms[i]

            if (e) {
                popularRoomList.push(
                    <RoomElement
                        key={i}
                        id={e.id}
                        roomName={e.name}
                    />
                )
            }
        }
    }

    return (
        <View
            style={globalStyles.cardContainer}
        >
            <View
                style={globalStyles.cardHeader}
            >
                <Text
                    style={globalStyles.title}
                >
                    Popular Rooms
                </Text>
            </View>
            <View
                style={globalStyles.cardBody}
            >
                {popularRoomList}
            </View>
        </View>
    )
}