import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import globalStyles from "../theme/globalStyles";

export default function Footer() {
  return (
    <SafeAreaView style={globalStyles.footerContainer}>
        <Text style={globalStyles.footerContent}>Footer Content</Text>
    </SafeAreaView>
  );
}