import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import RoomElement from "./popularRoomsComponents/RoomElement";

export default function PopularRooms() {
    const [popularRoomList, setPopularRoomList] = useState([]);

    useEffect(() => {
        //always rendering four rooms (unless instructed differently)
        //room info fetched in RoomElement
        let setter = [];
        for (let i = 0; i < 4; i++) {
            setter.push(
                <RoomElement key={i}/>
            )
        }
        setPopularRoomList(setter);
    }, [])

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
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 10
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