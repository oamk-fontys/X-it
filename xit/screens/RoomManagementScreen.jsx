import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import globalStyles from "../theme/globalStyles";

import RoomDetails from "../components/roomManagementScreenComponent/RoomDetails";
import RoomActions from "../components/roomManagementScreenComponent/RoomActions";

const companyRooms = [
    { id: "1", name: "Luxurious Ceramic Chips", address: "Isokatu 11, 90100, Oulu", phone: "+358 12 3456 7890", level: "Easy", description: "This is Luxurious Ceramic Chips. Easy level. Available in Oulu." },
    { id: "2", name: "Rustic Bronze Tuna", address: "Isokatu 11, 90100, Oulu", phone: "+358 12 3456 7890", level: "Hard", description: "A challenging escape room." },
];

export default function RoomManagementScreen() {
    const route = useRoute();
    const { roomId } = route.params;

    const room = companyRooms.find(r => r.id === roomId) || {};

    return (
        <View style={globalStyles.safeArea}>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <RoomDetails room={room} />
                <RoomActions roomId={roomId} room={room} />
            </View>
        </View>
    );
}