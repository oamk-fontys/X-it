import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Rating from "./Rating";
import { useEffect, useState } from "react";

export default function RoomElement() {
    const [rating, setRating] = useState();
    const [city, setCity] = useState();
    const [roomName, setRoomName] = useState();
    const [img, setImg] = useState();

    useEffect(() => {
        //fetching room information

        //rating is random to test star rendering engine
        setRating(
            Math.floor(Math.random() * 501) / 100
        );
        setCity('Oulu');
        setRoomName(`Dead Man's Island`);
        setImg('https://th.bing.com/th/id/OIP.kNqtHzGWxqZF-RKwgPjgmQHaKX?rs=1&pid=ImgDetMain');
    }, [])

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.body}
            >
                <View
                    style={styles.imageView}
                >
                    <Image
                        style={styles.image}
                        source={{uri: img}}
                    />
                </View>
                <View
                    style={styles.info}
                >
                    <View
                        style={styles.top}
                    >
                        <Rating rating={rating} />
                        <Text
                            style={styles.city}
                        >
                            {city}
                        </Text>
                    </View>
                    <View
                        style={styles.bottom}
                    >
                        <Text
                            style={styles.roomName}
                        >
                            {roomName}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        paddingTop: 0,
        paddingBottom: 5,
    },
    body: {
        backgroundColor: '#222831',
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    imageView: {
        height: '100%',
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    info: {
        flex: 5,
        flexDirection: 'column'
    },
    top: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    city: {
        color: '#EEEEEE',
        fontSize: 16,
        fontWeight: 'bold',

    },
    bottom: {
        flex: 5,
        justifyContent: 'center'
    },
    roomName: {
        color: '#EEEEEE',
        fontWeight: 'bold',
        fontSize: 22,
        marginStart: 5
    }
})