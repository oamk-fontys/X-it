import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ScheduleElement from "./ScheduleElement";
import { useTime } from "../../../context/TimeContext";
import globalStyles from "../../../theme/globalStyles";
import { useBooking } from "../../../context/BookingContext";
import { useRooms } from "../../../context/RoomProvider";

export default function TimeSlots({ selectedDate, type, roomId }) {
    const { getTimeSlotsByDay } = useTime()
    const { getAllBookings, createBooking } = useBooking()
    const { getRoomById } = useRooms()    

    const todaySlots = getTimeSlotsByDay(new Date(selectedDate).getDay()) || []
    let slots = [];

    const book = (start_time, end_time, slotId) => {
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
                            createBooking({
                                roomId: roomId,
                                timeslotId: slotId,
                                companyId: getRoomById(roomId).company.id,
                                date: new Date(selectedDate)
                            })
                        }
                    }
                ],
                {
                    cancelable: false
                }
            )
        } else if (type === 'cancel') {
            // Creating canceling
        }
    }

    let setter = [];

    todaySlots.forEach((e, i) => {
        setter.push(
            <ScheduleElement
                key={i}
                start_time={e.start}
                end_time={e.end}
                selectedDate={selectedDate}
                book={book}
                type={type}
                slotId={e.id}
            />
        )
    });

    if (setter.length !== 0) {
        slots = setter
    } else {
        slots = [
            <Text
                key={0}
                style={globalStyles.text}
            >
                No Time Slots Available
            </Text>
        ]
    }

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
    }
})