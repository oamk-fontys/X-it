import React from "react";
import { View, Text } from "react-native";
import UpdateRoomForm from "../components/companyManagement/roomManagement/UpdateRoomForm";
import globalStyles from "../theme/globalStyles";

export default function UpdateRoomScreen({ route }) {
    const { room } = route.params;

    return (
        <View style={globalStyles.safeArea}>
            <View style={{ paddingHorizontal: 5, flex: 1 }}>
                <UpdateRoomForm room={room} />
            </View>
        </View>
    );
}
