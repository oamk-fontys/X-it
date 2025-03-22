import React from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
import RoomElement from "../components/roomListComponents/RoomElement";
import { useRooms } from "../context/RoomProvider";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import Filters from "../components/roomListComponents/Filters";

export default function RoomListScreen() {
    const { searchForRoom, filteredRooms } = useRooms();
    const [query, setQuery] = useState('');
    const [hideFilters, setHideFilters] = useState(true);
    const [filters, setFilters] = useState({});

    const result = filteredRooms(searchForRoom(query.trim().toLowerCase()), filters)

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
                        name="menu"
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
                {
                    result.length === 0
                    ?
                    <Text
                        style={styles.noResults}
                    >
                        No Results
                    </Text>
                    :
                    result.map((e, i) => (
                        <RoomElement
                            key={i}
                            title={e.name}
                            companyName={e.company.name}
                            id={e.id}
                            city={e.company.city}                     
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