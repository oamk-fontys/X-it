import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RoomElement from "./popularRoomsComponents/RoomElement";
import { useRooms } from "../../context/RoomProvider";

export default function PopularRooms() {
    const { rooms } = useRooms()
    
    let popularRoomList = [
        <View
            key={0}
            style={styles.loadingView}
        >
            <Text
                style={styles.loadingText}
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

    return(
        <View
            style={styles.container}
        >
            <View
                style={styles.body}
            >
                <View
                    style={styles.titleView}
                >
                    <Text
                        style={styles.title}
                    >
                        Popular Rooms
                    </Text>
                </View>
                <View
                    style={styles.content}
                >
                    {popularRoomList}
                </View>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    loadingView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 24,
        color: '#EEEEEE',
        fontStyle: 'italic'
    },
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 10,
    },
    body: {
        height: '100%',
        width: '100%',
        backgroundColor: '#393E46',
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleView: {
        width: '100%',
        backgroundColor: '#00ADB5',
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#EEEEEE',
        marginStart: 20
    },
    content: {
        flex: 5,
        width: '100%',
        flexDirection: 'column',
        marginTop: 5
    }
})