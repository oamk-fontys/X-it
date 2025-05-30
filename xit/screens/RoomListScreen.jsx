import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
import RoomElement from "../components/roomList/RoomElement";
import { useRooms } from "../context/RoomProvider";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import Filters from "../components/roomList/Filters";
import { useIsFocused } from "@react-navigation/native";

export default function RoomListScreen() {
    const screenFocused = useIsFocused()
    const { searchForRoom, filteredRooms, loading, getAllRooms } = useRooms();
    const [query, setQuery] = useState('');
    const [hideFilters, setHideFilters] = useState(true);
    const [filters, setFilters] = useState({});

    const result = filteredRooms(searchForRoom(query.trim().toLowerCase()), filters)

    let content;
    if (loading) {
        content = (
            <Text
                style={styles.noResults}
            >
                Loading...
            </Text>
        )
    } else if (result.length === 0) {
        content = (
            <Text
                style={styles.noResults}
            >
                No Results
            </Text>
        )
    } else {
        content = result.map((e, i) => (
            <RoomElement
                key={i}
                title={e.name}
                companyName={e.company?.name}
                id={e.id}
                city={e.company?.city}
                img={e.logo?.url}
            />
        ))
    }

    useEffect(() => {
        if (screenFocused) {
            getAllRooms()
        }
    }, [screenFocused])

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.inputView}
            >
                <TouchableOpacity
                    onPress={() => {
                        setHideFilters(!hideFilters)
                    }}
                >
                    <MaterialIcons
                        name="tune"
                        size={32}
                        color="#EEEEEE"
                        style={styles.filtersIcon}
                    />
                </TouchableOpacity>
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
            <Filters
                hide={hideFilters}
                setHide={setHideFilters}
                setFilters={setFilters}
            />
            <ScrollView
                style={styles.containerScrollable}
            >
                {content}
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
    filtersIcon: {
        marginRight: 15
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