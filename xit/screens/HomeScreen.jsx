import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import PopularRooms from "../components/homeScreenComponents/PopularRooms";
import RecentComments from "../components/homeScreenComponents/RecentComments";
import globalStyles from "../theme/globalStyles";
import themeLight from "../theme/themeLight";

export default function HomeScreen() {
  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: themeLight.colors.background }]}>
      <PopularRooms />
      <RecentComments />
    </SafeAreaView>
  );
}