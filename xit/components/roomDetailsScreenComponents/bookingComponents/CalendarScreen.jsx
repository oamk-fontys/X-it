import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { useState } from "react";

export default function CalendarScreen() {
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

    return(
        <View
            style={styles.container}
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
            <View
                style={[styles.dateSelectionView, {
                    display: calendarDisplay
                }]}
            >
                <DateTimePicker
                    mode="single"
                    date={selectedDate}
                    minDate={new Date()}
                    onChange={({ date }) => {
                        setSelectedDate(date);
                    }}
                    style={styles.calendar}
                    styles={{
                        header: {
                            backgroundColor: '#00ADB5',
                            borderRadius: 15,
                            marginBottom: 15
                        },
                        month_selector_label: {
                            color: '#EEEEEE',
                            fontWeight: 'bold',
                            fontSize: 26
                        },
                        year_selector_label: {
                            color: '#EEEEEE',
                            fontWeight: 'bold',
                            fontSize: 26
                        },
                        weekday_label: {
                            color: '#EEEEEE',
                            fontWeight: 'bold',
                            fontSize: 24
                        },
                        day_label: {
                            color: '#EEEEEE',
                            fontWeight: 'bold',
                            fontSize: 16
                        },
                        day: {
                            borderColor: '#00ADB5',
                            borderWidth: 1,
                            borderRadius: 15,
                            margin: 5
                        },
                        selected: {
                            backgroundColor: '#00ADB5'
                        },
                        disabled: {
                            borderWidth: 0,
                        },
                    }}
                />
                <TouchableOpacity
                    style={styles.confirmDate}
                    onPress={() => {
                        setCalendarDisplay('none');
                    }}
                >
                    <Text
                        style={styles.confirmDateText}
                    >
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#222831'
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
    dateSelectionView: {
        backgroundColor: '#393E46',
        alignItems: 'center',
        borderRadius: 15,
        position: 'absolute',
        marginTop: 15,
        marginHorizontal: 10
    },
    calendar: {
        backgroundColor: '#393E46',
        flex: 0,
        borderRadius: 15,
    },
    confirmDate: {
        backgroundColor: '#00ADB5',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    confirmDateText: {
        color: '#EEEEEE',
        fontWeight: 'bold',
        fontSize: 16
    },

})