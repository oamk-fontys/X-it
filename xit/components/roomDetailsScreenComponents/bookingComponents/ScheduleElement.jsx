import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useTime } from "../../../context/TimeContext";

export default function ScheduleElement({
    start_time,
    end_time,
    selectedDate,
    book,
    type,
}) {
    const { getHour, getMinute } = useTime()

    let available = 'available';

    const now = new Date();

    if (
        (
            available === 'canceled'
            &&
            type === 'booking'
        )
    ) {
        return (
            <View
                style={styles.slot}
            ></View>
        )
    }
    
    if (
        type === 'cancel'
        &&
        available === 'canceled'
    ) {
        return (
            <View
                style={styles.slot}
            >
                <Text
                    style={styles.time}
                >
                    {start_time}
                </Text>
                <Text
                    style={styles.time}
                >
                    -
                </Text>
                <Text
                    style={styles.time}
                >
                    {end_time}
                </Text>
                <Pressable
                    style={[styles.bookButton, {
                        backgroundColor: '#222831',
                        borderColor: '#00ADB5',
                        borderWidth: 1
                    }]}
                    onPress={() => {
                        book(start_time, end_time)
                    }}
                >
                    <Text
                        style={styles.bookButtonText}
                    >
                        Canceled
                    </Text>
                </Pressable>
            </View>
        )
    }

    if (available === 'booked' || available === 'pending') {

        return (
            <View
                style={styles.slot}
            >
                <Text
                    style={styles.time}
                >
                    {start_time}
                </Text>
                <Text
                    style={styles.time}
                >
                    -
                </Text>
                <Text
                    style={styles.time}
                >
                    {end_time}
                </Text>
                <View
                    style={[styles.bookButton, {
                        backgroundColor: '#222831'
                    }]}
                >
                    <Text
                        style={styles.bookButtonText}
                    >
                        {
                            type === 'cancel'
                            ?
                            available
                            :
                            'Booked'
                        }
                    </Text>
                </View>
            </View>
        )
    }

    if (
        ((now.getHours() > getHour(start_time))
        ||
        (now.getHours() === getHour(start_time) && now.getMinutes() >= getMinute(start_time)))
        &&
        (new Date(selectedDate).getDate() === now.getDate())
    ) {
        return (
            <View
                style={styles.slot}
            >
                <Text
                    style={styles.time}
                >
                    {start_time}
                </Text>
                <Text
                    style={styles.time}
                >
                    -
                </Text>
                <Text
                    style={styles.time}
                >
                    {end_time}
                </Text>
            </View>
        )
    }

    return (
        <View
            style={styles.slot}
        >
            <Text
                style={styles.time}
            >
                {start_time}
            </Text>
            <Text
                style={styles.time}
            >
                -
            </Text>
            <Text
                style={styles.time}
            >
                {end_time}
            </Text>
            <Pressable
                style={styles.bookButton}
                onPress={() => {
                    book(start_time, end_time)
                }}
            >
                <Text
                    style={styles.bookButtonText}
                >
                    {
                        type === 'booking'
                        ?
                        'Book'
                        :
                        'Available'
                    }
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    slot: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        height: 60
    },
    time: {
        marginEnd: 10,
        fontSize: 16,
        color: '#EEEEEE',
        flex: 1,
        textAlign: 'center'
    },
    bookButton: {
        backgroundColor: '#00ADB5',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 3
    },
    bookButtonText: {
        color: '#EEEEEE',
        fontSize: 12,
        fontWeight: 'bold'
    }
})