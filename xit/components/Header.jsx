import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../theme/globalStyles";
import themeLight from "../theme/themeLight";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.title}>X-it</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={28} color={themeLight.colors.text} />
      </TouchableOpacity>
    </View>
  );
}