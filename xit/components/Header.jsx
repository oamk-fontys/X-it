import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../theme/globalStyles";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.headerContainer}>
      <Text style={globalStyles.headerContent}>X-it</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={28} style={globalStyles.icon} />
      </TouchableOpacity>
    </View>
  );
}