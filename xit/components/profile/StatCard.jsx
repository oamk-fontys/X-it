import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function StatCard({ title, value }){
    return(
        <View style={styles.statCard}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statCard: {
        backgroundColor: "#393E46",
        borderRadius: 10,
        padding: 15,
        width: "30%",
        alignItems: "center",
    },
    statValue: {
        color: "#EEEEEE",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    statTitle: {
        color: "#888",
        fontSize: 12,
        textAlign: "center",
    }
});