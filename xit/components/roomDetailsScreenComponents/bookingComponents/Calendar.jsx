import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

export default function Calendar({
    calendarDisplay,
    setCalendarDisplay,
    selectedDate,
    setSelectedDate
}) {
    return(
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
    )
}

const styles = new StyleSheet.create({
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