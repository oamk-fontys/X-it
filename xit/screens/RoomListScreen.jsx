import React from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native"
import RoomElement from "../components/roomListComponents/RoomElement";
import { useRooms } from "../context/RoomProvider";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

export default function RoomListScreen() {
    const { searchForRoom } = useRooms();
    const [query, setQuery] = useState('');

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.inputView}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor='#EEEEEE'
                    value={query}
                    onChangeText={(text) => {
                        setQuery(text);
                    }}
                />
                <AntDesign
                    name="search1"
                    size={24}
                    color="#EEEEEE"
                    style={styles.inputIcon}
                />
            </View>
            <ScrollView
                style={styles.containerScrollable}
            >
                {
                    searchForRoom(query).length === 0
                    ?
                    <Text
                        style={styles.noResults}
                    >
                        No Results
                    </Text>
                    :
                    searchForRoom(query).map((e, i) => (
                        <RoomElement
                            key={i}
                            title={e.name}
                            companyName={e.companyId}
                            id={e.id}                        
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222831",
        height: "100%",
        width: '100%',

    },
    inputView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    input: {
        height: 50,
        flex: 1,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        color: '#EEEEEE',
        fontSize: 20,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    inputIcon: {
        position: 'absolute',
        right: 30
    },
    containerScrollable: {
        height: "100%",
        width: "100%",
    },
    noResults: {
        width: '100%',
        textAlign: 'center',
        fontSize: 32,
        color: '#EEEEEE',
        fontStyle: 'italic',
        marginTop: 10
    }
})