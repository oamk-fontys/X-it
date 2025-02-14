import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";

export default function RoomElement({
    rating,
    city,
    roomName,
    img
}) {
    const navigation = useNavigation();

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.body}
                onPress={() => {
                    navigation.navigate('Room Details');
                }}
            >
                <View
                    style={styles.imageView}
                >
                    {
                        img
                        ?
                        <Image
                            style={styles.image}
                            source={{uri: img}}
                        />
                        :
                        <View
                            style={styles.noImage}
                        >
                            <Text
                                style={styles.noImageText}
                            >
                                No Image
                            </Text>
                        </View>
                    }
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
            </TouchableOpacity>
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
        paddingBottom: 5,
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: {width: 4, height: 2}
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
    noImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        textAlign: 'center',
        color: '#EEEEEE',
        fontStyle: 'italic'
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