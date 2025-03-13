import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import globalStyles from "../../theme/globalStyles"
import { Dropdown } from "react-native-element-dropdown"
import { useState } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RoomSchedule() {
    const weekdays = [
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
        { label: 'Sunday', value: 0 },
    ];

    const times = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? '00' : '30';
        const time = `${hours}:${minutes}`;
        return { label: time, value: (hours + ((i % 2) / 2)) };
    });

    const [weekday, setWeekday] = useState(1);
    //starting data must be fetched
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(23.5);
    const [unavailable, setUnavailable] = useState(false);

    return (
        <View
            style={[
                globalStyles.safeArea,
                globalStyles.container
            ]}
        >
            <View
                style={{
                    flex: 1
                }}
            ></View>
            <View>
                <View
                    style={styles.row}
                >
                    <Text
                        style={globalStyles.text}
                    >
                        Weekday:
                    </Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={weekdays}
                        labelField={'label'}
                        valueField={'value'}
                        value={weekday}
                        onChange={(item) => {
                            setWeekday(item.value);
                            setUnavailable(false);
                        }}
                        selectedTextStyle={globalStyles.text}
                        containerStyle={styles.containerStyle}
                        itemContainerStyle={styles.itemContainerStyle}
                        maxHeight={200}
                        autoScroll={false}
                        iconColor="#EEEEEE"
                    />
                </View>
                <View
                    style={{
                        display: unavailable ? 'none' : 'flex'
                    }}
                >
                    <View
                        style={styles.row}
                    >
                        <Text
                            style={globalStyles.text}
                        >
                            From:
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={times.filter(e => (
                                e.value <= to
                            ))}
                            labelField={'label'}
                            valueField={'value'}
                            value={from}
                            onChange={(item) => {
                                setFrom(item.value)
                            }}
                            selectedTextStyle={globalStyles.text}
                            containerStyle={styles.containerStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            maxHeight={200}
                            autoScroll={false}
                            iconColor="#EEEEEE"
                        />
                    </View>
                    <View
                        style={styles.row}
                    >
                        <Text
                            style={globalStyles.text}
                        >
                            To:
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={times.filter(e => (
                                e.value >= from
                            ))}
                            labelField={'label'}
                            valueField={'value'}
                            value={to}
                            onChange={(item) => {
                                setTo(item.value)
                            }}
                            selectedTextStyle={globalStyles.text}
                            containerStyle={styles.containerStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            maxHeight={200}
                            autoScroll={false}
                            iconColor="#EEEEEE"
                        />
                    </View>
                </View>
            </View>
            <View
                style={styles.unavailableView}
            >
                <TouchableOpacity
                    onPress={() => {
                        setUnavailable(!unavailable)
                    }}
                    style={{
                        marginRight: 10
                    }}
                >
                    <FontAwesome
                        name={
                            unavailable
                            ?
                            'check-square'
                            :
                            'square-o'
                        }
                        size={32}
                        color="#00ADB5"
                    />
                </TouchableOpacity>
                <Text
                    style={globalStyles.text}
                >
                    {`Make unavailable for ${weekdays.find(e => e.value === weekday).label}s`}
                </Text>
            </View>
            <View
                style={globalStyles.container}
            >
                <Text
                    style={[
                        globalStyles.text,
                        styles.result
                    ]}
                >
                    {
                        unavailable
                        ?
                        `Your room will be unavailable for ${weekdays.find(e => e.value === weekday).label}s`
                        :
                        `Your room will work from ${times.find(e => e.value === from).label} to ${times.find(e => e.value === to).label} on ${weekdays.find(e => e.value === weekday).label}s`
                    }
                </Text>
                <TouchableOpacity
                    style={globalStyles.button}
                >
                    <Text
                        style={globalStyles.text}
                    >
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.footer}
            >
                <Text
                    style={[
                        globalStyles.text,
                        {
                            textDecorationLine: 'underline'
                        }
                    ]}
                >
                    Manage schedule for particular date
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    dropdown: {
        height: 40,
        width: 140,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 10,
        padding: 5,
        marginStart: 10
    },
    selectedTextStyle: {
        color: '#EEEEEE'
    },
    containerStyle: {
        borderRadius: 5
    },
    itemContainerStyle: {
        borderRadius: 5
    },
    unavailableView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30
    },
    result: {
        textAlign: 'center',
        marginBottom: 10
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10
    }
})