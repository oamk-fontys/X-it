import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import Rating from "../home/popularRooms/Rating";
import { useNavigation } from "@react-navigation/native";
import { useRooms } from "../../context/RoomProvider";

export default function RoomElement({
    img,
    title,
    id,
    companyName,
    city
}) {
    const navigation = useNavigation();
    const { getRatingByRoom, average } = useRooms()

    const [rating, setRating] = useState([])

    const press = () => {
        navigation.navigate(
            'Room Details',
            {
                id: id
            }
        );
    }

    useEffect(() => {
        const fetchRating = async (roomId) => {
            const res = await getRatingByRoom(roomId)
            
            setRating(res)
        }

        fetchRating(id)
    }, [])

    return (
        <Pressable
            style={styles.container}
            onPress={press}
        >
            <View
                style={styles.body}
            >
                <View
                    style={styles.posterView}
                >
                    {
                        img
                        ?
                        <Image
                            source={{
                                uri: img
                            }}
                            style={styles.img}
                        />
                        :
                        <View
                            style={[
                                styles.img,
                                styles.noImageView
                            ]}
                        >
                            <Text
                                style={styles.noImageText}
                            >
                                No Image
                            </Text>
                        </View>
                    }
                </View>
                <Text
                    style={styles.title}
                >
                    {title}
                </Text>
                <Rating
                    size={24}
                    rating={average(rating)}
                />
                <Text
                    style={styles.company}
                >
                    {companyName}
                </Text>
                <Text
                    style={styles.company}
                >
                    {city}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = new StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        width: '100%',
        paddingTop: 10
    },
    body: {
        width: "100%",
        backgroundColor: "#393E46",
        borderRadius: 15,
        padding: 10
    },
    posterView: {
        width: '100%',
        height: 250,
        marginBottom: 10,
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    noImageView: {
        borderColor: '#EEEEEE',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noImageText: {
        fontSize: 24,
        color: '#EEEEEE',
        fontStyle: 'italic'
    },
    title: {
        color: '#EEEEEE',
        fontSize: 32,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
    company: {
        color: '#EEEEEE',
        fontSize: 24,
        marginTop: 5
    }
})