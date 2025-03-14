import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";

export default function ScheduleElement({
    todaySchedule,
    hour,
    minute,
    getHour,
    selectedDate,
    book,
    todayReservations,
    type
}) {
    const getMinute = (time) => {
        if (!time) {
            return;
        }

        let minute = time.split(':')[1];

        return +minute;
    }

    let available = 'available';

    todayReservations.forEach(e => {
        const start = new Date(e.start_time);
        const end = new Date(e.end_time);

        if (
            (
                (
                    start.getHours() - 1 < hour
                    &&
                    end.getHours() > hour
                )
                ||
                (
                    start.getHours() - 1 === hour
                    &&
                    start.getMinutes() <= minute
                )
                ||
                (
                    end.getHours() === hour
                    &&
                    end.getMinutes() >= minute
                )
            )
            &&
            (
                e.type === 'booked'
                ||
                e.type === 'pending'
            )
        ) {
            available = e.type;
        } else if (
            e.type === 'canceled'
            &&
            start.getHours() === hour
            &&
            start.getMinutes() === minute
        ) {
            available = 'canceled'
        }
    })

    const now = new Date();

    if (
        (
            hour === getHour(todaySchedule.start_time)
            &&
            minute === 0
            &&
            getMinute(todaySchedule.start_time) === 30
        )
        ||
        (
            hour === getHour(todaySchedule.end_time)
            &&
            minute === 30
            &&
            getMinute(todaySchedule.end_time) === 0
        )
        ||
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
                    {`${hour}:${minute === 0 ? '00' : '30'}`}
                </Text>
                <Pressable
                    style={[styles.bookButton, {
                        backgroundColor: '#222831',
                        borderColor: '#00ADB5',
                        borderWidth: 1
                    }]}
                    onPress={() => {
                        book(hour, minute)
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