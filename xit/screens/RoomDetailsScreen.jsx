import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Rating from "../components/homeScreenComponents/popularRoomsComponents/Rating";
import Comments from "../components/roomDetailsScreenComponents/Comments";
import { useRooms } from "../context/RoomProvider";

export default function RoomDetailsScreen({ id }) {
    const navigation = useNavigation();
    const { getRoomById } = useRooms();

    const room = getRoomById(id);
    const img = '';
    const title = room.name;
    const description = room.description;
    const ratings = [];
    const companyName = room.companyId

    const average = (arr) => {
        let sum = 0;

        arr.forEach(e => {
            sum += e;
        });

        return sum / arr.length
    }

    const bookingPress = () => {
        navigation.navigate('Calendar');
    }

    // useEffect(() => {
    //     //fetching info using id passed by RoomElement
    //     setImg('https://www.exitoulu.fi/wp-content/uploads/2020/11/theheist3-1200x800.jpg');
    //     setTitle('The Heist');
    //     setDescription(`Galleria Via Nuevo on has acquired possession of an extremely valuable piece of art. Your team of experienced top criminals has to bypass gallery's unusual security system, steal the piece and get out in time and leaving no trace behind. The challenge is big, but so is the reward.`);
    //     setCompanyName('Exit Oulu');
    //     let ratingsSetter = [];
    //     for (let i = 0; i < 9; i++) {
    //         ratingsSetter.push(
    //             Math.floor(Math.random() * 5) + 1
    //         )
    //     }
    //     setRatings(ratingsSetter);
    // }, [])

    return(
        <View
            style={styles.container}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={styles.containerScrollable}
            >
                <View
                    style={styles.posterView}
                >
                    {
                        img
                        ?
                        <Image
                            style={styles.poster}
                            source={{uri: img}}
                        />
                        :
                        <View
                            style={[
                                styles.poster,
                                {
                                    borderWidth: 1,
                                    borderColor: '#EEEEEE'
                                }
                            ]}
                        ></View>
                    }
                    <Text
                        style={styles.title}
                    >
                        {title}
                    </Text>
                </View>
                <View
                    style={styles.ratingView}
                >
                    <Rating
                        rating={average(ratings)}
                        size={24}
                    />
                    <Text
                        style={styles.rated}
                    >
                        {ratings.length} rated
                    </Text>
                </View>
                <View
                    style={styles.descriptionView}
                >
                    <Text
                        style={styles.description}
                    >
                        {description}
                    </Text>
                </View>
                <View
                    style={styles.bookingView}
                >
                    <TouchableOpacity
                        style={styles.companyNameView}
                    >
                        <Text
                            style={styles.companyName}
                        >
                            {companyName}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bookingButton}
                        onPress={bookingPress}
                    >
                        <Text
                            style={styles.bookingText}
                        >
                            Book
                        </Text>
                    </TouchableOpacity>
                </View>
                <Comments roomId={id} />
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831'
    },
    containerScrollable: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    posterView: {
        width: '100%',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    poster: {
        width: '100%',
        height: 250,
        borderRadius: 15
    },
    title: {
        position: 'absolute',
        fontSize: 36,
        backgroundColor: '#00ADB5',
        padding: 5,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#EEEEEE',
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {height: 1, width: 1}
    },
    ratingView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingStart: 20,
        paddingEnd: 20
    },
    rated: {
        fontSize: 18,
        color: '#EEEEEE',
        fontStyle: 'italic'
    },
    descriptionView: {
        padding: 20,
    },
    description: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EEEEEE',
        fontStyle: 'italic',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        padding: 5
    },
    bookingView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingEnd: 20,
        paddingStart: 20,
        alignItems: 'center'
    },
    companyNameView: {
        flex: 1
    },
    companyName: {
        color: '#EEEEEE',
        fontSize: 24,
        fontWeight: 'bold',

    },
    bookingButton: {
        backgroundColor: '#00ADB5',
        borderRadius: 25,
        padding: 7,
        paddingStart: 15,
        paddingEnd: 15
    },
    bookingText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#EEEEEE'
    },
})