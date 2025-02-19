import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";

export default function TimeSlots() {
    let slots = []

    for (let i = 0; i <= 23; i++) {
        let row = []
        for (let n = 0; n < 2; n ++) {
            row.push(
                <View
                    style={styles.slot}
                    key={n}
                >
                    <Text
                        style={styles.time}
                    >
                        {`${i}:${n === 0 ? '00' : '30'}`}
                    </Text>
                    {
                        i >= 10 && i <= 20
                        ?
                        <Pressable
                            style={styles.bookButton}
                            onPress={() => {
                                alert('Booking...')
                            }}
                        >
                            <Text
                                style={styles.bookButtonText}
                            >
                                Book
                            </Text>
                        </Pressable>
                        :
                        null
                    }
                </View>
            )
        }
        slots.push(
            <View
                style={styles.slotBox}
                key={i}
            >
                {row}
            </View>
        )
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
    },
    slotBox: {
        width: '100%',
        flexDirection: 'row',
        height: 50
    },
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
        flex: 1,
        borderRadius: 10
    },
    bookButtonText: {
        color: '#EEEEEE',
        fontSize: 12,
        fontWeight: 'bold'
    }
})