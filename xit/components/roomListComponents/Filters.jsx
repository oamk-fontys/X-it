import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRooms } from "../../context/RoomProvider";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Filters({
    hide,
    setHide,
    setFilters
}) {
    const [companyFilters, setCompanyFilters] = useState([])
    const { getCompanies } = useRooms();

    const submit = () => {
        setFilters({
            company: companyFilters
        })
        setHide(true)
    }

    return (
        <View
            style={[
                styles.container,
                {
                    display: hide ? 'none' : 'flex'
                }
            ]}
        >
            <ScrollView
                style={styles.scrollable}
            >
                <Text
                    style={styles.title}
                >
                    Filters
                </Text>
                <View
                    style={styles.companyFilters}
                >
                    <Text
                        style={styles.companyFiltersTitle}
                    >
                        Company
                    </Text>
                    {
                        getCompanies().map((e, i) => (
                            <View
                                key={i}
                                style={styles.companyFilterElement}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setCompanyFilters(prevFilters =>
                                            prevFilters.includes(e)
                                                ? prevFilters.filter(element => element !== e)
                                                : [...prevFilters, e]
                                        );
                                    }}
                                >
                                    <FontAwesome
                                        name={
                                            companyFilters.includes(e)
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
                                    style={styles.companyName}
                                >
                                    {e}
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <View
                style={styles.confirmView}
            >
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={submit}
                >
                    <Text
                        style={styles.confirm}
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
        paddingHorizontal: 20,
        width: '100%',
        height: 350,
    },
    scrollable: {
        width: '100%'
    },
    title: {
        color: '#EEEEEE',
        fontSize: 32,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    },
    companyFilters: {
        width: '100%'
    },
    companyFiltersTitle: {
        width: '100%',
        textAlign: 'center',
        color: '#EEEEEE',
        fontSize: 24
    },
    companyFilterElement: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    companyName: {
        fontSize: 16,
        color: '#EEEEEE',
        marginStart: 5
    },
    confirmView: {
        width: '100%',
        alignItems: 'center'
    },
    confirmButton: {
        backgroundColor: '#00ADB5',
        padding: 10,
        borderRadius: 10
    },
    confirm: {
        color: '#EEEEEE',
        fontSize: 20,
        fontWeight: 'bold'
    }
})