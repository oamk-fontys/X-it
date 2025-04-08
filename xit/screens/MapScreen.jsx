import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../theme/globalStyles";
import MapContainer from "../components/map/MapContainer"
import {View} from "react-native";


export default function MapScreen() {
    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.mapWrapper}>
                <MapContainer />
            </View>
        </SafeAreaView>
    );
}