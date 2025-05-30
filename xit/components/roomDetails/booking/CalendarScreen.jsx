import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";
import { useTime } from "../../../context/TimeContext";
import globalStyles from '../../../theme/globalStyles'

export default function CalendarScreen({ roomId, type }) {
    const { getTimesByRoom } = useTime()
    const slotsLoading = useTime().loading

    const [calendarDisplay, setCalendarDisplay] = useState('none');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatDate = (date) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const day = new Date(date).getDate();
        const month = months[new Date(date).getMonth()];
        const year = new Date(date).getFullYear();

        return `${day} ${month} ${year}`
    }

    useEffect(() => {
        getTimesByRoom(
            roomId,
            selectedDate
        )
    }, [selectedDate])

    return(
        <View
            style={styles.container}
        >
            <Calendar
                calendarDisplay={calendarDisplay}
                setCalendarDisplay={setCalendarDisplay}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <ScrollView
                contentContainerStyle={styles.scrollable}
            >
                <View
                    style={styles.dateView}
                >
                    <Text
                        style={styles.dateText}
                    >
                        {formatDate(selectedDate)}
                    </Text>
                    <TouchableOpacity
                        style={styles.selectDateButton}
                        onPress={() => {
                            setCalendarDisplay('flex')
                        }}
                    >
                        <Text
                            style={styles.selectDateButtonText}
                        >
                            Select Date
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    slotsLoading
                    ?
                    <Text
                        style={globalStyles.text}
                    >
                        Loading...
                    </Text>
                    :
                    <TimeSlots
                        key={selectedDate}
                        selectedDate={selectedDate}
                        type={type}
                        roomId={roomId}
                    />
                }
                <View
                    style={styles.spacer}
                ></View>
            </ScrollView>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#222831'
    },
    scrollable: {
        width: '100%',
        alignItems: 'center'
    },
    dateView: {
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
    },
    dateText: {
        color: '#EEEEEE',
        fontWeight: 'bold',
        fontSize: 24,
    },
    selectDateButton: {
        padding: 10,
        backgroundColor: '#00ADB5',
        borderRadius: 15,
        marginStart: 10
    },
    selectDateButtonText: {
        color: '#EEEEEE',
        fontSize: 16,
        fontWeight: 'bold'
    },
    spacer: {
        height: 30
    }
})