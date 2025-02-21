import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";

export default function ScheduleElement({
    todaySchedule,
    hour,
    minute,
    getHour,
    selectedDate,
    book,
    todayReservations
}) {
    const getMinute = (time) => {
        if (!time) {
            return;
        }

        let minute = time.split(':')[1];

        return +minute;
    }

    let available = true;

    todayReservations.forEach(e => {
        if (
            (
                getHour(e.start_time) - 1 < hour
                &&
                getHour(e.end_time) > hour
            )
            ||
            (
                getHour(e.start_time) - 1 === hour
                &&
                getMinute(e.start_time) <= minute
            )
            ||
            (
                getHour(e.end_time) === hour
                &&
                getMinute(e.end_time) >= minute
            )
        ) {
            available = false;
        }
    })

    const now = new Date();

    if (
        hour === getHour(todaySchedule.start_time)
        &&
        minute === 0
        &&
        getMinute(todaySchedule.start_time) === 30
    ) {
        return (
            <View
                style={styles.slot}
            ></View>
        )
    }

    if (!available) {

        return (
            <View
                style={styles.slot}
            >
                <Text
                    style={styles.time}
                >
                    {`${hour}:${minute === 0 ? '00' : '30'}`}
                </Text>
                <View
                    style={[styles.bookButton, {
                        backgroundColor: '#222831'
                    }]}
                >
                    <Text
                        style={styles.bookButtonText}
                    >
                        Booked
                    </Text>
                </View>
            </View>
        )
    }

    if (
        ((now.getHours() > hour)
        ||
        (now.getHours() === hour && now.getMinutes() >= minute))
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
                    {`${hour}:${minute === 0 ? '00' : '30'}`}
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
                {`${hour}:${minute === 0 ? '00' : '30'}`}
            </Text>
            <Pressable
                style={styles.bookButton}
                onPress={() => {
                    book(hour, minute)
                }}
            >
                <Text
                    style={styles.bookButtonText}
                >
                    Book
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
        justifyContent: 'space-between'
    },
    time: {
        marginEnd: 10,
        fontSize: 16,
        color: '#EEEEEE',

    },
    bookButton: {
        backgroundColor: '#00ADB5',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '60%'
    },
    bookButtonText: {
        color: '#EEEEEE',
        fontSize: 12,
        fontWeight: 'bold'
    }
})