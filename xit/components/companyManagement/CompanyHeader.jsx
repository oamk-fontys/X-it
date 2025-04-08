import React from "react";
import { View, Text } from "react-native";
import globalStyles from "../../theme/globalStyles";

export default function CompanyHeader({ name, address, phone }) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            {address && <Text style={styles.address}>{address}</Text>}
            {phone && <Text style={styles.phone}>Phone: {phone}</Text>}
        </View>
    );
}

const styles = {
    container: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        ...globalStyles.shadow
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: globalStyles.primaryColor,
        marginBottom: 4
    },
    address: {
        fontSize: 14,
        color: globalStyles.textColor,
        marginBottom: 4
    },
    phone: {
        fontSize: 14,
        color: globalStyles.secondaryTextColor
    }
};