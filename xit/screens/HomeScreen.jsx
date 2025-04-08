import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import PopularRooms from "../components/home/PopularRooms";
import RecentComments from "../components/home/RecentComments";
import globalStyles from "../theme/globalStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <PopularRooms />
      <RecentComments />
    </SafeAreaView>
  );
}