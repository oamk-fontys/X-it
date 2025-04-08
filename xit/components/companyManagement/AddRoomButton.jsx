import React from "react";
import { TouchableOpacity, Text } from "react-native";
import globalStyles from "../../theme/globalStyles";

export default function AddRoomButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>+ Add Room</Text>
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        backgroundColor: globalStyles.primaryColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginBottom: 16,
        ...globalStyles.shadow
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
};