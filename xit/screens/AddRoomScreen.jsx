import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import AddRoomForm from "../components/companyManagement/roomManagement/addRoom/AddRoomForm";
import globalStyles from "../theme/globalStyles";

export default function AddRoomScreen() {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <AddRoomForm />
        </SafeAreaView>
    );
}
