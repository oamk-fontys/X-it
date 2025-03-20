import React from "react";
import { View, Text } from "react-native";
import UpdateRoomForm from "../components/roomManagementScreenComponent/UpdateRoomForm";
import globalStyles from "../theme/globalStyles";

export default function UpdateRoomScreen({ route }) {
    const { room } = route.params;

    return (
        <View style={globalStyles.safeArea}>
            <View style={{ paddingHorizontal: 5, flex: 1 }}>
                <Text style={[globalStyles.title, { marginTop: 15, marginLeft: 10 }]}>Update Room</Text>
                <UpdateRoomForm room={room} />
            </View>
        </View>
    );
}
