import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import PopularRooms from "../components/homeScreenComponents/PopularRooms";
import RecentComments from "../components/homeScreenComponents/RecentComments";
import globalStyles from "../theme/globalStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <PopularRooms />
      <RecentComments />
    </SafeAreaView>
  );
}