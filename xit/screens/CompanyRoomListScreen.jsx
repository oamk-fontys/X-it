import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CompanyRooms from "../components/companyManagement/CompanyRooms";
import globalStyles from "../theme/globalStyles";

export default function CompanyRoomListScreen() {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <CompanyRooms />
        </SafeAreaView>
    );
}
