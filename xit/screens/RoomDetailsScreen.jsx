import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Rating from "../components/home/popularRooms/Rating";
import Comments from "../components/roomDetails/comments/Comments";
import { useRooms } from "../context/RoomProvider";
import { useAuth } from '../context/AuthContext';

export default function RoomDetailsScreen({ id }) {
    const navigation = useNavigation();
    const { getRoomById } = useRooms();
    const { user } = useAuth();

    // unauthorized users are navigated to login page
    const navigationTarget = user ? 'Calendar' : 'Login';

    const room = getRoomById(id);
    const img = room.company?.logo?.url;
    const title = room.name;
    const description = room.description;
    const ratings = [];
    const companyName = room.company.name

    const average = (arr) => {
        let sum = 0;

        arr.forEach(e => {
            sum += e;
        });

        return sum / arr.length
    }

    const bookingPress = () => {
        if (navigationTarget === 'Calendar') {
            navigation.navigate(
                'Calendar',
                {
                    roomId: id,
                    type: 'booking'
                }
            )
        } else {
            navigation.navigate(navigationTarget)
        }
    }

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
        shadowOffset: {height: 1, width: 1},
        textAlign: 'center'
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