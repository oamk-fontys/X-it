import { StyleSheet, View, Text, Alert } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { time_slots, booking } from './testData'
import ScheduleElement from "./ScheduleElement";

export default function TimeSlots({ selectedDate, type }) {
    const [reservations, setReservations] = useState([]);
    const [todaySchedule, setTodaySchedule] = useState([]);

    let slots = [
        <Text key={0}>Loading...</Text>
    ]

    const getHour = (time) => {
        if (!time) {
            return;
        }

        let hour = time.split(':')[0];
        if (hour[0] === '0') {
            hour = hour[1] || '0'
        }

        return +hour
    }

    const book = (hour, minute) => {
        let start_time = `${hour}:${minute === 0 ? '00' : '30'}`;
        let end_time = `${hour + 1}:${minute === 0 ? '00' : '30'}`;

        if (type === 'booking') {
            Alert.alert(
                'Booking',
                `Your game will take time from ${start_time} to ${end_time}.\nCreate booking?`,
                [
                    {
                        text: 'Cancel',
                        style: 'default'
                    },
                    {
                        text: 'Book',
                        style: 'default',
                        onPress: () => {
                            //imitating posting to db
                            booking.push({
                                weekday: new Date(selectedDate).getDay().toString(),
                                start_time: new Date(new Date(selectedDate).toISOString().replaceAll(/[0-9]+:[0-9]+/g, start_time).replace('Z', '')),
                                end_time: new Date(new Date(selectedDate).toISOString().replaceAll(/[0-9]+:[0-9]+/g, end_time).replace('Z', '')),
                                type: 'pending'
                            })

                            setReservations([
                                ...reservations,
                                {
                                    weekday: new Date(selectedDate).getDay().toString(),
                                    start_time: new Date(new Date(selectedDate).toISOString().replaceAll(/[0-9]+:[0-9]+/g, start_time).replace('Z', '')),
                                    end_time: new Date(new Date(selectedDate).toISOString().replaceAll(/[0-9]+:[0-9]+/g, end_time).replace('Z', '')),
                                    type: 'pending'
                                }
                            ])
                        }
                    }
                ],
                {
                    cancelable: false
                }
            )
        } else if (type === 'cancel') {
            setReservations(prev => {
                let element = prev.filter(e => !(
                    new Date(e.start_time).getMinutes() === minute
                    &&
                    new Date(e.start_time).getHours() === hour
                ))

                if (element.length === prev.length) {
                    const start_time = `${hour}:${minute === 0 ? '00' : '30'}`;
                    element.push({
                        weekday: new Date(selectedDate).getDay().toString(),
                        start_time: new Date(new Date(selectedDate).toISOString().replaceAll(/[0-9]+:[0-9]+/g, start_time).replace('Z', '')),
                        end_time: new Date(new Date(selectedDate).toISOString().replaceAll(/[0-9]+:[0-9]+/g, start_time).replace('Z', '')),
                        type: 'canceled'
                    })
                }

                return [...element]
            })
        }
    }

    let setter = [];
    for (let i = getHour(todaySchedule.start_time); i <= getHour(todaySchedule.end_time); i++) {
        let row = [];
        for (let n = 0; n <= 30; n += 30) {
            row.push(
                <ScheduleElement
                    key={n}
                    todaySchedule={todaySchedule}
                    minute={n}
                    hour={i}
                    getHour={getHour}
                    selectedDate={selectedDate}
                    todayReservations={reservations}
                    book={book}
                    type={type}
                />
            )
        }
        setter.push(
            <View
                style={styles.slotBox}
                key={i}
            >
                {row}
            </View>
        );
    }

    if (setter.length !== 0) {
        slots = setter
    } else {
        slots = [
            <Text key={0}>No Time Slots Available</Text>
        ]
    }

    useEffect(() => {
        //info will be fetched + also booking info
        const schedule = time_slots.find(e => (
            e.weekday === new Date(selectedDate).getDay().toString()
        ));
        setTodaySchedule(schedule)

        const todayReservations = booking.filter(e => (
            new Date(e.start_time).getDate() === new Date(selectedDate).getDate()
        ));
        setReservations(todayReservations);
    }, [])

    return( 
        <View
            style={styles.container}
        >
            {slots}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        margin: 20,
        backgroundColor: '#393E46',
        borderRadius: 15,
    },
    slotBox: {
        width: '100%',
        flexDirection: 'row',
        height: 60
    },
})