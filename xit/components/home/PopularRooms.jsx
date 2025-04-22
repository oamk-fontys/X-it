import React from "react";
import { View, Text } from "react-native";
import RoomElement from "./popularRooms/RoomElement";
import { useRooms } from "../../context/RoomProvider";
import globalStyles from "../../theme/globalStyles";
import Message from "./popularRooms/Message";

export default function PopularRooms() {
    const { rooms, loading } = useRooms()

    let popularRoomList = [];

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
                        city={e.company?.city}
                        img={e.company?.logo?.url}
                    />
                )
            }
        }
    } else {
        popularRoomList = (
            <Message
                text='No Results'
            />
        )
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
                {
                    loading
                    ?
                    <Message
                        text='Loading...'
                    />
                    :
                    popularRoomList
                }
            </View>
        </View>
    )
}