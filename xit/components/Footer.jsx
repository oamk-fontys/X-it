import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import globalStyles from "../theme/globalStyles";
import themeLight from "../theme/themeLight";

export default function Footer() {
  return (
    <SafeAreaView style={{ backgroundColor: themeLight.colors.secondary }}>
      <View style={globalStyles.footer}>
        <Text style={globalStyles.title}>Footer Content</Text>
      </View>
    </SafeAreaView>
  );
}