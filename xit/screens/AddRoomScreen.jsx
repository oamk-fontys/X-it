import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import AddRoomForm from "../components/companyManagement/roomManagement/addRoom/AddRoomForm";
import globalStyles from "../theme/globalStyles";

export default function AddRoomScreen() {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={{ padding: 20 }}>
                <Text style={globalStyles.title}>Add Room</Text>
            </View>
            <AddRoomForm />
        </SafeAreaView>
    );
}
