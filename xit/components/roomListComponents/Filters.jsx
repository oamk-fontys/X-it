import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import CompanyFilters from "./filterComponents/CompanyFilters";
import RatingFilters from "./filterComponents/RatingFilters";
import CityFilters from "./filterComponents/CityFilters";

export default function Filters({
    hide,
    setHide,
    setFilters
}) {
    const [companyFilters, setCompanyFilters] = useState([])
    const [ratingFilters, setRatingFilters] = useState([])
    const [cityFilters, setCityFilters] = useState([])

    const submit = () => {
        setFilters({
            company: companyFilters,
            rating: ratingFilters,
            city: cityFilters
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
                <RatingFilters
                    ratingFilters={ratingFilters}
                    setRatingFilters={setRatingFilters}
                    section={styles.section}
                    sectionTitle={styles.sectionTitle}
                    sectionElement={styles.sectionElement}
                />
                <CityFilters
                    cityFilters={cityFilters}
                    setCityFilters={setCityFilters}
                    section={styles.section}
                    sectionTitle={styles.sectionTitle}
                    sectionElement={styles.sectionElement}
                    label={styles.label}
                />
                <CompanyFilters
                    companyFilters={companyFilters}
                    setCompanyFilters={setCompanyFilters}
                    section={styles.section}
                    sectionTitle={styles.sectionTitle}
                    sectionElement={styles.sectionElement}
                    label={styles.label}
                />
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
        height: 400,
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
    section: {
        width: '100%',
        marginBottom: 10
    },
    sectionTitle: {
        width: '100%',
        textAlign: 'center',
        color: '#EEEEEE',
        fontSize: 24
    },
    sectionElement: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    label: {
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
        borderRadius: 10,
        marginVertical: 10
    },
    confirm: {
        color: '#EEEEEE',
        fontSize: 20,
        fontWeight: 'bold'
    }
})