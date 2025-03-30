import { StyleSheet, View, Text, Alert } from "react-native";
import React from "react";
import ScheduleElement from "./ScheduleElement";
import { useTime } from "../../../context/TimeContext";
import globalStyles from "../../../theme/globalStyles";

export default function TimeSlots({ selectedDate, type, roomId }) {
    const { getTimeSlotsByDay, getHour } = useTime()

    let slots = []

    const book = (start_time, end_time) => {
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
                            // Imitating posting to db
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

    getTimeSlotsByDay(new Date(selectedDate).getDay()).forEach((e, i) => {
        setter.push(
            <ScheduleElement
                key={i}
                start_time={e.start}
                end_time={e.end}
                selectedDate={selectedDate}
                book={book}
                type={type}
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