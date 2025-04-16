import React from "react";
import { View, TextInput, Text, SafeAreaView } from "react-native";
import { useAuth } from "../context/AuthContext";
import globalStyles from "../theme/globalStyles";

export default function CompanyPendingScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.mainContainer}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Your Application is Under Review</Text>
        </View>

        {user && (
          <View style={globalStyles.titleContainer}>
            <Text style={globalStyles.textError}>
              You are logged in as{" "}
              <Text style={globalStyles.subTitleSmall}>{user.username}</Text>.
              Your company application is currently pending approval.
            </Text>
          </View>
        )}

        <TextInput
          style={globalStyles.input}
          placeholder="Company Name"
          placeholderTextColor={globalStyles.placeholderTextColor}
          value="Pending..."
          editable={false}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Address"
          placeholderTextColor={globalStyles.placeholderTextColor}
          value="Pending..."
          editable={false}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="City"
          placeholderTextColor={globalStyles.placeholderTextColor}
          value="Pending..."
          editable={false}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Postal Code"
          placeholderTextColor={globalStyles.placeholderTextColor}
          value="Pending..."
          editable={false}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="VAT Number"
          placeholderTextColor={globalStyles.placeholderTextColor}
          value="Pending..."
          editable={false}
        />
      </View>
    </SafeAreaView>
  );
}
