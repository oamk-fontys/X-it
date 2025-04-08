import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Rating from "../../home/popularRooms/Rating";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RatingFilters({
    ratingFilters,
    setRatingFilters,
    section,
    sectionTitle,
    sectionElement,
}) {
    let ratings = [];

    for (let i = 5; i >= 1; i--) {
        ratings.push(
            <View
                style={sectionElement}
                key={i}
            >
                <TouchableOpacity
                    onPress={() => {
                        setRatingFilters(prev => (
                            prev.includes(i)
                            ?
                            prev.filter(e => e !== i)
                            :
                            [...prev, i]
                        ))
                    }}
                >
                    <FontAwesome
                        name={
                            ratingFilters.includes(i)
                            ?
                            'check-square'
                            :
                            'square-o'
                        }
                        size={32}
                        color="#00ADB5"
                    />
                </TouchableOpacity>
                <Rating
                    size={22}
                    rating={i}
                    color={'#EEEEEE'}
                />
            </View>
        )
    }

    return (
        <View
            style={section}
        >
            <Text
                style={sectionTitle}
            >
                Rating
            </Text>
            {ratings}
        </View>
    )
}