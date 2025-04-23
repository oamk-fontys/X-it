import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../../theme/globalStyles";
import { useRooms } from "../../../context/RoomProvider";

export default function RoomElement({
    id,
    city,
    roomName,
    img
}) {
    const navigation = useNavigation();
    const {getRatingByRoom, average} = useRooms()

    const [rating, setRating] = useState([])

    useEffect(() => {
        const fetchRating = async (roomId) => {
            const res = await getRatingByRoom(roomId)
            
            setRating(res)
        }

        fetchRating(id)
    }, [])

    return (
        <View
            style={globalStyles.container}
        >
            <TouchableOpacity
                style={globalStyles.cardItem}
                onPress={() => {
                    navigation.navigate('Room Details', { id: id });
                }}
            >
                <View
                    style={globalStyles.cardItemImage}
                >
                    {
                        img
                            ?
                            <Image
                                style={globalStyles.image}
                                source={{ uri: img }}
                            />
                            :
                            <View
                                style={globalStyles.noImage}
                            >
                                <Text
                                    style={globalStyles.textError}
                                >
                                    No Image
                                </Text>
                            </View>
                    }
                </View>
                <View
                    style={globalStyles.cardItemContent}
                >
                    <View
                        style={globalStyles.horizontalAlignContainer}
                    >
                        <Rating
                            rating={average(rating)}
                            size={14}
                        />
                        <Text
                            style={globalStyles.textSmall}
                        >
                            {city}
                        </Text>
                    </View>
                    <Text
                        style={globalStyles.subTitle}
                    >
                        {roomName}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}