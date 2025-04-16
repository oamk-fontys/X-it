import React, { useEffect, useCallback } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import globalStyles from "../../theme/globalStyles"
import { Dropdown } from "react-native-element-dropdown"
import { useState } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native"
import { useTime } from "../../context/TimeContext"
import { useRooms } from "../../context/RoomProvider"
import theme from "../../theme/theme"

export default function RoomSchedule({
    roomId = '0e0a8dbf-4609-40f3-a63e-6eab4092dca3'
}) {
    const navigation = useNavigation();
    const { getRoomById } = useRooms()
    const {
        getFirstSlotByDay,
        getLastSlotByDay,
        loading,
        getTimesByRoom,
        getTimeSlotsByDay,
        deleteTimeSlot,
        postTimeSlot
    } = useTime()

    const weekdays = [
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
        { label: 'Sunday', value: 0 },
    ];

    const times = Array.from({ length: 96 }, (_, i) => {
        const hours = Math.floor(i / 4);
        const minutes = i % 4 * 15;
        const time = `${hours}:${minutes === 0 ? '00' : minutes}`;
        return { label: time, value: (hours + (minutes / 60)) };
    });

    const [weekday, setWeekday] = useState(1);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [unavailable, setUnavailable] = useState(true);

    const weekdayChange = (value) => {
        setWeekday(value);

        const start = getFirstSlotByDay(value);

        if (start) {
            setUnavailable(false)
            setFrom(start)
            setTo(getLastSlotByDay(value))
        } else {
            setUnavailable(true)
            setFrom(0)
            setTo(0)
        }
    }

    const deleteAllSlots = async (timeSlots) => {
        const slots = [...timeSlots]

        while (slots.length !== 0) {
            await deleteTimeSlot(slots[0]?.id)
            slots.splice(0, 1)
        }
    }

    const submit = async () => {
        const room = getRoomById(roomId) || {}
        const timeSlots = getTimeSlotsByDay(weekday) || []

        deleteAllSlots(timeSlots)
        .then(async () => {
            if (unavailable) {
                return
            }

            let i = from

            while (i <= to) {
                const day = weekdays.find(e => (
                    e.value === weekday
                ))?.label?.toUpperCase()
                
                let time = times.find(e => (
                    e.value === i
                ))?.label
                if (time.length < 5) {
                    time = `0${time}`
                }

                await postTimeSlot(
                    day,
                    time,
                    roomId
                )

                i += (room.duration + room.cleanUpTime) / 60
            }
        })
        .then(() => {
            getTimesByRoom(roomId)
        })
    }

    useEffect(() => {
        getTimesByRoom(roomId)
    }, [])
    useEffect(() => {
        weekdayChange(weekday)
    }, [loading])

    const header = (
        <View
            style={styles.headerView}
        >
            <View
                style={styles.backView}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text
                        style={[
                            globalStyles.text,
                            {
                                color: theme.colors.primary
                            }
                        ]}
                    >
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={globalStyles.mainContainer}
            >
                <Text
                    style={globalStyles.text}
                >
                    Manage schedule for:
                </Text>
                <Text
                    style={globalStyles.subTitle}
                >
                    {getRoomById(roomId)?.name}
                </Text>
            </View>
        </View>
    )

    const content = (
        <View
            style={[
                globalStyles.safeArea,
                globalStyles.mainContainer
            ]}
        >
            {header}
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
                            weekdayChange(item.value);
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
                            maxHeight={300}
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
                            maxHeight={300}
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
                    {`Make unavailable for ${weekdays.find(e => e.value === weekday)?.label}s`}
                </Text>
            </View>
            <View
                style={globalStyles.mainContainer}
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
                        `Your room will be unavailable for ${weekdays.find(e => e.value === weekday)?.label}s`
                        :
                        `Your room will work from ${times.find(e => e.value === from)?.label} to ${times.find(e => e.value === to)?.label} on ${weekdays.find(e => e.value === weekday)?.label}s`
                    }
                </Text>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={submit}
                >
                    <Text
                        style={globalStyles.buttonText}
                    >
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.footer}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(
                            'Calendar',
                            {
                                roomId: roomId,
                                type: 'cancel'
                            }
                        )
                    }}
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
        </View>
    )

    return (
        <>
            {
                loading
                ?
                <View
                    style={[
                        globalStyles.safeArea,
                        globalStyles.mainContainer
                    ]}
                >
                    {header}
                    <Text
                        style={[
                            globalStyles.text,
                            {
                                flex: 1
                            }
                        ]}
                    >
                        Loading...
                    </Text>
                </View>
                :
                content
            }
        </>
    )
}

const styles = new StyleSheet.create({
    headerView: {
        backgroundColor: theme.colors.containerBackground,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    backView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
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